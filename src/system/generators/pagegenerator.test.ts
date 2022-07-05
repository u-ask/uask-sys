import { ISurveyBuilder, ItemTypes, PageBuilder } from "uask-dom";
import test from "tape";
import { pageDeserialize, pageSerialize } from "../json/index.js";
import { PageGenerator } from "./pagegenerator.js";
import { SurveyGenerator } from "./surveygenerator.js";

test("Generate a page #252", t => {
  const generator = new PageGenerator(<SurveyGenerator>{});
  generator.translate("fr", "La page");
  const dsl = generator.build();
  t.equal(dsl, '  .translate("fr", "La page")');
  t.end();
});

test("Generate a page with two questions #252", t => {
  const generator = new PageGenerator(<SurveyGenerator>{});
  generator
    .question("Question 1", "Q1", ItemTypes.text)
    .question("Question 2", "Q2", ItemTypes.yesno)
    .required();
  const dsl = generator.build();
  t.equal(
    dsl,
    '  .question("Question 1", "Q1", b.types.text)\n  .question("Question 2", "Q2", b.types.yesno)\n    .required()'
  );
  t.end();
});

test("Generate a page with section #252", t => {
  const generator = new PageGenerator(<SurveyGenerator>{});
  generator
    .startSection("Section")
    .activateWhen("Q0", [5, 6, 7])
    .question("Question 1", "Q1", ItemTypes.text)
    .question("Question 2", "Q2", ItemTypes.integer)
    .endSection()
    .question("Question 3", "Q3", ItemTypes.yesno);
  const dsl = generator.build();
  t.equal(
    dsl,
    '  .startSection("Section")\n    .activateWhen("Q0", [5, 6, 7])\n    .question("Question 1", "Q1", b.types.text)\n    .question("Question 2", "Q2", b.types.integer)\n    .endSection()\n  .question("Question 3", "Q3", b.types.yesno)'
  );
  t.end();
});

test("Generate a page with include #252", t => {
  const generator = new PageGenerator(<SurveyGenerator>{});
  generator
    .include("Other")
    .select("V1", "V2")
    .context("V1", 1)
    .question("Question 1", "Q1", ItemTypes.text)
    .question("Question 2", "Q2", ItemTypes.yesno);
  const dsl = generator.build();
  t.equal(
    dsl,
    '  .include("Other")\n    .select("V1", "V2")\n    .context("V1", 1)\n  .question("Question 1", "Q1", b.types.text)\n  .question("Question 2", "Q2", b.types.yesno)'
  );
  t.end();
});

test("Generate a page from domain instance #252", t => {
  const pb1 = new PageBuilder("P1", {});
  pb1.question("Q11", "Q11", ItemTypes.yesno, ItemTypes.text);
  pb1.question("Q12", "Q12", ItemTypes.yesno);
  const pb2 = new PageBuilder("P2", {});
  pb2
    .question("Q21", "Q21", ItemTypes.yesno)
    .question("Q22", "Q22", ItemTypes.yesno)
    .startSection("S")
    .question("Q23", "Q23", ItemTypes.yesno)
    .question("Q24", "Q24", ItemTypes.yesno)
    .endSection()
    .include("P1")
    .select("Q11")
    .context("Q11", 1)
    .question("Q25", "Q25", ItemTypes.yesno);
  const page2 = pb2.build([pb1, pb2]);
  const json = pageSerialize(page2, {});
  const generator = new PageGenerator(<SurveyGenerator>{});
  pageDeserialize({ page: () => generator } as unknown as ISurveyBuilder, json);
  const dsl = generator.build();
  t.equal(
    dsl,
    `  .question("Q21", "Q21", b.types.yesno)
  .question("Q22", "Q22", b.types.yesno)
  .startSection("S")
    .question("Q23", "Q23", b.types.yesno)
    .question("Q24", "Q24", b.types.yesno)
    .endSection()
  .include("P1")
    .select("Q11")
    .context("Q11", 1)
  .question("Q25", "Q25", b.types.yesno)`
  );
  t.end();
});
