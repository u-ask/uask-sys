import { graphql } from "graphql";
import test from "tape";
import { AuditRecord } from "../../drivers/audit.js";
import {
  ExampleDrivers,
  P11_05_Participants,
  seedExample,
} from "../../drivers/example/index.js";
import { buildAuditSupport } from "./auditserver.js";
import { buildSupport } from "./builder.js";

const schemaBuilder = buildSupport();
const support = buildAuditSupport(schemaBuilder, c =>
  c(new ExampleDrivers(), "me")
);
schemaBuilder.queryType({
  fields: g => ({
    ...support.queryFields(g),
  }),
});

test("Graph QL interview item audit record query #123#180", async t => {
  seedExample();
  const interview = P11_05_Participants[0].interviews[1];
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: `{ auditRecords(survey: "P11-05", participantCode: "000001", nonce: ${interview.nonce}, variableName: "WEIGHT", instance: 1) }`,
  });
  t.false(response.errors);
  const itemTarget = {
    participantCode: "000001",
    nonce: interview.nonce,
    variableName: "WEIGHT",
    instance: 1,
  };
  const records = response.data?.auditRecords as AuditRecord[];
  t.deepEqual(
    records.map((r: AuditRecord) => r.target),
    [itemTarget, itemTarget, itemTarget]
  );
  t.end();
});

test("Graph QL interview audit record query #123", async t => {
  seedExample();
  const interview = P11_05_Participants[0].interviews[1];
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: `{ auditRecords(survey: "P11-05", participantCode: "000001", nonce: ${interview.nonce}) }`,
  });
  t.false(response.errors);
  const interviewTarget = {
    participantCode: "000001",
    nonce: interview.nonce,
  };
  const itemTarget = {
    participantCode: "000001",
    nonce: interview.nonce,
    variableName: "WEIGHT",
  };
  const records = response.data?.auditRecords as AuditRecord[];
  t.deepEqual(
    records.map((r: AuditRecord) => r.target),
    [interviewTarget, itemTarget, itemTarget, itemTarget]
  );
  t.end();
});

test("Graph QL participant audit record query #124", async t => {
  seedExample();
  const interview1 = P11_05_Participants[0].interviews[1];
  const interview2 = P11_05_Participants[0].interviews[2];
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ auditRecords(survey: "P11-05", participantCode: "000001") }',
  });
  t.false(response.errors);
  const participantTarget = {
    participantCode: "000001",
  };
  const interviewTarget1 = {
    participantCode: "000001",
    nonce: interview1.nonce,
  };
  const itemTarget1 = {
    participantCode: "000001",
    nonce: interview1.nonce,
    variableName: "WEIGHT",
  };
  const interviewTarget2 = {
    participantCode: "000001",
    nonce: interview2.nonce,
  };
  const itemTarget2 = {
    participantCode: "000001",
    nonce: interview2.nonce,
    variableName: "WEIGHT",
  };
  const records = response.data?.auditRecords as AuditRecord[];
  t.deepEqual(
    records.map((r: AuditRecord) => r.target),
    [
      participantTarget,
      participantTarget,
      interviewTarget1,
      itemTarget1,
      itemTarget1,
      itemTarget1,
      interviewTarget2,
      itemTarget2,
      itemTarget2,
      itemTarget2,
    ]
  );
  t.end();
});

test("Graph QL interview audit record specifics operation #151#165", async t => {
  const interview = P11_05_Participants[0].interviews[1];
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: `{ auditRecords(survey: "P11-05", participantCode: "000001", nonce: ${interview.nonce}, operations: ["create"])}`,
  });
  t.false(response.errors);
  const interviewTarget = {
    participantCode: "000001",
    nonce: interview.nonce,
  };
  const records = response.data?.auditRecords as AuditRecord[];
  t.deepEqual(
    records.map((r: AuditRecord) => r.target),
    [interviewTarget]
  );
  t.end();
});
