import {
  IPageBuilder,
  ItemTypes,
  PageItemBuilder,
  RuleArgs,
  Rules,
} from "uask-dom";
import test from "tape";
import { itemDeserialize, itemSerialize } from "../json/index.js";
import { PageGenerator } from "./pagegenerator.js";
import { PageItemGenerator } from "./pageitemgenerator.js";

test("Generate a question #252", t => {
  const generator = new PageItemGenerator(<PageGenerator>{});
  const type = ItemTypes.context([ItemTypes.integer, ItemTypes.date(true)]);
  generator.question("the question", "V", { ...type });
  const fluent = generator.build();
  t.equal(
    fluent,
    '.question("the question", "V", b.types.context([\n      b.types.integer, \n      b.types.date(true)]))'
  );
  t.end();
});

test("Generate question with required rule #252", t => {
  const generator = new PageItemGenerator(<PageGenerator>{});
  const rule = Rules.required();
  generator
    .question("the question", "V", { ...ItemTypes.text })
    .rule({ ...rule } as RuleArgs);
  const fluent = generator.build();
  t.equal(
    fluent,
    '.question("the question", "V", b.types.text)\n  .required()'
  );
  t.end();
});

test("Generate question with in range rule #252", t => {
  const generator = new PageItemGenerator(<PageGenerator>{});
  const rule = Rules.inRange(10.1, 20.3, {
    includeLower: true,
    includeUpper: false,
  });
  generator
    .question("the question", "V", { ...ItemTypes.integer })
    .rule({ ...rule } as RuleArgs);
  const fluent = generator.build();
  t.equal(
    fluent,
    '.question("the question", "V", b.types.integer)\n  .inRange(10.1, 20.3, {"includeLower":true,"includeUpper":false})'
  );
  t.end();
});

test("Generate question with dynamic required rule #252", t => {
  const generator = new PageItemGenerator(<PageGenerator>{});
  const rule = Rules.dynamic("required", ["[1 == 1]", 0]);
  generator
    .question("the question", "V", { ...ItemTypes.text })
    .rule({ ...rule } as RuleArgs);
  const fluent = generator.build();
  t.equal(
    fluent,
    '.question("the question", "V", b.types.text)\n  .required("1 == 1")'
  );
  t.end();
});

test("Generate item with contexttual wordings and types #252", t => {
  const generator = new PageItemGenerator(<PageGenerator>{}, {
    languages: ["fr", "en"],
  });
  generator.question(
    [
      { en: "Q1 (en)", fr: "Q1 (fr)" },
      { en: "Q2 (en)", fr: "Q2 (fr)" },
    ],
    "V",
    ItemTypes.text,
    ItemTypes.date()
  );
  const fluent = generator.build();
  t.equal(
    fluent,
    '.question("V", b.types.text, b.types.date())\n  .wordings("Q1 (en)", "Q2 (en)")\n  .translate("fr", "Q1 (fr)", "Q2 (fr)")'
  );
  t.end();
});

test("Page item DSL generation #252", t => {
  const builder = new PageItemBuilder(
    "question",
    "Q",
    ItemTypes.score(0, 1).wording("Yes", "No"),
    undefined,
    {}
  );
  builder
    .translate("fr", "question (fr)")
    .unit("img/s")
    .extendable()
    .pin("pin")
    .kpi("kpi")
    .required()
    .inRange(3, 7)
    .decimalPrecision(3)
    .maxLength(5)
    .fixedLength(12)
    .letterCase("upper")
    .comment("bla")
    .defaultValue(0.4);
  const pageItem = builder.build([]);
  const json = itemSerialize(pageItem);
  const generator = new PageItemGenerator(<PageGenerator>{}, {
    languages: ["fr", "en"],
  });
  itemDeserialize(generator as unknown as IPageBuilder, json);
  const dsl = generator.build();
  t.equal(
    dsl,
    `.question("question", "Q", b.types.score(0, 1)
          .wording("Yes", "No"))
  .translate("fr", "question (fr)")
  .unit("img/s")
    .extendable()
  .defaultValue(0.4)
  .required()
  .inRange(3, 7, {"includeLower":false,"includeUpper":false})
  .decimalPrecision(3)
  .maxLength(5)
  .fixedLength(12)
  .letterCase("upper")
  .comment("bla")
  .pin("pin")
  .kpi("kpi")`
  );
  t.end();
});

test("Generate an info with special characters #325", t => {
  const generator = new PageItemGenerator(<PageGenerator>{}, {
    languages: ["fr", "en"],
  });
  generator.question('2\\. "no markdown"', "INFO", ItemTypes.info);
  t.equal(generator.variableName, "INFO");
  const fluent = generator.build();
  t.equal(fluent, '.info("2\\\\. \\"no markdown\\"", "INFO")');
  t.end();
});

test("Generate question with critical rule #275", t => {
  const generator = new PageItemGenerator(<PageGenerator>{});
  const rule = Rules.critical("ae", "A", "B");
  generator
    .question("the question", "V", { ...ItemTypes.text })
    .rule({ ...rule } as RuleArgs);
  const fluent = generator.build();
  t.equal(
    fluent,
    '.question("the question", "V", b.types.text)\n  .critical("ae", "A", "B")'
  );
  t.end();
});
