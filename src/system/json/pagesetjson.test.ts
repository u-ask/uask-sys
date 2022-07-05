import test from "tape";
import { SurveyBuilder } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import { pageSetDeserialize, pageSetSerialize } from "./pagesetjson.js";
import { pageDeserialize, pageSerialize } from "./pagejson.js";
import { pick } from "./pick.js";

test("PageSet serialization", t => {
  exampleSurvey.pageSets.forEach(p => {
    const json = pageSetSerialize(p, {});
    const obj = pick(json);
    t.deepLooseEqual(obj, json);
  });
  t.end();
});

test("PageSet deserialization", t => {
  exampleSurvey.pageSets.forEach(p => {
    const builder = new SurveyBuilder();
    exampleSurvey.pages.forEach(p => {
      const json = pageSerialize(p, { defaultLang: "en" });
      pageDeserialize(builder, json);
    });
    const json = pageSetSerialize(p, { defaultLang: "en" });
    pageSetDeserialize(builder, json);
    const obj = builder.build().pageSets[0];
    t.deepLooseEqual(obj, p);
  });
  t.end();
});
