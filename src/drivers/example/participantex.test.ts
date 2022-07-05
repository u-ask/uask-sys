import test from "tape";
import {
  testParticipantCreate,
  testParticipantDelete,
  testParticipantGetAll,
  testParticipantGetByCode,
  testParticipantGetByPage,
  testParticipantGetBySample,
  testParticipantNotFound,
  testParticipantUpdate,
} from "../tests/participanttests.js";
import { ExampleDrivers } from "./index.js";
import { seedExample } from "./example.js";

test("Participant example driver", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testParticipantGetAll(drivers, t);
  t.end();
});

test("Participant example by page", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testParticipantGetByPage(drivers, t);
  t.end();
});

test("Participant example by sample", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  await testParticipantGetBySample(drivers, t);
  t.end();
});

test("Participant example by participantCode", async t => {
  seedExample();
  await testParticipantGetByCode(new ExampleDrivers(), t);
  t.end();
});

test("Participant unknown", async t => {
  seedExample();
  await testParticipantNotFound(new ExampleDrivers(), t);
  t.end();
});

test("Participant example save created", async t => {
  seedExample();
  await testParticipantCreate(new ExampleDrivers(), t);
  t.end();
});

test("Participant example save updated", async t => {
  seedExample();
  await testParticipantUpdate(new ExampleDrivers(), t);
  t.end();
});

test("Participant example delete", async t => {
  seedExample();
  await testParticipantDelete(new ExampleDrivers(), t);
  t.end();
});
