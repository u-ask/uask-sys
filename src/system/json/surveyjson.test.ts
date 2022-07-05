import { SurveyBuilder } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import test from "tape";
import { surveySerialize, surveyDeserialize, clone } from "./surveyjson.js";
import { pick } from "./pick.js";

test("Survey serialization", t => {
  const json = surveySerialize(exampleSurvey);
  const obj = pick(json);
  t.deepLooseEqual(obj, json);
  t.end();
});

test("Survey deserialization", t => {
  const json = surveySerialize(exampleSurvey);
  const builder = new SurveyBuilder();
  surveyDeserialize(builder, json);
  const survey = builder.build();
  t.deepLooseEqual(survey, exampleSurvey);
  t.end();
});

test("cloning survey", t => {
  const builder1 = clone(exampleSurvey);
  const builder2 = clone(
    builder1.get().update({ __keys__: { id: 1 }, __changes__: {} })
  );
  t.false(builder2.get().__keys__?.id);
  t.end();
});

test("Serialization without keys", t => {
  const json = surveySerialize(exampleSurvey, false);
  const str = JSON.stringify(json);
  t.false(/"__keys__":\{[^}]+\}/.test(str));
  t.end();
});
