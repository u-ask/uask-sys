import test from "tape";
import { SurveyBuilder } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import { pageDeserialize, pageSerialize } from "./pagejson.js";
import { pick } from "./pick.js";

test("Page serialization", t => {
  exampleSurvey.pages.forEach(p => {
    const json = pageSerialize(p, { defaultLang: "en" });
    const obj = pick(json);
    t.deepLooseEqual(obj, json);
  });
  t.end();
});

test("Page deserialization", t => {
  const builder = new SurveyBuilder();
  exampleSurvey.pages.forEach((p, i) => {
    const json = pageSerialize(p, { defaultLang: "en" });
    pageDeserialize(builder, json);
    const obj = builder.build().pages[i];
    t.deepLooseEqual(obj, p);
  });
  t.end();
});
