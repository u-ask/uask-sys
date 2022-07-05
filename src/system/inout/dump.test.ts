import ttest from "tape";
import test from "../store/db/test-runner.js";
import { SurveyBuilder } from "uask-dom";
import { dataStringify, dump } from "./dump.js";
import { Store } from "../store/index.js";
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

ttest("Identifiers are removed but versions are kept", t => {
  const surveyBuilder = new SurveyBuilder();
  surveyBuilder.survey("Test");
  surveyBuilder.track({ __keys__: { id: 2, version: 4 } }, {});
  const str = dataStringify(surveyBuilder.build(), [], []);
  t.notok(JSON.parse(str).survey.__keys__);
  t.end();
});

test("Dump contains no id", async (store, t) => {
  await seed(store);
  const dumped = await dump(store.client, "P11-05");
  t.false(/"id"/.test(dumped));
  t.end();
});

test("Dump contains timestamp", async (store, t) => {
  await seed(store);
  const dumped = await dump(store.client, "P11-05", true);
  t.true(/"timestamp":/.test(dumped));
  t.end();
});

test("Dump contains sample information", async (store, t) => {
  await seed(store);
  const dumped = await dumpRenamedSamples(store);
  t.true(/"Sample 0".*"1 avenue"/.test(dumped));
  t.end();
});
