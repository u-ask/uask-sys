import test from "./test-runner.js";
import { getItem, getTranslation, GlobalScope, PageItem } from "uask-dom";
import { PageItemDriver } from "./pageitemdb.js";
import { itemSerialize } from "../../json/index.js";
import {
  cleanTestDb,
  seedTestSurvey,
  P11_05,
  seedTestPageItems,
  seedTestRules,
} from "./test-utils.js";
import { Sample } from "uask-dom";
import { Store } from "./store.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
}

test("Global page items merged to database", async (store, t) => {
  await seed(store);
  const globals = new GlobalScope().items.map(i => i.pageItem);

  const query = await store.client.table("pageItems").whereNull("surveyId");
  t.equal(query.length, 0);

  await PageItemDriver.initGlobalItems(store.client);
  t.true(globals.every(i => i.__keys__?.id));
  t.end();
});

test("Global page items already merged in database", async (store, t) => {
  await seed(store);
  const globals = new GlobalScope({
    lastInput: new Date(),
    sample: new Sample(""),
  }).items.map(i => i.pageItem);

  await store.pageItemDriver.getGlobals();
  const query = await store.client.table("pageItems").whereNull("surveyId");
  t.equal(query.length, globals.length);

  t.true(globals.every(i => i.__keys__?.id));
  t.end();
});

test("Save pageItem", async (store, t) => {
  await seed(store);
  const pi = getWeight();
  const addInfo = await store.pageItemDriver.save(P11_05, pi);
  t.true(addInfo.__keys__?.id);
  const query = await store.client
    .table("pageItems")
    .where("variableName", "WEIGHT")
    .where("surveyId", P11_05.__keys__?.id);
  t.equal(query.length, 1);
  t.equal(query[0].id, addInfo.__keys__?.id);
  t.end();
});

test("Update page items", async (store, t) => {
  await seed(store);
  const pi = getWeight();

  const addInfo = await store.pageItemDriver.save(P11_05, pi);
  pi.update(addInfo);

  const updated = pi.update({ comment: "update" });
  await store.pageItemDriver.save(P11_05, updated);

  const query1 = await store.client
    .table("pageItems")
    .where("id", pi.__keys__?.id);
  t.equal(query1[0].comment, '"update"');
  t.end();
});

test("Get page item node", async (store, t) => {
  await seed(store);
  await seedTestPageItems(store);
  await seedTestRules(store);

  const item = P11_05.items[12];
  if (!item.__keys__) throw "keys missing";

  const node = await store.pageItemStore.getNode(item.__keys__);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __changes__, ...expected } = itemSerialize(item);
  t.deepLooseEqual(node, expected);

  t.end();
});

function getWeight() {
  return P11_05.pages
    .find(p => getTranslation(p.name, "en") == "General")
    ?.items.find(i => getItem(i).variableName == "WEIGHT") as PageItem;
}
