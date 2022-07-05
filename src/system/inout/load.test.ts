import test from "../store/db/test-runner.js";
import {
  ParticipantStoreDriver,
  SampleStoreDriver,
  Store,
  SurveyStoreDriver,
} from "../store/index.js";
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
} from "../store/db/test-utils.js";
import { clearDatabase, getSeedInfo, load, Seed } from "./load.js";
import { dump } from "./dump.js";
import { dumpRenamedSamples } from "./test-utils.js";

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

test("Get survey identifier", async (store, t) => {
  await seed(store);
  const { id } = (await getSeedInfo(store.client, "P11-05")) as Seed;
  const seedInfo = await getSeedInfo(store.client, "P11-05");
  t.equal(id, seedInfo?.id);
  t.end();
});

test("No tracking in dump", async (store, t) => {
  await seed(store);
  const dumped = await dump(store.client, "P11-05");
  t.false(/__keys__/.test(dumped));
  t.false(/__changes__/.test(dumped));
  t.end();
});

test("Clear datbase", async (store, t) => {
  await seed(store);
  const { id } = (await getSeedInfo(store.client, "P11-05")) as Seed;
  await clearDatabase(store.client, id);
  const seedInfo = await getSeedInfo(store.client, "P11-05");
  t.false(seedInfo);
  t.end();
});

test("Reload database", async (store, t) => {
  await seed(store);
  const survey0 = await new SurveyStoreDriver(store).getByName("P11-05");
  const samples0 = await new SampleStoreDriver(store).getAll(survey0);
  const participants0 = await new ParticipantStoreDriver(store).getAll(survey0, samples0);
  const dumped = await dump(store.client, "P11-05");
  await load(store.client, JSON.parse(dumped));
  const survey1 = await new SurveyStoreDriver(store).getByName("P11-05");
  const samples1 = await new SampleStoreDriver(store).getAll(survey1);
  const participants1 = await new ParticipantStoreDriver(store).getAll(survey1, samples1);
  t.notEqual(survey1.__keys__?.id, survey0.__keys__?.id);
  t.equal(samples1.length, samples0.length);
  t.equal(participants1.length, participants0.length);
  t.end();
});

test("Seed database", async (store, t) => {
  await seed(store);
  const dumped = await dump(store.client, "P11-05");
  const timestamp = Date.now() - 1;
  await load(store.client, { ...JSON.parse(dumped), timestamp });
  const seed1 = await getSeedInfo(store.client, "P11-05");
  t.equal(String(seed1?.timestamp), String(timestamp));
  await load(store.client, JSON.parse(dumped));
  const seed2 = await getSeedInfo(store.client, "P11-05");
  t.equal(seed2?.id, seed1?.id);
  await load(store.client, JSON.parse(dumped));
  const seed3 = await getSeedInfo(store.client, "P11-05");
  t.equal(seed3?.id, seed1?.id);
  await load(store.client, { ...JSON.parse(dumped), timestamp: Date.now() });
  const seed4 = await getSeedInfo(store.client, "P11-05");
  t.notEqual(seed4?.id, seed1?.id);
  t.end();
});

test("Sample information are seeded", async (store, t) => {
  await seed(store);
  const dumped = await dumpRenamedSamples(store);
  await load(store.client, dumped);
  const survey = await new SurveyStoreDriver(store).getByName("P11-05");
  const sampleDriver = new SampleStoreDriver(store);
  const samples = await sampleDriver.getAll(survey);
  for (const i in samples) {
    t.equal(samples[i].name, `Sample ${i}`);
    t.equal(samples[i].address, `${i} avenue`);
  }
  t.end();
});
