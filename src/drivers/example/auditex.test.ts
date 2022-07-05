import test from "tape";
import {
  testInterviewCodeAudit,
  testInterviewItemCodeAudit,
  testParticipantCodeAudit,
  testParticipantInterviewsAudit,
} from "../tests/audittests.js";
import { seedExample } from "./example.js";
import { ExampleDrivers } from "./index.js";

test("Example audit driver for interview item code", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testInterviewItemCodeAudit(drivers, t);
  t.end();
});

test("Example audit driver for interview code", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testInterviewCodeAudit(drivers, t);
  t.end();
});

test("Example audit driver for participant code", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testParticipantCodeAudit(drivers, t);
  t.end();
});

test("Example audit driver for participant interviews #329", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testParticipantInterviewsAudit(drivers, t);
  t.end();
});
