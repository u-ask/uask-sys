import { seedExample } from "../../../drivers/example/index.js";
import test from "../../store/db/test-runner.js";
import { cleanTestDb, P11_05 } from "../../store/db/test-utils.js";
import { SurveyStoreDriver } from "../../store/surveystore.js";
import { reconcileSurvey } from "./reconciliation.js";
import { seed } from "./test-utils.js";

test("Reconcile keys in a survey", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const survey1 = P11_05;
  await reconcileSurvey(driver, survey1);
  t.deepEqual(survey1.__keys__?.id, survey.__keys__?.id);
  t.deepEqual(
    survey1.workflows[1].__keys__?.id,
    survey.workflows[1].__keys__?.id
  );
  t.deepEqual(survey1.pageSets[0].__keys__?.id, survey.pageSets[0].__keys__?.id);
  t.deepEqual(survey1.pages[0].__keys__?.id, survey.pages[0].__keys__?.id);
  t.deepEqual(survey1.items[0].__keys__?.id, survey.items[0].__keys__?.id);
  t.end();
});

test("Handle survey version", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const survey1 = P11_05;
  await reconcileSurvey(driver, survey1);
  t.equals(survey.__keys__?.version, 1);
  t.equals(survey1.__keys__?.version, 2);
  t.end();
});

test("Handle pageItem version", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const survey1 = P11_05;
  await reconcileSurvey(driver, survey1);
  t.equals(survey.items[0].__keys__?.version, 1);
  t.equals(survey1.items[0].__keys__?.version, 2);
  t.end();
});

test("New survey", async (store, t) => {
  await cleanTestDb(store);
  seedExample();
  const driver = new SurveyStoreDriver(store);
  const survey = P11_05;
  await reconcileSurvey(driver, survey);
  t.false(survey.__keys__?.id);
  t.equal(survey.__keys__?.version, 1);
  t.false(survey.items[0].__keys__?.id);
  t.equal(survey.items[0].__keys__?.version, 1);
  t.end();
});
