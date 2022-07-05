import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { buildSchema } from "./schema.js";

test("GraphQL query type", t => {
  const schema = buildSchema(c => c(new ExampleDrivers(), "me"));
  const queryFields = schema.getQueryType()?.getFields();
  t.deepEqual(Object.keys(queryFields ?? {}).sort(), [
    "auditRecords",
    "participant",
    "participants",
    "samples",
    "summary",
    "survey",
  ]);
  t.end();
});

test("GraphQL mutation type", t => {
  const schema = buildSchema(c => c(new ExampleDrivers(), "me"));
  const mutationFields = schema.getMutationType()?.getFields();
  t.deepEqual(Object.keys(mutationFields ?? {}).sort(), [
    "createInterview",
    "createParticipant",
    "deleteInterview",
    "deleteParticipant",
    "saveInterview",
    "saveParticipant",
    "saveSample",
    "saveSurvey",
  ]);
  t.end();
});
