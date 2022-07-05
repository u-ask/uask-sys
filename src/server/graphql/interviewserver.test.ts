import { graphql } from "graphql";
import { Interview } from "uask-dom";
import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";
import {
  P11_05,
  P11_05_Participants,
  seedExample,
} from "../../drivers/example/example.js";
import { buildSupport } from "./builder.js";
import { buildInterviewSupport } from "./interviewserver.js";
import { PartialInterview } from "../../drivers/interview.js";

const schemaBuilder = buildSupport();
const support = buildInterviewSupport(schemaBuilder, c =>
  c(new ExampleDrivers(), "me")
);

schemaBuilder.queryType({
  fields: g => ({
    p: g.field({
      type: "Int",
      resolve: () => {
        return 1;
      },
    }),
  }),
});

schemaBuilder.mutationType({
  fields: g => ({
    ...support.mutationFields(g),
  }),
});

test("Graph QL interview create mutation", async t => {
  seedExample();
  const nonce = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      'mutation { createInterview(survey: "P11-05", participant: "000014", pageSet: "Inclusion") }',
  })
    .then(
      response => (response.data?.createInterview as PartialInterview)[0].nonce
    )
    .catch(e => t.fail(e));
  t.true(nonce);
  const participant = P11_05_Participants[13];
  t.equal(participant.interviews.length, 1);
  t.equal(participant.interviews[0].pageSet, P11_05.pageSets[1]);
  t.equal(participant.interviews[0].nonce, nonce);
  t.end();
});

test("Graph QL interview with item save mutation", async t => {
  seedExample();
  const nonce = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      'mutation { createInterview(survey: "P11-05", participant: "000012", pageSet: "Inclusion") }',
  }).then(
    response => (response.data?.createInterview as PartialInterview)[0].nonce
  );

  const result = await graphql({
    schema: schemaBuilder.toSchema({}),
    source: `mutation { saveInterview(survey: "P11-05", participant: "000012", nonce: ${nonce}, items: [{variableName: "VDATE", value:"2021-01-15"}]) }`,
  });
  const saved = result.data?.saveInterview as PartialInterview;
  t.equal(saved.length, 2);
  t.equal(saved[1].items.length, 1);

  const participant = P11_05_Participants[11];
  const interview = participant.interviews[0];
  t.true(
    interview.items.find(
      i => i.pageItem.variableName == "VDATE" && typeof i.value != "undefined"
    )
  );
  t.deepEqual(
    interview.items.find(i => i.pageItem.variableName == "VDATE")?.value,
    new Date("2021-01-15")
  );
  t.end();
});

test("Graph QL interview with item create mutation", async t => {
  seedExample();
  const nonce = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      'mutation { createInterview(survey: "P11-05", participant: "000012", pageSet: "Inclusion", items: [{variableName: "VDATE", value:"2021-01-15"}]) }',
  })
    .then(
      response => (response.data?.createInterview as PartialInterview)[0].nonce
    )
    .catch(e => t.fail(e));

  t.ok(nonce);
  const participant = P11_05_Participants[11];
  const interview = participant.interviews.find(
    i => i.nonce == nonce
  ) as Interview;
  t.true(
    interview.items.find(
      i => i.pageItem.variableName == "VDATE" && typeof i.value != "undefined"
    )
  );
  t.deepEqual(
    interview.items.find(i => i.pageItem.variableName == "VDATE")?.value,
    new Date("2021-01-15")
  );
  t.end();
});

test("Graph QL interview delete mutation", async t => {
  seedExample();
  const nonce = await graphql({
    schema: schemaBuilder.toSchema({}),
    source:
      'mutation { createInterview(survey: "P11-05", participant: "000012", pageSet: "Inclusion", items: [{variableName: "VDATE", value:"2021-01-15"}]) }',
  })
    .then(
      response => (response.data?.createInterview as PartialInterview)[0].nonce
    )
    .catch(e => t.fail(e));
  const participant0 = P11_05_Participants[11];
  t.ok(participant0.interviews.some(i => i.nonce == nonce));

  await graphql({
    schema: schemaBuilder.toSchema({}),
    source: `mutation { deleteInterview(survey: "P11-05", participant: "000012", nonce: ${nonce}, reason: "test") }`,
  });
  const participant1 = P11_05_Participants[11];
  t.ok(participant1.interviews.every(i => i.nonce != nonce));
  t.end();
});
