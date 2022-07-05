import { graphql } from "graphql";
import { ParticipantBuilder, DomainCollection, Participant, DNode } from "uask-dom";
import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";
import {
  P11_05,
  P11_05_Participants,
  P11_05_Samples,
  seedExample,
} from "../../drivers/example/example.js";
import { participantDeserialize } from "../../system/json/participantjson.js";
import { buildSupport } from "./builder.js";
import { buildParticipantSupport } from "./participantserver.js";

const schemaBuilder = buildSupport();
const support = buildParticipantSupport(schemaBuilder, c =>
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

test("Graph QL participant query", async t => {
  seedExample();
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ participant(survey: "P11-05", code: "000001") }',
  });
  t.false(response.errors);
  const b = new ParticipantBuilder(P11_05, DomainCollection(...P11_05_Samples));
  participantDeserialize(b, response.data?.participant as DNode<Participant>);
  const expected = P11_05_Participants[0];
  const participant = b.build();
  t.deepLooseEqual(participant, expected);
  t.end();
});

test("Graph QL participant query", async t => {
  seedExample();
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: '{ participants(survey: "P11-05", offset: 0, limit: 10) }',
  });
  t.false(response.errors);
  let i = 0;
  for (const p of response.data?.participants as DNode<Participant>[]) {
    const b = new ParticipantBuilder(P11_05, DomainCollection(...P11_05_Samples));
    participantDeserialize(b, p);
    const expected = P11_05_Participants[i];
    const participant = b.build();
    t.deepLooseEqual(participant, expected);
    i++;
  }
  t.end();
});

test("Graph QL participant create mutation", async t => {
  seedExample();
  const lastCode = P11_05_Participants[P11_05_Participants.length - 1].participantCode;
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: 'mutation { createParticipant(survey: "P11-05", sample: "001") }',
  });
  t.false(response.errors);
  t.true(
    lastCode.localeCompare(
      (response.data?.createParticipant as DNode<Participant>).participantCode
    ) < 0
  );
  t.equal(P11_05_Participants[P11_05_Participants.length - 1].sample.sampleCode, "001");
  t.end();
});

test("Graph QL participant update mutation", async t => {
  seedExample();
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      'mutation { saveParticipant(survey: "P11-05", code: "000001", sample: "002", kwargs: { email: "why@dig.org" }) }',
  });
  t.false(response.errors);
  t.deepEqual(
    (response.data?.saveParticipant as DNode<Participant>).participantCode,
    "000001"
  );
  t.equal(P11_05_Participants[0].sample.sampleCode, "002");
  t.end();
});

test("Graph QL participant delete mutation", async t => {
  seedExample();
  const response = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      'mutation { deleteParticipant(survey: "P11-05", code: "000009", reason: "test") }',
  });
  t.false(response.errors);
  t.true(P11_05_Participants[8].__delete__);
  t.end();
});
