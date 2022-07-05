import test from "./test-runner.js";
import { seedExample } from "../drivers/example/index.js";
import {
  testInterviewCodeAudit,
  testInterviewItemCodeAudit,
  testParticipantCodeAudit,
  testParticipantInterviewsAudit,
} from "../drivers/tests/audittests.js";
import { ClientDrivers } from "./driver.js";
import { HTTPError } from "got/dist/source";

test("Interview item audit records from graphql driver #123", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewItemCodeAudit(drivers, t).catch((e: HTTPError) =>
    t.fail(e.response.body as string)
  );
  t.end();
});

test("Interview audit records from graphql driver #123", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewCodeAudit(drivers, t);
  t.end();
});

test("Participant audit records from graphql driver #124", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantCodeAudit(drivers, t);
  t.end();
});

test("Create records for a participant interviews #329", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantInterviewsAudit(drivers, t);
  t.end();
});
