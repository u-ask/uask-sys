import test from "./test-runner.js";
import { ClientDrivers } from "./driver.js";
import {
  testSummaryParticipantInfo,
  testSummaryParticipantPins,
  testSummaryParticipantAlerts,
  testSummaryParticipantKpis,
} from "../drivers/tests/summarytests.js";
import { seedExample } from "../drivers/example/index.js";

test("Summary graphql client get participant information", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSummaryParticipantInfo(drivers, t);
  t.end();
});

test("Summary graphql client get pins information", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSummaryParticipantPins(drivers, t);
  t.end();
});

test("Summary graphql client get kpis information", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSummaryParticipantKpis(drivers, t);
  t.end();
});

test("Summary graphql client get alert information", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSummaryParticipantAlerts(drivers, t);
  t.end();
});
