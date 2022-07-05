import sinon from "sinon";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import {
  testParticipantCreate,
  testParticipantDelete,
  testParticipantGetAll,
  testParticipantGetByCode,
  testParticipantGetByPage,
  testParticipantGetBySample,
  testParticipantNotFound,
  testParticipantUpdate,
} from "../../../drivers/tests/participanttests.js";
import { ParticipantCacheDriver } from "./participantcache.js";

test("Participant example driver", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantGetAll(drivers, t);
  t.end();
});

test("Participant example by page", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantGetByPage(drivers, t);
  t.end();
});

test("Participant example by sample", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantGetBySample(drivers, t);
  t.end();
});

test("Participant example by participantCode", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantGetByCode(drivers, t);
  t.end();
});

test("Participant unknown", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantNotFound(drivers, t);
  t.end();
});

test("Participant example save created", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantCreate(drivers, t);
  t.end();
});

test("Participant example save updated", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantUpdate(drivers, t);
  t.end();
});

test("Participant example delete", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testParticipantDelete(drivers, t);
  t.end();
});

test("Participant stored in cache when get by code", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000006"
  );
  t.true(participant);
  const cached = Reflect.get(ParticipantCacheDriver, "get")(survey, "000006");
  t.equal(cached, participant);
  t.end();
});

test("Participant removed from cache when saved", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000006"
  );
  await drivers.participantDriver.save(survey, participant);
  const cached = Reflect.get(ParticipantCacheDriver, "get")(survey, "000006");
  t.false(cached);
  t.end();
});

test("Participant reloaded when survey version changes", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000006"
  );
  ParticipantCacheDriver.set(survey, participant);
  const participantGet = sinon.spy(
    Reflect.get(drivers.participantDriver, "driver"),
    "getByParticipantCode"
  );
  await drivers.participantDriver.getByParticipantCode(survey, samples, "000006");
  t.false(participantGet.called);
  const newVersion = survey.update({
    __keys__: Object.assign({}, survey.__keys__, {
      version: (survey.__keys__?.version ?? 0) + 1,
    }),
  });
  await drivers.participantDriver.getByParticipantCode(newVersion, samples, "000006");
  t.true(participantGet.called);
  t.end();
});

function buildDrivers() {
  ParticipantCacheDriver._init();
  const drivers = new ExampleDrivers();
  const participantDriver = new ParticipantCacheDriver(
    drivers.participantDriver,
    drivers.sampleDriver
  );
  return { ...drivers, participantDriver };
}
