import test from "./test-runner.js";
import {
  cleanTestDb,
  seedTestSurvey,
  P11_05,
  seedTestPageItems,
} from "./test-utils.js";
import { upsert } from "./upsert.js";
import { Store } from "./store.js";
import { Sample } from "uask-dom";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPageItems(store);
}

test("Update page items", async (store, t) => {
  await seed(store);

  const comment = String(Math.random());
  const query0 = await store.client
    .table("pageItems")
    .where("surveyId", P11_05.__keys__?.id)
    .where("comment", comment);
  t.equal(query0.length, 0);

  const updated = P11_05.items.map(i => i.update({ comment: comment }));
  const results = await Promise.all(
    updated.map(i => {
      const row = {
        variableName: i.variableName,
        comment,
        id: i.__keys__?.id,
      };
      const table = store.client.table<{ comment: string }>("pageItems");
      return upsert({ table }, row).then(r => ({
        k: i.__keys__?.id,
        ...r,
      }));
    })
  );

  t.true(results.every(r => r.k == r.__keys__?.id && r.__untrack__));

  const query1 = await store.client
    .table("pageItems")
    .where("surveyId", P11_05.__keys__?.id)
    .where("comment", comment);
  t.equal(query1.length, results.length);
  t.end();
});

test("Create 2 identical samples error", async (store, t) => {
  await seed(store);

  const surveyId = await store.client
    .table("surveys")
    .where({ name: "P11-05" })
    .select("id")
    .then(r => r[0]);

  const sample1 = new Sample("112");
  const sample2 = new Sample("112");

  const table = store.client.table("samples");
  const row1 = {
    surveyId: surveyId.id,
    sampleCode: sample1.sampleCode,
    name: sample1.name,
    address: sample1.address,
  };

  await upsert({ table }, row1);

  const row2 = {
    surveyId: surveyId.id,
    sampleCode: sample2.sampleCode,
    name: sample2.name,
    address: sample2.address,
  };
  const upsert2 = await upsert({ table }, row2).catch(err => err);

  t.equal(upsert2.message, "Failed to register - MUST BE UNIQUE");
  t.end();
});
