/* eslint-disable @typescript-eslint/no-unused-vars */
import test from "./test-runner.js";
import {
  cleanTestDb,
  P11_05,
  seedTestPages,
  seedTestPageSets,
  seedTestSurvey,
} from "./test-utils.js";
import { Page, getTranslation, DNode } from "uask-dom";
import { pageSerialize } from "../../json/index.js";
import { Test } from "tape";
import parse from "csv-parse";
import { Store } from "./store.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
}

test("Save pages", async (store, t) => {
  await seed(store);
  await seedTestPages(store);
  t.true(P11_05.pages.every(p => p.__keys__?.id));

  const query = await store.client
    .table("pages")
    .where("surveyId", P11_05.__keys__?.id)
    .orderBy("id")
    .select<{ id: number; name: string }[]>(["id", "name"]);
  t.true(query.length > 6);

  t.true(
    query.every(q => {
      const page = P11_05.pages.find(p => p.__keys__?.id == q.id);
      return q.name == JSON.stringify(page?.name);
    })
  );
  t.end();
});

test("Update page", async (store, t) => {
  await seed(store);
  const p = getPageGeneral();

  const addInfo = await store.pageDriver.save(P11_05, p, 0);
  p.update(addInfo);

  const updated = p.update({ name: "update" });
  await store.pageDriver.save(P11_05, updated, 0);

  const query1 = await store.client.table("pages").where("id", p.__keys__?.id);
  t.equal(query1[0].name, '"update"');
  t.end();
});

function getPageGeneral() {
  return P11_05.pages.find(
    p => getTranslation(p.name, "en") == "General"
  ) as Page;
}

test("Get page nodes by pageSet keys", async (store, t) => {
  await seed(store);
  await seedTestPages(store);
  await seedTestPageSets(store);

  const pageSet = P11_05.pageSets[2];
  if (!pageSet.__keys__) throw "keys missing";

  const pages = pageSet.pages;

  const nodes = await store.pageStore.getNodes(
    "pageSet",
    P11_05.options,
    pageSet.__keys__
  );
  t.equal(nodes.length, pages.length);

  nodes.forEach((n, p) => checkNodes(n, pages[p], t));

  t.end();
});

test("Get page nodes by survey keys", async (store, t) => {
  await seed(store);
  await seedTestPages(store);

  const surveyKey = P11_05.__keys__;
  if (!surveyKey) throw "keys missing";

  const pages = P11_05.pages;

  const nodes = await store.pageStore.getNodes(
    "survey",
    P11_05.options,
    surveyKey
  );
  t.equal(nodes.length, pages.length);

  nodes.forEach((n, p) => checkNodes(n, pages[p], t));
  t.end();
});

function checkNodes(n: DNode<Page>, p: Page, t: Test) {
  const { includes, ...pnode } = n;
  const {
    __changes__,
    includes: i,
    ...expected
  } = pageSerialize(p, P11_05.options);
  t.true(i);
  t.deepEqual(pnode, expected);
}
