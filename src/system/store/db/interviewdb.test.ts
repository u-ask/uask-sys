/* eslint-disable @typescript-eslint/no-unused-vars */
import test from "./test-runner.js";
import {
  cleanTestDb,
  P11_05,
  P11_05_Participants,
  seedTestInterviewItems,
  seedTestInterviews,
  seedTestPageItems,
  seedTestPages,
  seedTestPageSets,
  seedTestParticipants,
  seedTestSamples,
  seedTestSurvey,
} from "./test-utils.js";
import { Interview, Participant, getTranslation } from "uask-dom";
import { interviewSerialize } from "../../json/interviewjson.js";
import { KeyMap, Keys } from "../../aspect/keys.js";
import { Store } from "./store.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestPageItems(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);
}

test("Save interview", async (store, t) => {
  await seed(store);
  const addInfo = await store.interviewDriver.save(
    P11_05,
    P11_05_Participants[0],
    P11_05_Participants[0].interviews[1],
    0
  );
  t.true(addInfo.__keys__?.id);
  t.end();
});

test("Save all interviews", async (store, t) => {
  await seed(store);
  await seedTestInterviews(store);
  const query = await store.client
    .table("interviews")
    .where("surveyId", P11_05.__keys__?.id)
    .count();
  t.equal(query[0]["count"], "21");
  t.end();
});

test("Update interview", async (store, t) => {
  await seed(store);
  const pat = getParticipant_00002();
  const i = getInterviewTest(pat);

  const addInfo = await store.interviewDriver.save(P11_05, pat, i, 0);
  i.update(addInfo);

  const updated = i.update({ nonce: 12345 });
  await store.interviewDriver.save(P11_05, pat, updated, 0);

  const query1 = await store.client
    .table("interviews")
    .where("id", i.__keys__?.id);
  t.equal(query1[0].nonce, "12345");

  t.end();
});

test("Get interview nodes", async (store, t) => {
  await seed(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);

  const participant = getParticipant_00002();
  if (!participant.__keys__) throw "keys missing";

  const interviews = participant.interviews;

  const nodes = await store.interviewStore.getNodes(
    P11_05.__keys__ as KeyMap,
    participant.__keys__
  );
  t.equal(nodes.length, interviews.length);

  nodes.forEach((n, index) => {
    const { items, ...inode } = n;
    const {
      __changes__,
      items: i,
      ...expected
    } = interviewSerialize(interviews[index]);
    t.true(keysEqual(items, i));
    t.deepLooseEqual(inode, expected);
  });
  t.end();
});

test("Get interview nodes when version has changed", async (store, t) => {
  await seed(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);

  const participant = getParticipant_00002();
  const version = P11_05.__keys__?.version as number;

  await store.client
    .table("pageSets")
    .where("surveyId", version)
    .update({ version: version + 1 });
  const nodes = await store.interviewStore.getNodes(
    P11_05.__keys__ as KeyMap,
    participant.__keys__
  );
  t.equal(nodes.length, participant.interviews.length);

  t.end();
});

test("Delete an interview #299", async (store, t) => {
  await seed(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);

  const participant = getParticipant_00002();
  await store.interviewStore.delete(
    P11_05,
    participant,
    participant.interviews[0]
  );
  const ii = await store.interviewStore.getNodes(
    P11_05.__keys__ as KeyMap,
    participant.__keys__
  );
  t.equal(ii.length, participant.interviews.length - 1);
  t.ok(ii.every(i => i.nonce != participant.interviews[0].nonce));
  t.end();
});

function keysEqual(a: Keys[], b: Keys[]): boolean {
  return a.every((a, x) =>
    Object.entries(a.__keys__ as KeyMap).every(
      ([k, v]) => v == b[x].__keys__?.[k]
    )
  );
}

function getParticipant_00002() {
  return P11_05_Participants.find(
    p => p.participantCode == "000002"
  ) as Participant;
}

function getInterviewTest(pat: Participant) {
  return pat?.interviews.find(
    i => getTranslation(i.pageSet.type, "en") == "Inclusion"
  ) as Interview;
}
