import { Store } from "./../store/index.js";
import test from "./db/test-runner.js";
import tape from "tape";
import {
  cleanTestDb,
  seedTestSurvey,
  seedTestPages,
  seedTestPageSets,
  seedTestPageItems,
  seedTestSamples,
  seedTestParticipants,
  seedTestInterviews,
  seedTestIncludes,
  seedTestInterviewItems,
} from "./db/test-utils.js";
import {
  testParticipantCreate,
  testParticipantDelete,
  testParticipantGetByCode,
  testParticipantNotFound,
  testParticipantUpdate,
} from "../../drivers/tests/participanttests.js";
import { buildDrivers } from "./test-utils.js";
import { computeNewCode } from "./participantstore.js";
import { Participant, formatCode } from "uask-dom";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestPageItems(store);
  await seedTestIncludes(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);
}

test("Store driver - participant by code", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantGetByCode(drivers, t);
  t.end();
});

test("Store driver - participant not found", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantNotFound(drivers, t);
  t.end();
});

test("Store driver - create participants", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantCreate(drivers, t);
  t.end();
});

test("Store driver - create participants with a by sample code strategy #336", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const bySample = survey.update({
    options: {
      ...survey.options,
      participantCodeStrategy: {
        length: 3,
        bySample: true,
      },
    },
  });
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "001");
  const participant = new Participant("", sample);
  const keys = await drivers.participantDriver.save(bySample, participant);
  t.equal(keys.participantCode, "001000014");
  t.equal(formatCode(participant.update(keys), bySample.options), "014");
  t.end();
});

test("Store driver - update participants", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantUpdate(drivers, t);
  t.end();
});

tape("Compute new participant code", t => {
  const newCode = computeNewCode("", ["301", "902", "2354"], {
    length: 5,
    bySample: false,
  });
  t.equal(
    formatCode(
      { participantCode: newCode },
      { participantCodeStrategy: { length: 5 } }
    ),
    "02355"
  );
  t.end();
});

test("Store driver - delete participant", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantDelete(drivers, t);
  t.end();
});
