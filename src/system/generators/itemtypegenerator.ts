import { ItemType, mlstring, SurveyOptions, TypeArgs } from "uask-dom";
import { FluentGenerator } from "./fluentgenerator.js";
import { defaultLang, transposeML } from "./transposeml.js";

export function getTypeGenerator(
  type: ItemType | TypeArgs,
  options: SurveyOptions = {}
): FluentGenerator {
  type = { ...type } as TypeArgs;
  const generator = new FluentGenerator();
  switch (type.name) {
    case "scale": {
      const { name, min, max } = type;
      generator.call(name).args(min, max);
      if (type.labels) translateTypeLabels(generator, type, options);
      return generator;
    }
    case "score":
      generator.call(type.name).args(...(type.scores as number[]));
      if (type.labels) translateTypeLabels(generator, type, options);
      return generator;
    case "date":
      generator
        .call("date")
        .opt(type.incomplete || undefined)
        .opt(type.month || undefined);
      return generator;
    case "choice":
    case "glossary":
      generator
        .call(type.name)
        .args(type.multiplicity, ...(type.choices as string[]));
      if (type.labels && type.labels != type.choices)
        translateTypeLabels(generator, type, options);
      return generator;
    case "countries":
      generator.call(type.name).arg(type.multiplicity);
      return generator;
    case "context": {
      const { name, ...types } = type;
      generator.call(name);
      generator.arg(
        Object.values(types).map(
          t => (prefix: string) =>
            getTypeGenerator(t as TypeArgs).build(`\n      ${prefix}`, 5)
        )
      );
      return generator;
    }
    case "time":
      generator.call("time").opt(type.duration || undefined);
      return generator;
    case "text":
    case "real":
    case "integer":
    case "yesno":
    case "acknowledge":
    case "image":
    case "info":
      generator.prop(type.name);
      return generator;
  }
}

function translateTypeLabels(
  generator: FluentGenerator,
  type: TypeArgs,
  options: SurveyOptions
) {
  const gen = new FluentGenerator();
  const { [defaultLang(options)]: def, ...others } = transposeML(
    type.labels as mlstring[],
    options
  );
  gen.call("wording").args(...def);
  for (const [lang, labels] of Object.entries(others))
    if (lang != "__code__") gen.call("translate").args(lang, ...labels);
  generator.compose(gen, 3, 5);
}
