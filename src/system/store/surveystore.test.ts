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
  seedTestRules,
  seedTestWorkflows,
} from "./db/test-utils.js";
import {
  testSurveyNotFound,
  testSurveyGetByName,
  testSurveySave,
} from "../../drivers/tests/surveytests.js";

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
  await seedTestRules(store);
  await seedTestWorkflows(store);
}

test("Store driver - survey by name", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSurveyGetByName(drivers, t);
  t.end();
});

test("Store driver - survey not found", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSurveyNotFound(drivers, t);
  t.end();
});

test("Store driver - save survey", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSurveySave(drivers, t);
  t.end();
});
