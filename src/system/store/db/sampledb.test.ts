import test from "./test-runner.js";
import { Sample } from "uask-dom";
import {
  P11_05,
  cleanTestDb,
  seedTestSamples,
  seedTestSurvey,
  P11_05_Samples,
} from "./test-utils.js";
import { Store } from "./store.js";
import { KeyMap } from "../../aspect/keys.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
}

test("Save sample", async (store, t) => {
  await seed(store);
  const addInfo = await store.sampleDriver.save(P11_05, P11_05_Samples[0]);
  t.true(addInfo.__keys__?.id);
  t.end();
});

test("Get sample by id", async (store, t) => {
  await seed(store);
  const addInfo = await store.sampleDriver.save(P11_05, P11_05_Samples[0]);
  const sample = await store.sampleDriver.getRowById(addInfo.__keys__ as KeyMap);
  t.equal(sample.sampleCode, "001");
  t.deepEqual(sample.__keys__?.id, addInfo.__keys__?.id);
  t.end();
});

test("Get sample by code", async (store, t) => {
  await seed(store);
  const addInfo = await store.sampleDriver.save(P11_05, P11_05_Samples[0]);
  const sample = await store.sampleDriver.getRowBySampleCode(
    P11_05.__keys__ as KeyMap,
    "001"
  );
  t.equal(sample.sampleCode, "001");
  t.deepEqual(sample.__keys__?.id, addInfo.__keys__?.id);
  t.end();
});

test("Get all samples", async (store, t) => {
  await seed(store);
  await seedTestSamples(store);
  const all = await store.sampleDriver.getAll(P11_05);
  t.equal(all.length, 2);
  t.end();
});

test("Update sample", async (store, t) => {
  await seed(store);
  const s = getSample_002();

  const addInfo = await store.sampleDriver.save(P11_05, s);
  s.update(addInfo);

  const updated = s.update({ sampleCode: "update" });
  await store.sampleDriver.save(P11_05, updated);

  const query1 = await store.client.table("samples").where("id", s.__keys__?.id);
  t.equal(query1[0].sampleCode, "update");
  t.end();
});

test("Get sample nodes by survey", async (store, t) => {
  await seed(store);
  await seedTestSamples(store);

  const surveyKey = P11_05.__keys__;
  if (!surveyKey) throw "keys missing";

  const nodes = await store.getSampleNodes(surveyKey, "survey");
  if (Array.isArray(nodes)) {
    t.equal(nodes.length, P11_05_Samples.length);

    const sampleExpected = getSample_002();
    const nodeSample = nodes.find(sample => sample.sampleCode == sampleExpected.sampleCode);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __changes__, ...expected } = sampleExpected;
    t.deepLooseEqual(nodeSample, expected);
  }

  t.end();
});

test("Sample save error unique constraint", async (store, t) => {
  await seed(store);
  const sample1 = new Sample("112");
  const sample2 = new Sample("112");
  await store.sampleDriver.save(P11_05, sample1);
  const error = await store.sampleDriver.save(P11_05, sample2).catch(err => {
    return err;
  });
  t.equal(error.message, "Failed to register - MUST BE UNIQUE");
  t.end();
});

test("Sample frozen state stored in db #301", async (store, t) => {
  await seed(store);
  const sampleNodes = await store.getSampleNodes(
    P11_05.__keys__ as KeyMap,
    "survey"
  );
  t.true(sampleNodes.every(s => s.frozen === false));
  const frozen = P11_05_Samples.map(s => s.freeze());
  for (const sample of frozen) await store.saveSample(P11_05, sample);
  const frozenNodes = await store.getSampleNodes(
    P11_05.__keys__ as KeyMap,
    "survey"
  );
  t.true(frozenNodes.every(s => s.frozen === true));
  t.end();
});

function getSample_002() {
  return P11_05_Samples.find(s => s.sampleCode == "002") as Sample;
}
