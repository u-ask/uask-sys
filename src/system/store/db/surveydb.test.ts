/* eslint-disable @typescript-eslint/no-unused-vars */
import test from "./test-runner.js";
import {
  cleanTestDb,
  P11_05,
  seedTestIncludes,
  seedTestPageItems,
  seedTestPages,
  seedTestPageSets,
  seedTestRules,
  seedTestSurvey,
  seedTestWorkflows,
} from "./test-utils.js";
import { Store } from "./store.js";
import { surveySerialize } from "../../json/index.js";

async function seed(store: Store) {
  await cleanTestDb(store);
}

test("Save survey row", async (store, t) => {
  await seed(store);
  const addInfo = await store.surveyDriver.save(P11_05);
  t.true(addInfo.__keys__?.id);
  const query = await store.client
    .table("surveys")
    .where("id", addInfo.__keys__?.id)
    .select("name");
  t.equal(query.length, 1);
  t.equal(query[0].name, P11_05.name);
  t.end();
});

test("Update survey row", async (store, t) => {
  await seed(store);
  const addInfo = await store.surveyDriver.save(P11_05);
  P11_05.update(addInfo);

  const updated = P11_05.update({ name: "update" });
  await store.surveyDriver.save(updated);

  const query1 = await store.client
    .table("surveys")
    .where("id", P11_05.__keys__?.id);
  t.equal(query1[0].name, "update");
  t.end();
});

test("Get survey", async (store, t) => {
  await seed(store);
  await seedTestSurvey(store);
  const surveyRow = await store.surveyDriver.getByName("P11-05");
  t.equal(surveyRow.name, P11_05.name);
  t.deepEqual(JSON.parse(surveyRow.options), P11_05.options);
  t.deepEqual(surveyRow.__keys__, P11_05.__keys__);
  t.end();
});

test("Get survey nodes", async (store, t) => {
  await seed(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestWorkflows(store);
  await seedTestPageItems(store);
  await seedTestIncludes(store);
  await seedTestRules(store);

  const node = await store.getSurveyNode(P11_05.name);

  const { crossRules, workflows, pageSets, pages, ...snode } = node;
  const {
    __changes__,
    crossRules: c,
    workflows: w,
    pageSets: pS,
    pages: p,
    ...expected
  } = surveySerialize(P11_05);
  t.true(c);
  t.true(w);
  t.true(pS);
  t.true(p);
  t.deepLooseEqual(snode, expected);

  t.end();
});
