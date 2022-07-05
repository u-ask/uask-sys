import test from "tape";
import { graphql } from "graphql";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { buildSupport } from "./builder.js";
import { buildSampleSupport } from "./sampleserver.js";
import { P11_05_Samples, seedExample } from "../../drivers/example/example.js";
import { Sample } from "uask-dom";

const schemaBuilder = buildSupport();
const support = buildSampleSupport(schemaBuilder, c =>
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

test("Graphql sample query", async t => {
  seedExample();
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ samples(survey: "P11-05") }',
  });
  t.false(response.errors);
  t.deepLooseEqual(response.data?.samples, P11_05_Samples);
  t.end();
});

test("Graphql sample save", async t => {
  seedExample();
  const sample = new Sample("Test", { name: "TestSample", address: "TestAddress" });
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      "mutation ($survey: String!, $sample: Json!){ saveSample(survey: $survey, sample: $sample) }",
    variableValues: {
      survey: "P11-05",
      sample: sample,
    },
  });
  t.false(response.errors);
  t.deepLooseEqual(response.data?.saveSample, sample);
  t.end();
});
