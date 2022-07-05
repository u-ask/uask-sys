import test from "./test-runner.js";
import { ClientDrivers } from "./driver.js";
import {
  testParticipantGetByCode,
  testParticipantUpdate,
  testParticipantCreate,
  testParticipantError,
  testParticipantGetAll,
  testParticipantGetBySample,
  testParticipantGetByPage,
  testParticipantDelete,
} from "../drivers/tests/participanttests.js";
import { seedExample } from "../drivers/example/index.js";

test("Participant example driver", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantGetAll(drivers, t);
  t.end();
});

test("Participant example by page", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantGetByPage(drivers, t);
  t.end();
});

test("Participant example by sample", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantGetBySample(drivers, t);
  t.end();
});

test("Participant get with graphql client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantGetByCode(drivers, t);
  t.end();
});

test("Participant update with graphql client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantUpdate(drivers, t);
  t.end();
});

test("Participant create with graphql client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantCreate(drivers, t);
  t.end();
});

test("Participant delete with graphql client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantDelete(drivers, t);
  t.end();
});

test("Participant get by code error", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testParticipantError(drivers, t);
  t.end();
});

test("Participant get has limits", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  t.throws(() => drivers.participantDriver.getAll(survey, samples));
  t.throws(() => drivers.participantDriver.getBySample(survey, samples[0]));
  t.throws(() => drivers.participantDriver.getAll(survey, samples, { limit: 21 }));
  t.throws(() =>
    drivers.participantDriver.getBySample(survey, samples[0], { limit: 21 })
  );
  t.end();
});
