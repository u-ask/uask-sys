import test from "tape";
import { SurveyBuilder } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import { crossRuleSerialize, crossRuleDeserialize } from "./crossrulejson.js";
import { pageDeserialize, pageSerialize } from "./pagejson.js";
import { pick } from "./pick.js";

test("Cross rules serialization", t => {
  exampleSurvey.crossRules.forEach(r => {
    const json = crossRuleSerialize(r);
    const obj = pick(json);
    t.deepLooseEqual(obj, json);
  });
  t.end();
});

test("Cross rules deserialization", t => {
  exampleSurvey.crossRules.forEach(r => {
    const sb = new SurveyBuilder();
    exampleSurvey.pages.forEach(p => {
      const json = pageSerialize(p, { defaultLang: "en" });
      pageDeserialize(sb, json);
    });
    const json = crossRuleSerialize(r);
    crossRuleDeserialize(sb, json);
    const obj = sb.build().crossRules[0];
    t.deepLooseEqual(obj, r);
  });
  t.end();
});
