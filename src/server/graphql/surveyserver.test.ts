import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { graphql } from "graphql";
import { buildSupport } from "./builder.js";
import { surveyDeserialize, surveySerialize } from "../../system/server.js";
import { builder, DNode, Survey, SurveyBuilder } from "uask-dom";
import { buildSurveySupport } from "./surveyserver.js";
import { P11_05, seedExample } from "../../drivers/example/example.js";

const schemaBuilder = buildSupport();
const support = buildSurveySupport(schemaBuilder, c =>
  c(new ExampleDrivers(), "me")
);
schemaBuilder.queryType({
  fields: g => ({
    ...support.queryFields(g),
  }),
});
schemaBuilder.mutationType({
  fields: g => ({
    ...support.mutationFields(g),
  }),
});

test("Graph QL survey query", async t => {
  seedExample();
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ survey(name: "P11-05") }',
  });
  t.false(response.errors);
  const b = new SurveyBuilder();
  surveyDeserialize(b, response.data?.survey as DNode<Survey>);
  t.deepLooseEqual(b.get(), P11_05);
  t.end();
});

test("Graph QL survey save", async t => {
  seedExample();
  const b = builder();
  b.survey("P11-06").pageSet("PS1").pages("P1");
  b.page("P1").question("Q1", "Q1", b.types.yesno);
  const survey = surveySerialize(b.get());
  const query = `mutation ($survey: Json!){ saveSurvey(name: "P11-06", survey: $survey) }`;
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: query,
    variableValues: { survey },
  });
  t.false(response.errors);
  t.deepLooseEqual(response.data?.saveSurvey, survey);
  t.end();
});
