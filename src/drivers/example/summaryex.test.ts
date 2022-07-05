import test from "tape";
import { ExampleDrivers } from "./index.js";
import {
  testSummaryParticipantInfo,
  testSummaryParticipantPins,
  testSummaryParticipantAlerts,
  testSummaryParticipantKpis,
} from "../tests/summarytests.js";
import { seedExample } from "./example.js";

test("Summary driver get participant information", async t => {
  seedExample();
  await testSummaryParticipantInfo(new ExampleDrivers(), t);
  t.end();
});

test("Summary driver get participant pinned items", async t => {
  seedExample();
  await testSummaryParticipantPins(new ExampleDrivers(), t);
  t.end();
});

test("Summary driver get participant kpied items", async t => {
  seedExample();
  await testSummaryParticipantKpis(new ExampleDrivers(), t);
  t.end();
});

test("Summary driver get participant alerts", async t => {
  seedExample();
  await testSummaryParticipantAlerts(new ExampleDrivers(), t);
  t.end();
});
