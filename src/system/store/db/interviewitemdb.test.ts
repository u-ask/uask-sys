import test from "./test-runner.js";
import {
  cleanTestDb,
  P11_05,
  P11_05_Participants,
  seedTestIncludes,
  seedTestInterviewItems,
  seedTestInterviews,
  seedTestPageItems,
  seedTestPages,
  seedTestPageSets,
  seedTestParticipants,
  seedTestSamples,
  seedTestSurvey,
} from "./test-utils.js";
import {
  Interview,
  Participant,
  getTranslation,
  InterviewItem,
  getItem,
  PageItem,
} from "uask-dom";
import { interviewItemSerialize } from "../../json/interviewitemjson.js";
import { KeyMap } from "../../aspect/keys.js";
import { Store } from "./store.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestPageItems(store);
  await seedTestIncludes(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);
  await seedTestInterviews(store);
}

test("Save interviewItem", async (store, t) => {
  await seed(store);
  const addInfo = await store.interviewItemDriver.save(
    P11_05,
    P11_05_Participants[0].interviews[1],
    P11_05_Participants[0].interviews[1].items[2],
    0
  );
  t.true(addInfo.__keys__?.pageItemId);
  t.end();
});

test("Save all interviewItems", async (store, t) => {
  await seed(store);
  await seedTestInterviewItems(store);
  const query = await store.client
    .table("interviewItems")
    .where("surveyId", P11_05.__keys__?.id)
    .count();
  t.true(query[0]["count"] > 50);
  t.end();
});

test("Update interview Item", async (store, t) => {
  await seed(store);
  const pat = getParticipant_00001();
  const int = getInterviewTest(pat);
  const intI = getInterviewItemTest(int);

  const addInfo = await store.interviewItemDriver.save(P11_05, int, intI, 0);
  intI.update(addInfo);

  const updated = intI.update({ value: "updated" });
  await store.interviewItemDriver.save(P11_05, int, updated, 0);

  const query1 = await store.client
    .table("interviewItems")
    .where(intI.__keys__ as KeyMap);
  t.equal(query1[0].value, '"updated"');
  t.end();
});

test("Get interviewItem nodes", async (store, t) => {
  await seed(store);
  await seedTestInterviewItems(store);

  const interview = getParticipant_00001().interviews[2];
  if (!interview.__keys__) throw "keys missing";

  const items = interview.items;

  const nodes = await store.interviewItemStore.getNodes(
    P11_05.__keys__ as KeyMap,
    interview.__keys__
  );
  t.equal(nodes.length, items.length);

  nodes.forEach((n, i) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __changes__, ...expected } = interviewItemSerialize(items[i]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { context, unit, specialValue, ...actual } = n;
    t.deepLooseEqual(JSON.parse(JSON.stringify(actual)), expected);
  });

  t.end();
});

test("Get interview item nodes when version has changed", async (store, t) => {
  await seed(store);
  await seedTestInterviewItems(store);

  const interview = getParticipant_00001().interviews[2];
  const version = P11_05.__keys__?.version as number;

  await store.client
    .table("includes")
    .where("surveyId", version)
    .update({ version: version + 1 });
  await store.client
    .table("pageItems")
    .where("surveyId", version)
    .update({ version: version + 1 });
  const nodes = await store.interviewItemStore.getNodes(
    P11_05.__keys__ as KeyMap,
    interview.__keys__
  );
  t.equal(nodes.length, interview.items.length);

  t.end();
});

test("Do not get items that does not belong to pageset (anymore) #304", async (store, t) => {
  await seed(store);
  await seedTestInterviewItems(store);
  const participant = getParticipant_00001();
  const interview = participant.interviews[2];
  const item = P11_05.items.find(i =>
    interview.pageSet.items.every(t => getItem(t) != i)
  ) as PageItem;
  await store.interviewItemDriver.save(
    P11_05,
    interview,
    new InterviewItem(item, ""),
    interview.items.length
  );
  const nodes = await store.interviewItemDriver.getRowsByInterview(
    P11_05.__keys__ as KeyMap,
    interview.__keys__ as KeyMap
  );
  t.equal(nodes.length, interview.items.length);
  t.ok(nodes.every(n => n.variableName != item.variableName));
  t.end();
});

function getParticipant_00001() {
  return P11_05_Participants.find(p => p.participantCode == "000001") as Participant;
}

function getInterviewTest(pat: Participant) {
  return pat?.interviews.find(
    i => getTranslation(i.pageSet.type, "en") == "Inclusion"
  ) as Interview;
}

function getInterviewItemTest(interview: Interview) {
  return interview.items.find(
    i => i.pageItem.variableName == "COU"
  ) as InterviewItem;
}
