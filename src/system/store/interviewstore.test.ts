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
  testInterviewCreation,
  testInterviewDelete,
  testInterviewItemSubsetUpdate,
  testInterviewItemUpdate,
} from "../../drivers/tests/interviewtests.js";
import { buildDrivers } from "./test-utils.js";

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

test("Store driver - create interview", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testInterviewCreation(drivers, t);
  t.end();
});

test("Store driver - update items", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testInterviewItemUpdate(drivers, t);
  t.end();
});

test("Store driver - update item subset", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testInterviewItemSubsetUpdate(drivers, t);
  t.end();
});

test("Store driver - delete an interview", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testInterviewDelete(drivers, t);
  t.end();
});
