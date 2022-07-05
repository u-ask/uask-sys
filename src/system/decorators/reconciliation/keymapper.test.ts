import test from "../../store/db/test-runner.js";
import { P11_05 } from "../../store/db/test-utils.js";
import { SurveyStoreDriver } from "../../store/surveystore.js";
import { KeyMapper } from "./keymapper.js";
import { getTranslation } from "uask-dom";
import { seed } from "./test-utils.js";

test("Get survey Keys", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const keyMapper = new KeyMapper(driver, P11_05.name);
  t.deepEqual(await keyMapper.getSurveyKeys(), survey.__keys__);
  t.end();
});

test("Get workflow Keys", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const keyMapper = new KeyMapper(driver, P11_05.name);
  t.deepEqual(
    await keyMapper.getWorkflowKeys(survey.workflows[1]),
    survey.workflows[1].__keys__
  );
  t.end();
});

test("Get pageSet Keys", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const keyMapper = new KeyMapper(driver, P11_05.name);
  t.deepEqual(
    await keyMapper.getPageSetKeys(survey.pageSets[1]),
    survey.pageSets[1].__keys__
  );
  t.end();
});

test("Get pages Keys", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const keyMapper = new KeyMapper(driver, P11_05.name);
  const pageKeys = survey.pages.find(
    p => getTranslation(p.name, "en") == "Home"
  )?.__keys__;
  t.deepEqual(
    await keyMapper.getPageKeys({ en: "Home", fr: "Synthèse" }),
    pageKeys
  );
  t.end();
});

test("Get page item Keys", async (store, t) => {
  const survey = await seed(store);
  const driver = new SurveyStoreDriver(store);
  const keyMapper = new KeyMapper(driver, P11_05.name);
  const itemKeys = survey.items.find(i => i.variableName == "PINIT")?.__keys__;
  t.deepEqual(await keyMapper.getPageItemKeys("PINIT"), itemKeys);
  t.end();
});
