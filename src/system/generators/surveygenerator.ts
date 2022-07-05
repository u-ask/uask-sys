import {
  ICrossRuleBuilder,
  IDerivedWorkflowBuilder,
  IPageBuilder,
  IPageSetBuilder,
  IRawWorkflowBuilder,
  ISurveyBuilder,
  IWorkflowBuilder,
  mlstring,
  RuleArgs,
  RuleName,
  Rules,
  Survey,
  SurveyBuilder,
  SurveyOptions,
  TriggerWhen,
} from "uask-dom";
import { surveyDeserialize, surveySerialize } from "../json/index.js";
import { FluentGenerator } from "./fluentgenerator.js";
import { regenerateDynamic, getDynamicArgs } from "./dynamic.js";
import { PageGenerator } from "./pagegenerator.js";
import { PageItemGenerator } from "./pageitemgenerator.js";
import { PageSetGenerator } from "./pagesetgenerator.js";
import { defaultLang, transposeML } from "./transposeml.js";
import {
  DerivedWorkflowGenerator,
  WorkflowGenerator,
} from "./workflowgenerator.js";

export class SurveyGenerator implements ISurveyBuilder, ICrossRuleBuilder {
  readonly generator = new FluentGenerator();
  private config: SurveyOptions = {};
  readonly pages: PageGenerator[] = [];

  build(): string {
    return this.generator.build("", 0);
  }

  options(options: Partial<SurveyOptions>): void {
    this.config = Object.assign(this.options, options);
    const gen = new FluentGenerator();
    gen.call("options").arg(() => JSON.stringify(options, null, 2));
    this.generator.compose(gen, "\nb");
  }

  strict(): void {
    this.generator.call("strict");
  }

  survey(name: string): ISurveyBuilder {
    const gen = new FluentGenerator();
    gen.call("survey").arg(name);
    this.generator.compose(gen, "\nb");
    return this;
  }

  visit(type: mlstring): IPageSetBuilder {
    return this.pageSet(type);
  }

  pageSet(type: mlstring): IPageSetBuilder {
    const pageSetGenerator = new PageSetGenerator(this, this.config);
    this.generator.compose(pageSetGenerator.generator);
    pageSetGenerator.pageSet(type);
    return pageSetGenerator;
  }

  page(name: mlstring): IPageBuilder {
    const gen = new FluentGenerator();
    const pageGenerator = this.generatePage(gen, name);
    this.generator.compose(gen, "\nb");
    this.pages.push(pageGenerator);
    return pageGenerator;
  }

  private generatePage(gen: FluentGenerator, name: mlstring) {
    this.translatePageName(name, gen);
    const contentGenerator = new PageGenerator(this, this.config);
    gen.compose(contentGenerator.generator, 0);
    return contentGenerator;
  }

  private translatePageName(name: mlstring, gen: FluentGenerator) {
    const {
      __code__,
      [defaultLang(this.config)]: def,
      ...others
    } = transposeML([name], this.config);
    if (typeof __code__ != "undefined") {
      gen.call("page").arg(__code__[0]);
      gen.call("translate").args(defaultLang(this.config), def[0]);
    } else gen.call("page").arg(def[0]);
    for (const [lang, translation] of Object.entries(others))
      gen.call("translate").args(lang, translation[0]);
  }

  workflow(): IWorkflowBuilder;
  workflow(w: { name: string; raw: true }): IRawWorkflowBuilder;
  workflow(name: string, ...names: string[]): IDerivedWorkflowBuilder;
  workflow(
    w: string | { name: string; raw: true } = "main",
    ...names: string[]
  ): IWorkflowBuilder | IDerivedWorkflowBuilder | IRawWorkflowBuilder {
    const name = typeof w == "string" || typeof w == "undefined" ? w : w.name;
    const gen = new FluentGenerator();
    if (name != "main") {
      gen.call("workflow").opts(name, ...names);
      const workflowGenerator = new DerivedWorkflowGenerator();
      gen.compose(workflowGenerator.generator, 0);
      this.generator.compose(gen, "\nb");
      return workflowGenerator;
    }
    gen.call("workflow");
    const workflowGenerator = new WorkflowGenerator();
    gen.compose(workflowGenerator.generator, 0);
    this.generator.compose(gen, "\nb");
    return workflowGenerator;
  }

  trigger(when: TriggerWhen): ICrossRuleBuilder {
    if (when == "initialization") this.generator.call("trigger").arg(when);
    return this;
  }

  activateWhen(
    target: string,
    activator: string,
    ...values: unknown[]
  ): ICrossRuleBuilder {
    const pageItemGenerator = this.getTargetGenerator([target]);
    pageItemGenerator?.activateWhen(activator, ...values);
    return this;
  }

  visibleWhen(
    target: string,
    activator: string,
    ...values: unknown[]
  ): ICrossRuleBuilder {
    const pageItemGenerator = this.getTargetGenerator([target]);
    pageItemGenerator?.visibleWhen(activator, ...values);
    return this;
  }

  modifiableWhen(
    target: string,
    variableName: string,
    ...values: unknown[]
  ): ICrossRuleBuilder {
    const pageItemGenerator = this.getTargetGenerator([target]);
    pageItemGenerator?.modifiableWhen(variableName, ...values);
    return this;
  }

  copy(target: string, source: string): ICrossRuleBuilder {
    const pageItemGenerator = this.getTargetGenerator([target]);
    pageItemGenerator?.defaultValue({ source });
    return new Proxy(this, {
      get: (t, p, r) => {
        if (p == "trigger") return () => t;
        return Reflect.get(t, p, r);
      },
    });
  }

  computed(target: string, formula: string): ICrossRuleBuilder {
    const pageItemGenerator = this.getTargetGenerator([target]);
    pageItemGenerator?.computed(formula);
    return new Proxy(this, {
      get: (t, p, r) => {
        if (p == "trigger")
          return (when: TriggerWhen) => {
            if (when == "initialization") {
              pageItemGenerator?.generator.cancel();
              pageItemGenerator?.defaultValue({ formula });
            }
            return t;
          };
        return Reflect.get(t, p, r);
      },
    });
  }

  dynamic(
    variableNames: string[],
    rule: RuleName,
    values: unknown[],
    ...extraArgs: unknown[]
  ): ICrossRuleBuilder {
    const pageItemGenerator = this.getTargetGenerator(variableNames);
    regenerateDynamic(pageItemGenerator, rule, values, ...extraArgs);
    return this;
  }

  private getTargetGenerator(variableNames: string[]) {
    const target = variableNames[variableNames.length - 1];
    return this.pages.reduce(
      (a, page) =>
        typeof a == "undefined"
          ? page.items.find(i => i.variableName == target)
          : a,
      undefined as PageItemGenerator | undefined
    );
  }

  rule(
    variableNames: string[],
    name: RuleName | RuleArgs,
    ...args: unknown[]
  ): ICrossRuleBuilder {
    const rule = typeof name == "string" ? name : name.name;
    const a = typeof name == "string" ? args : Rules.args(name);
    switch (rule) {
      case "activation":
        return (a[1] == "enable" ? this.activateWhen : this.visibleWhen).call(
          this,
          variableNames[1],
          variableNames[0],
          ...(a[0] as unknown[])
        );
      case "copy":
        return this.copy(variableNames[1], variableNames[0]);
      case "computed":
        return this.computed(
          variableNames[variableNames.length - 1],
          getDynamicArgs(variableNames, a as [string, number])[0] as string
        );
      case "dynamic":
        return this.dynamic(
          variableNames,
          a[0] as RuleName,
          getDynamicArgs(
            variableNames,
            a[1] as [string, number]
          )[0] as string[],
          ...a.slice(2)
        );
      default:
        return this;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  track(): void {}
}

export function executeDSL(dsl: string): Survey {
  const build = new Function("b", dsl);
  const b = new SurveyBuilder();
  build(b);
  return b.build();
}

export function generateDSL(survey: Survey): string {
  const json = surveySerialize(survey);
  const generator = new SurveyGenerator();
  surveyDeserialize(generator, json);
  const dsl = generator.build();
  return dslHelpers(dsl);
}

export function dslHelpers(dsl: string): string {
  return dsl
    .replace(/\{"formula":"#([0-9-]*)#"\}/g, 'b.date("$1")')
    .replace(/\{"formula":"([^"]*)"\}/g, 'b.computed("$1")')
    .replace(/\{"name":"([^"]*)","mandatory":true\}/g, 'b.mandatory("$1")')
    .replace(/b\.types\.context\(\[((.|\n)*)\]\)/, "$1");
}
