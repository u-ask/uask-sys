import { buildDrivers } from "./test-utils.js";
import { Store } from "./../store/index.js";
import test from "./db/test-runner.js";
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
  testSampleFrozen,
  testSampleGetAll,
  testSampleGetByCode,
  testSampleNotFound,
  testSampleSave,
} from "../../drivers/tests/sampletests.js";
import { Sample } from "uask-dom";

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

test("Store driver - all samples", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSampleGetAll(drivers, t);
  t.end();
});

test("Store driver - sample by code", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSampleGetByCode(drivers, t);
  t.end();
});

test("Store driver - sample not found", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSampleNotFound(drivers, t);
  t.end();
});

test("Store driver - save sample", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSampleSave(drivers, t);
  t.end();
});

test("Store driver - error on save sample", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample1 = new Sample("112");
  const sample2 = new Sample("112");

  await drivers.sampleDriver.save(survey, sample1);
  const error = await drivers.sampleDriver.save(survey, sample2).catch(err => err);
  t.equal(error.message, "Failed to register - MUST BE UNIQUE");
  t.end();
});

test("Store driver - frozen sample #301", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSampleFrozen(drivers, t);
  t.end();
});
