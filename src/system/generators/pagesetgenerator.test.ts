import { ISurveyBuilder, Page, PageSetBuilder } from "uask-dom";
import test from "tape";
import { pageSetDeserialize, pageSetSerialize } from "../json/index.js";
import { PageSetGenerator } from "./pagesetgenerator.js";
import { SurveyGenerator } from "./surveygenerator.js";

test("Generate a pageset #252", t => {
  const generator = new PageSetGenerator(<SurveyGenerator>{}, {
    languages: ["fr", "en"],
  });
  generator.pageSet({ en: "PS (en)", fr: "PS (fr)" });
  const dsl = generator.build();
  t.equal(dsl, '.pageSet("PS (en)")\n  .translate("fr", "PS (fr)")');
  t.end();
});

test("Generate a pageset with pages #252", t => {
  const generator = new PageSetGenerator(<SurveyGenerator>{});
  generator.pageSet("PS").pages("P1", { name: "P2", mandatory: true }, "P3");
  const dsl = generator.build();
  t.equal(
    dsl,
    '.pageSet("PS")\n  .pages("P1", {"name":"P2","mandatory":true}, "P3")'
  );
  t.end();
});

test("Generate a pageset DSL from domain object #252", t => {
  const pageSetBuilder = new PageSetBuilder("PS", {});
  pageSetBuilder
    .translate("fr", "T")
    .datevariable("DV")
    .pages({ name: "P", mandatory: true });
  const pageSet = pageSetBuilder.build([new Page("P")]);
  const json = pageSetSerialize(pageSet, {});
  const generator = new PageSetGenerator(<SurveyGenerator>{}, {
    languages: ["fr", "en"],
  });
  pageSetDeserialize(generator as unknown as ISurveyBuilder, json);
  const dsl = generator.build();
  t.equal(
    dsl,
    `.pageSet("PS")
  .translate("fr", "T")
  .datevariable("DV")
  .pages({"name":"P","mandatory":true})`
  );
  t.end();
});
