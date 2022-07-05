/* eslint-disable @typescript-eslint/no-unused-vars */
import test from "./test-runner.js";
import {
  cleanTestDb,
  seedTestSurvey,
  P11_05,
  P11_05_Samples,
  P11_05_Participants,
  seedTestSamples,
  seedTestParticipants,
  seedTestInterviews,
  seedTestPageSets,
  seedTestPages,
  seedTestInterviewItems,
  seedTestPageItems,
} from "./test-utils.js";
import { DNode, Participant } from "uask-dom";
import { Store } from "./store.js";
import { participantSerialize } from "../../json/participantjson.js";
import { KeyMap } from "../../aspect/keys.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestSamples(store);
}

test("Save participant", async (store, t) => {
  await seed(store);
  const addInfo = await store.participantDriver.save(
    P11_05,
    P11_05_Participants.find(p => p.participantCode == "000001") as Participant
  );
  t.true(addInfo.__keys__?.id);
  t.end();
});

test("Save all participants", async (store, t) => {
  await seed(store);
  await seedTestParticipants(store);
  const query0 = await store.client
    .table("participants")
    .where("surveyId", P11_05.__keys__?.id)
    .count();
  t.equal(query0[0]["count"], String(P11_05_Participants.length));
  const query1 = await store.client
    .table("participants")
    .where("participantCode", "000003");
  t.equal(query1[0].participantCode, "000003");
  t.equal(query1[0].sampleId, P11_05_Samples[0].__keys__?.id);
  t.end();
});

test("Update participant", async (store, t) => {
  await seed(store);
  const participant = P11_05_Participants.find(
    p => p.participantCode == "000014"
  ) as Participant;

  const addInfo = await store.participantDriver.save(P11_05, participant);
  participant.update(addInfo);

  const updated = participant.update({ participantCode: "99999" });
  await store.participantDriver.save(P11_05, updated);

  const query1 = await store.client
    .table("participants")
    .where("id", participant.__keys__?.id);
  t.equal(query1[0].participantCode, "99999");
  t.end();
});

test("Get all participants for survey", async (store, t) => {
  await seed(store);
  await seedTestParticipants(store);
  const surveyKey = P11_05.__keys__ as KeyMap;
  const participants = P11_05_Participants;
  const nodes = await store.getParticipantNodes("survey", surveyKey, undefined, {
    limit: Infinity,
  });
  t.equal(nodes.length, participants.length);
  t.end();
});

test("Get participants for survey should have limit", async (store, t) => {
  await seed(store);
  await seedTestParticipants(store);
  const surveyKey = P11_05.__keys__ as KeyMap;
  const participants = P11_05_Participants;
  const nodes = await store.getParticipantNodes("survey", surveyKey, undefined, {
    offset: 5,
    limit: 5,
  });
  t.equal(nodes.length, 5);
  t.end();
});

test("Get participant nodes by survey key", async (store, t) => {
  await seed(store);
  await seedTestParticipants(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestInterviews(store);
  await seedTestPageItems(store);
  await seedTestInterviewItems(store);

  const surveyKey = P11_05.__keys__ as KeyMap;

  const participants = P11_05_Participants;

  const nodes = await store.getParticipantNodes("survey", surveyKey, undefined, {
    limit: Infinity,
  });

  const participantExpected = participants.find(
    p => p.interviews.length > 1
  ) as Participant;

  const nodeParticipant = nodes.find(
    participant => participant.participantCode == participantExpected.participantCode
  ) as DNode<Participant>;

  const { interviews, sample, ...pnode } = nodeParticipant;

  const {
    __changes__,
    interviews: i,
    sample: s,
    ...expected
  } = participantSerialize(participantExpected);
  t.true(i);
  t.true(s);
  t.deepLooseEqual(pnode, expected);
  t.end();
});

test("Get participant rows by sample key", async (store, t) => {
  await seed(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);

  const sample = P11_05_Samples[1];
  const sampleKey = sample.__keys__;

  const all =
    sampleKey != undefined
      ? await store.participantDriver.getRowsBySample(
          P11_05.__keys__ as KeyMap,
          sampleKey
        )
      : undefined;

  const participants = P11_05_Participants.filter(
    p => p.sample.sampleCode == sample.sampleCode
  );

  t.equal(all?.length, participants.length);

  t.end();
});

test("Participant rows has #299", async (store, t) => {
  await seed(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);

  const surveyKeys = P11_05.__keys__ as KeyMap;

  const rows = await store.participantDriver.getRowBySurvey(surveyKeys);
  t.true(rows.every(r => r.__deleted__ === false));

  t.end();
});

test("Delete participant row #299", async (store, t) => {
  await seed(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);

  const participant = P11_05_Participants[5];
  const surveyKeys = P11_05.__keys__ as KeyMap;
  const participantKeys = participant.__keys__ as KeyMap;

  await store.participantDriver.delete(surveyKeys, participantKeys);

  const row = await store.participantDriver.getRowByCode(
    surveyKeys,
    participant.participantCode,
    { deleted: true }
  );
  t.deepEqual(row.__deleted__, true);

  t.end();
});
