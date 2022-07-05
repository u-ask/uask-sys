import test from "./test-runner.js";
import { getItem, getTranslation, Library, Page } from "uask-dom";
import { librarySerialize } from "../../json/index.js";
import {
  cleanTestDb,
  P11_05,
  seedTestIncludes,
  seedTestPageItems,
  seedTestPages,
  seedTestRules,
  seedTestSurvey,
} from "./test-utils.js";
import { Store } from "./store.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageItems(store);
}

test("Save include", async (store, t) => {
  await seed(store);
  await store.includeDriver.save(
    P11_05,
    P11_05.pages[3],
    P11_05.pages[3].includes[0],
    1
  );

  const query = await store.client.table("includes").select();
  t.true(query[0].pageId > 0);
  t.true(query[0].pageItemId > 0);
});

test("Save all includes", async (store, t) => {
  await seed(store);
  await seedTestIncludes(store);

  const page = P11_05.pages.find(
    p => getTranslation(p.name, "en") == "General"
  ) as Page;
  const query0 = await store.client
    .table("includes")
    .where("includedPageId", store.client.ref("pageId"))
    .where("pageId", page.__keys__?.id);
  t.true(query0.length > 5);

  const library = P11_05.pages.find(
    p => getTranslation(p.name, "en") == "Status"
  ) as Page;
  const query1 = await store.client
    .table("includes")
    .where("pageId", library.__keys__?.id)
    .where("includedPageId", "<>", store.client.ref("pageId"));
  t.equal(query1.length, 1);
  t.end();
});

test("Update library include", async (store, t) => {
  await seed(store);
  const included = P11_05.pages.find(p => p.items.length > 3) as Page;
  const page = P11_05.pages.find(
    p =>
      p != included &&
      !p.includes.find(i => i instanceof Library && i.page == included)
  ) as Page;
  const twoFirstItems = included.items.filter((_, i) => i < 2).map(getItem);
  const library = new Library(included, twoFirstItems);

  await store.includeDriver.save(P11_05, page, library, 100);

  const query0 = await store.client.table("includes").where({
    pageId: page.__keys__?.id,
    includedPageId: included.__keys__?.id,
  });
  t.equal(query0.length, 2);

  const threeFirstItems = included.items.filter((_, i) => i < 3).map(getItem);
  const updated = new Library(included, threeFirstItems);

  await store.includeDriver.save(P11_05, page, updated, 100);

  const query1 = await store.client.table("includes").where({
    pageId: page.__keys__?.id,
    includedPageId: included.__keys__?.id,
  });
  t.equal(query1.length, 3);
  t.end();
});

test("Get include row for page", async (store, t) => {
  await seed(store);
  await seedTestPages(store);
  await seedTestPageItems(store);
  await seedTestIncludes(store);
  await seedTestRules(store);

  const page = getPage("Status");

  const nodes = await store.includeStore.getNodes(
    P11_05.options,
    page.__keys__
  );

  nodes.forEach((n, i) => {
    const obj = librarySerialize(page.includes[i], P11_05.options);
    if ("__changes__" in obj) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __changes__, ...expected } = obj;
      t.deepLooseEqual(n, expected);
    } else {
      t.deepLooseEqual(n, obj);
    }
  });

  t.end();
});

function getPage(pageName: string) {
  const page = P11_05.pages.find(
    p => getTranslation(p.name, "en") == pageName
  ) as Page;
  if (!page?.__keys__) throw "key missing";
  return page;
}
