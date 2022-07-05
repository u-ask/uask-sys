import test from "./test-runner.js";
import {
  cleanTestDb,
  P11_05,
  seedTestSurvey,
  seedTestPageSets,
  seedTestPages,
} from "./test-utils.js";
import { DomainCollection, Page } from "uask-dom";
import { Store } from "./store.js";
import { pageSetSerialize } from "../../json/index.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
}

test("Save pageset", async (store, t) => {
  await seed(store);
  await seedTestPageSets(store);
  t.true(P11_05.pageSets.every(p => p.__keys__?.id));

  const query0 = await store.client
    .table("pageSets")
    .where("surveyId", P11_05.__keys__?.id)
    .orderBy("id")
    .select<{ id: number; type: string }[]>(["id", "type"]);
  t.true(query0.length > 2);
  t.true(
    query0.every(q => {
      const pageSet = P11_05.pageSets.find(p => p.__keys__?.id == q.id);
      return q.type == JSON.stringify(pageSet?.type);
    })
  );

  const query1 = await store.client
    .table("pageSetPages")
    .where("surveyId", P11_05.__keys__?.id)
    .whereNotNull("pageId")
    .whereNotNull("pageSetId");
  t.true(query1.length > 5);

  t.end();
});

test("Update page set", async (store, t) => {
  await seed(store);
  await seedTestPageSets(store);

  const pageSet = P11_05.pageSets[0];
  const pageNotInPageSet = P11_05.pages.find(
    p => !pageSet.pages.includes(p)
  ) as Page;
  const updated = pageSet.update({
    type: "updated",
    pages: DomainCollection(pageNotInPageSet, ...pageSet.pages),
  });

  await store.pageSetDriver.save(P11_05, updated, 0);

  const query0 = await store.client
    .table("pageSets")
    .where("id", pageSet.__keys__?.id)
    .select<{ id: number; type: string; position: number }[]>([
      "id",
      "type",
      "position",
    ])
    .first();
  t.equal(query0?.type, '"updated"');
  t.equal(query0?.position, 0);

  const query1 = await store.client
    .table("pageSetPages")
    .where("pageSetId", pageSet.__keys__?.id)
    .whereNotNull("pageId")
    .whereNotNull("pageSetId")
    .orderBy("position")
    .select<{ pageId: number; position: number }[]>(["pageId", "position"]);
  t.equal(query1.length, pageSet.pages.length + 1);
  t.true(
    query1.every(
      q =>
        q.pageId ==
        (q.position == 0 ? pageNotInPageSet : pageSet.pages[q.position - 1])
          .__keys__?.id
    )
  );

  t.end();
});

test("Get pageSet nodes", async (store, t) => {
  await seed(store);
  await seedTestPageSets(store);

  const surveyKey = P11_05.__keys__;
  if (!surveyKey) throw "keys missing";

  const pageSets = P11_05.pageSets;

  const nodes = await store.pageSetStore.getNodes(P11_05.options, surveyKey);
  t.equal(nodes.length, pageSets.length);

  nodes.forEach((n, p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __changes__, ...expected } = pageSetSerialize(
      pageSets[p],
      P11_05.options
    );
    t.deepLooseEqual(n, expected);
  });

  t.end();
});
