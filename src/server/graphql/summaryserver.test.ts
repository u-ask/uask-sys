import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";

import { graphql } from "graphql";
import { buildSupport } from "./builder.js";
import { Json, ParticipantSummary } from "../../drivers/index.js";
import { buildSummarySupport } from "./summaryserver.js";
import { P11_05_Participants, seedExample } from "../../drivers/example/example.js";

const drivers = new ExampleDrivers();
const schemaBuilder = buildSupport();
const support = buildSummarySupport(schemaBuilder, c => c(drivers, "me"));
schemaBuilder.queryType({
  fields: g => ({
    ...support.queryFields(g),
  }),
});

test("Graph QL participant summary query", async t => {
  seedExample();
  const count = P11_05_Participants.length;
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      '{ summary(survey: "P11-05") { participantCode, sampleCode, interviewCount, pins, currentInterview, kpis } }',
  });
  t.false(response.errors);
  t.deepEqual((response.data?.summary as Json[]).length, count);
  t.true(
    (response.data?.summary as Json[]).every(
      (i: Json) => "pins" in i && "currentInterview" in i && "kpis" in i
    )
  );
  t.end();
});

test("Graph QL participant summary query by sample", async t => {
  seedExample();
  const count = P11_05_Participants.filter(p => p.sample.sampleCode == "001").length;
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      '{ summary(survey: "P11-05", sample: "001") { participantCode, sampleCode, interviewCount, pins, kpis } }',
  });
  t.false(response.errors);
  t.equal((response.data?.summary as Json[]).length, count);
  t.end();
});

test("Graph QL current interview query", async t => {
  seedExample();
  const count = P11_05_Participants.length;
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ summary(survey: "P11-05") { participantCode, currentInterview } }',
  });
  t.false(response.errors);
  t.equal((response.data?.summary as Json[]).length, count);
  t.true(
    (response.data?.summary as Json[]).every(
      (i: Json) => !("pins" in i) && "currentInterview" in i
    )
  );
  t.end();
});

test("Graph QL alerts query", async t => {
  seedExample();
  const count = P11_05_Participants.length;
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ summary(survey: "P11-05") { participantCode, alerts } }',
  });
  t.false(response.errors);
  t.equal((response.data?.summary as Json[]).length, count);
  t.true(
    (response.data?.summary as Json[]).every((i: Json) =>
      Array.isArray(i.alerts)
    )
  );
  t.end();
});
