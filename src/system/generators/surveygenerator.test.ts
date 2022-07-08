import {
  ICrossRuleBuilder,
  IPageItemBuilder,
  ISurveyBuilder,
  ItemTypes,
  SurveyBuilder,
} from "uask-dom";
import test from "tape";
import { P11_05 } from "../../example.js";
import { surveyDeserialize, surveySerialize } from "../json/index.js";
import {
  dslHelpers,
  executeDSL,
  generateDSL,
  SurveyGenerator,
} from "./surveygenerator.js";

test("Generate a survey #252", t => {
  const generator = new SurveyGenerator();
  generator.survey("X");
  generator.pageSet("S").pages("P");
  generator.page("P").question("Q", "Q", ItemTypes.yesno);
  const dsl = generator.build();
  t.equal(
    dsl,
    '\nb.survey("X")\n  .pageSet("S")\n    .pages("P")\n\nb.page("P")\n  .question("Q", "Q", b.types.yesno)'
  );
  t.end();
});

test("Generate a survey with workflows #252", t => {
  const generator = new SurveyGenerator();
  generator.survey("X");
  generator.pageSet("S").pageSet("P");
  generator.workflow().home("S").initial("P");
  generator.workflow("w").withPageSets("P");
  const dsl = generator.build();
  t.equal(
    dsl,
    '\nb.survey("X")\n  .pageSet("S")\n  .pageSet("P")\n\nb.workflow()\n  .home("S")\n  .initial("P")\n\nb.workflow("w")\n  .withPageSets("P")'
  );
  t.end();
});

const expectedDSL1 = `
b.options({
  "languages": [
    "en",
    "fr"
  ],
  "defaultLang": "en",
  "interviewDateVar": "VDATE",
  "phoneVar": "__PHONE",
  "emailVar": "__EMAIL",
  "showFillRate": true,
  "epro": false,
  "inclusionVar": {
    "name": "__INCLUDED",
    "hidden": false
  },
  "unitSuffix": "_UNIT",
  "workflowVar": "__WORKFLOW",
  "participantCodeStrategy": {
    "length": 5,
    "bySample": false
  }
})

b.survey("X")
  .pageSet("PS1")
    .pages(b.mandatory("P1"))
  .pageSet("PS2")
    .pages("P2", "P2a")
  .pageSet("PS3")
    .pages("P3")
  .pageSet("PS4")
    .pages("P4")
  .pageSet("PS5")
    .pages("P5")
  .pageSet("PS6")
    .pages("P6")

b.page("P1")
  .question("Q1", "Q1", b.types.yesno)

b.page("P2")
  .question("Q2", "Q2", b.types.yesno)

b.page("P2a")
  .question("Q2a", "Q2a", b.types.yesno)

b.page("P3")
  .question("Q3", "Q3", b.types.yesno)

b.page("P4")
  .question("Q4", "Q4", b.types.yesno)

b.page("P5")
  .question("Q5", "Q5", b.types.yesno)

b.page("P6")
  .question("Q6", "Q6", b.types.yesno)

b.workflow()
  .home("PS1")
  .initial("PS2")
  .followUp("PS3")
  .terminal("PS4")
  .auxiliary("PS5", "PS6")

b.workflow("participant")
  .withPageSets("PS3")`;

test("Generate a survey DSL from domain object #252", t => {
  const b = new SurveyBuilder();
  b.survey("X");
  b.pageSet("PS1")
    .pages(b.mandatory("P1"))
    .pageSet("PS2")
    .pages("P2", "P2a")
    .pageSet("PS3")
    .pages("P3")
    .pageSet("PS4")
    .pages("P4")
    .pageSet("PS5")
    .pages("P5")
    .pageSet("PS6")
    .pages("P6");

  b.page("P1").question("Q1", "Q1", b.types.yesno);
  b.page("P2").question("Q2", "Q2", b.types.yesno);
  b.page("P2a").question("Q2a", "Q2a", b.types.yesno);
  b.page("P3").question("Q3", "Q3", b.types.yesno);
  b.page("P4").question("Q4", "Q4", b.types.yesno);
  b.page("P5").question("Q5", "Q5", b.types.yesno);
  b.page("P6").question("Q6", "Q6", b.types.yesno);

  b.workflow()
    .home("PS1")
    .initial("PS2")
    .followUp("PS3")
    .terminal("PS4")
    .auxiliary("PS5", "PS6");

  b.workflow("participant").withPageSets("PS3");
  const survey = b.get();

  const dsl = generateDSL(survey);
  t.equal(dsl, expectedDSL1);

  const survey1 = executeDSL(dsl);
  t.deepLooseEqual(survey1, survey);

  t.end();
});

test("Generation of example survey #252", t => {
  const p11_05 = P11_05;
  const dsl = generateDSL(p11_05);
  const survey = executeDSL(dsl);
  t.deepLooseEqual(survey, p11_05);
  t.end();
});

test("Generate a dynamic required rule #252", t => {
  testGeneration(
    t,
    builder => builder.required("Q0 == 3"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .required("Q0 == 3")'
  );
  t.end();
});

test("Generate a dynamic required rule from domain object #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.required("Q0 == 3"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .required("Q0 == 3")'
  );
  t.end();
});

test("Generate a dynamic in range rule #252", t => {
  testGeneration(
    t,
    builder =>
      builder.inRange({ formula: "#2022-02-22#" }, { formula: "@TODAY" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .inRange(b.date("2022-02-22"), b.computed("@TODAY"), {"includeLower":true,"includeUpper":true})'
  );
  t.end();
});

test("Generate a dynamic in range rule from domain object #252", t => {
  testGenerationFromDomain(
    t,
    builder =>
      builder.inRange({ formula: "#2022-02-22#" }, { formula: "@TODAY" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .inRange(b.date("2022-02-22"), b.computed("@TODAY"), {"includeLower":true,"includeUpper":true})'
  );
  t.end();
});

test("Generate a computed rule #252", t => {
  testGeneration(
    t,
    builder => builder.computed("Q0 && (Q0 && Q0) ? @ACK : @UNDEF"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .computed("Q0 && (Q0 && Q0) ? @ACK : @UNDEF")'
  );
  t.end();
});

test("Generate a computed rule from domain #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.computed("Q0 && (Q0 && Q0) ? @ACK : @UNDEF"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .computed("Q0 && (Q0 && Q0) ? @ACK : @UNDEF")'
  );
  t.end();
});

test("Generate a copy rule #252", t => {
  testGeneration(
    t,
    builder => builder.defaultValue({ source: "Q0" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .defaultValue({"source":"Q0"})'
  );
  t.end();
});

test("Generate a copy rule from domain #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.defaultValue({ source: "Q0" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .defaultValue({"source":"Q0"})'
  );
  t.end();
});

test("Generate a default constant rule #252", t => {
  testGeneration(
    t,
    builder => builder.defaultValue({ formula: "Q0 + 3" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .defaultValue(b.computed("Q0 + 3"))'
  );
  t.end();
});

test("Generate a default constant rule from domain #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.defaultValue({ formula: "Q0 + 3" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .defaultValue(b.computed("Q0 + 3"))'
  );
  t.end();
});

test("Generate an activation rule #252", t => {
  testGeneration(
    t,
    builder => builder.activateWhen("Q0", [4, 5]),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .activateWhen("Q0", [4, 5])'
  );
  t.end();
});

test("Generate an activation rule from domain object #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.activateWhen("Q0", [4, 5]),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .activateWhen("Q0", [4, 5])'
  );
  t.end();
});

test("Generate a dynamic activation rule #252", t => {
  testGeneration(
    t,
    builder => builder.activateWhen("~IN(Q0, 4)"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .activateWhen("~IN(Q0, 4)")'
  );
  t.end();
});

test("Generate a dynamic activation rule #252", t => {
  testGeneration(
    t,
    builder => builder.activateWhen("(Q0) && (Q0)"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .activateWhen("(Q0) && (Q0)")'
  );
  t.end();
});

test("Generate a dynamic activation rule from domain object #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.activateWhen("~IN(Q0, 4)"),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .activateWhen("~IN(Q0, 4)")'
  );
  t.end();
});

test("Helper replaces formula by helper #252", t => {
  const dsl =
    '.inRange({"formula":"1960"}, {"formula":"@THISYEAR"}, {"includeLower":true,"includeUpper":true})';
  const rewritten = dslHelpers(dsl);
  t.equal(
    rewritten,
    '.inRange(b.computed("1960"), b.computed("@THISYEAR"), {"includeLower":true,"includeUpper":true})'
  );
  t.end();
});

test("Helper replaces date literals by helper #252", t => {
  const dsl =
    '.inRange({"formula":"#1960-06-01#"}, {"formula":"#2001-05-08#"}, {"includeLower":true,"includeUpper":true})';
  const rewritten = dslHelpers(dsl);
  t.equal(
    rewritten,
    '.inRange(b.date("1960-06-01"), b.date("2001-05-08"), {"includeLower":true,"includeUpper":true})'
  );
  t.end();
});

test("Info with a visibleWhen constraint #325", t => {
  const b = new SurveyBuilder();
  b.pageSet("PS").pages("P");
  b.page("P")
    .question("Q ?", "Q", b.types.yesno)
    .info("I", "I")
    .visibleWhen("Q");
  const survey = b.get();

  const dsl = generateDSL(survey);
  t.true(dsl.includes('  .info("I", "I")\n    .visibleWhen("Q")'));
  t.end();
});

test("Generate a dynamic critical rule #275", t => {
  testGeneration(
    t,
    builder => builder.critical("C", "CC", { formula: "Q == 3" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .critical("C", "CC", b.computed("Q == 3"))'
  );
  t.end();
});

test("Generate a dynamic critical rule from domain object #252", t => {
  testGenerationFromDomain(
    t,
    builder => builder.critical("C", "CC", { formula: "Q == 3" }),
    '\nb.page("P")\n  .question("Q0", "Q0", b.types.integer)\n  .question("Q", "Q", b.types.integer)\n    .critical("C", "CC", b.computed("Q == 3"))'
  );
  t.end();
});

function testGeneration(
  t: test.Test,
  f: (builder: IPageItemBuilder) => void,
  expectedDSL: string
) {
  const generator = new SurveyGenerator();
  setupRuleTest(generator, f);
  const dsl = dslHelpers(generator.build());
  t.equal(dsl, expectedDSL);
}

function testGenerationFromDomain(
  t: test.Test,
  f: (b: IPageItemBuilder) => void,
  expectedDSL: string
) {
  const b = new SurveyBuilder();
  setupRuleTest(b, f);
  const generator = builderToGenerator(b);
  const dsl = dslHelpers(generator.build());
  t.true(dsl.includes(expectedDSL));
}

function builderToGenerator(b: SurveyBuilder) {
  const survey = b.build();
  const json = surveySerialize(survey);
  const generator = new SurveyGenerator();
  surveyDeserialize(generator, json);
  return generator;
}

function setupRuleTest(
  b: ISurveyBuilder & ICrossRuleBuilder,
  f: (b: IPageItemBuilder) => void
) {
  const ib = b
    .page("P")
    .question("Q0", "Q0", ItemTypes.integer)
    .question("Q", "Q", ItemTypes.integer);
  f(ib);
}
