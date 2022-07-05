import { InterviewAuditDriver } from "./interviewaudit.js";
import { Store } from "../store/../store/index.js";
import test from "../store/db/test-runner.js";
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
} from "../store/db/test-utils.js";
import {
  DomainCollection,
  getItem,
  getTranslation,
  Interview,
  InterviewItem,
  ItemTypes,
  PageItem,
} from "uask-dom";
import { makeChangeRecord } from "./payload.js";
import { InterviewStoreDriver } from "../store/interviewstore.js";
import { hasChanges, Keys } from "../aspect/index.js";
import { KeyMap } from "../aspect/keys.js";

async function seed(store: Store) {
  await store.client.table("audit_participants").del();
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestPageItems(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);
}

test("Store interview change payload #121", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[2];
  const item0 = interview.items[0].update({ value: new Date(2021, 3, 4) });
  const item1 = interview.items[1].update({ value: "FRA" });
  const items = interview.items.map((i, x) =>
    x == 0 ? item0 : x == 1 ? item1 : i
  );
  const updated = interview.update({ items });
  const keys = await auditDriver.save(P11_05, participant, updated);
  t.equal(keys[0].__keys__?.id, interview.__keys__?.id);
  const result = await getRecords(store, participant, interview);
  const itemRecords = result
    .filter(r => r.operation == "update")
    .sort(r1 => (r1.pageItemId == item0.pageItem.__keys__?.id ? -1 : 1));
  t.deepEqual(itemRecords.length, 2);
  t.deepLooseEqual(
    itemRecords.map(r => [r.participantId, r.interviewId, r.pageItemId]),
    updated.items
      .filter(i => hasChanges(i))
      .map(i => [
        participant.__keys__?.id,
        interview.__keys__?.id,
        i.__keys__?.pageItemId,
      ])
  );
  t.deepLooseEqual(
    itemRecords.map(r => JSON.parse(r.payload)),
    updated.items
      .filter(i => hasChanges(i))
      .map(i => makeChangeRecord(i).payload)
  );
  t.end();
});

test("Store interview change payload with instance #180", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[2];
  const item0 = interview.items[0].update({
    value: new Date(2021, 3, 4),
    pageItem: new PageItem("Instance", "INST", ItemTypes.date(), {
      array: true,
      instance: 2,
      __keys__: interview.items[0].pageItem.__keys__,
    }),
  });
  const item1 = interview.items[1].update({ value: "FRA" });
  const items = interview.items.map((i, x) =>
    x == 0 ? item0 : x == 1 ? item1 : i
  );
  const updated = interview.update({ items });
  const keys = await auditDriver.save(P11_05, participant, updated);
  t.equal(keys[0].__keys__?.id, interview.__keys__?.id);
  const result = await getRecords(store, participant, interview);
  const itemRecords = result.filter(r => r.nonce || r.pageItemId);
  t.equal(
    itemRecords[0].instance,
    itemRecords[0].pageItemId == interview.items[1].__keys__?.pageItemId ? 1 : 2
  );
  t.equal(
    itemRecords[1].instance,
    itemRecords[1].pageItemId == interview.items[1].__keys__?.pageItemId ? 1 : 2
  );
  t.end();
});

test("Store interview create payload #121", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const participant = P11_05_Participants[0];
  const pageSet = participant.interviews[2].pageSet;
  const item0 = new InterviewItem(
    pageSet.pages[0].items[1],
    new Date(2021, 3, 4)
  );
  const item1 = new InterviewItem(pageSet.pages[0].items[2], "FRA");
  const interview = new Interview(
    pageSet,
    {},
    {
      items: DomainCollection(item0, item1),
    }
  );
  const keys = await auditDriver.save(P11_05, participant, interview);
  const records = await getRecords(store, participant, keys[0]);
  const itemRecords = records.filter(r => r.operation == "create");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, ...interviewWithoutOptions } = interview;
  t.deepEqual(itemRecords.length, 3);
  t.deepEqual(
    itemRecords.map(r => r.userId),
    ["me", "me", "me"]
  );
  t.deepLooseEqual(
    itemRecords.map(r => [r.participantId, r.interviewId, r.pageItemId]),
    [null, ...keys[1].items].map(i => [
      participant.__keys__?.id,
      keys[0].__keys__?.id,
      i?.__keys__?.pageItemId,
    ])
  );
  t.deepLooseEqual(
    itemRecords.map(r => JSON.parse(r.payload)),
    [interviewWithoutOptions as Interview, ...interview.items].map(
      i => makeChangeRecord<Interview | InterviewItem>(i).payload
    )
  );
  t.end();
});

test("Audit record for message acknowledgement #132#121", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[2];
  const pageItem = getItem(interview.pageSet.pages[0].items[1]);
  const interviewItem = interview.items.find(
    i => i.pageItem == pageItem
  ) as InterviewItem;
  const interviewItem0 = interviewItem
    .update({
      value: undefined,
      messages: { required: "value is required" },
    })
    .acknowledge("required");
  const interview0 = interview.update({
    items: interview.items.update(i =>
      i == interviewItem ? interviewItem0 : i
    ),
  });
  await auditDriver.save(P11_05, participant, interview0);
  const records = await getRecords(store, participant, interview);
  t.ok(
    records.some(r => {
      return getTranslation(r.operation) == "acknowledge (value is required)";
    })
  );
  t.end();
});

test("Audit record for message reiteration #132#121", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[2];
  const pageItem = getItem(interview.pageSet.pages[0].items[1]);
  const interviewItem = interview.items.find(
    i => i.pageItem == pageItem
  ) as InterviewItem;
  const interviewItem0 = interviewItem
    .update({
      value: undefined,
      messages: { required: "value is required" },
    })
    .acknowledge("required")
    .update({ __untrack__: true })
    .reiterate("required");
  const interview0 = interview.update({
    items: interview.items.update(i =>
      i == interviewItem ? interviewItem0 : i
    ),
  });
  await auditDriver.save(P11_05, participant, interview0);
  const records = await getRecords(store, participant, interview);
  t.ok(
    records.some(r => {
      return getTranslation(r.operation) == "reiterate (value is required)";
    })
  );
  t.end();
});

test("Deleting an interview needs a justification #299", async (store, t) => {
  await seed(store);
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[2];
  const auditDriver = buildAuditDriver(store);
  await auditDriver
    .delete(P11_05, participant, interview)
    .then(() => t.fail())
    .catch(() => t.pass());
  t.end();
});

test("Deleting an interview generates an audit record #299", async (store, t) => {
  await seed(store);
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[2];
  const auditDriver = buildAuditDriver(store);
  const deleted = interview.update({ __delete__: "test" });
  await auditDriver.delete(P11_05, participant, deleted);
  const [pnode] = await store.participantStore.getNodes(
    "participantCode",
    P11_05.__keys__ as KeyMap,
    participant.participantCode,
    {}
  );
  t.true(pnode.interviews.every(i => i.nonce != interview.nonce));
  const record = await store.client
    .table("audit_participants")
    .where("surveyId", P11_05.__keys__?.id)
    .where("participantId", participant.__keys__?.id)
    .where("operation", '"delete"');
  t.equal(record.length, 1);

  t.equal(JSON.parse(record[0].payload).__delete__, "test");
  t.end();
});

test("Change to undefined value must be captured #351", async (store, t) => {
  await seed(store);
  t.end();
});

function getRecords(store: Store, participant: Keys, interview: Keys) {
  return store.client
    .table("audit_participants")
    .where({
      surveyId: P11_05.__keys__?.id,
      participantId: participant.__keys__?.id,
      interviewId: interview.__keys__?.id,
    })
    .orderByRaw('"pageItemId" NULLS FIRST, payload DESC')
    .then(rows =>
      rows.map(r => ({
        ...r,
        operation: JSON.parse(r.operation),
      }))
    );
}

function buildAuditDriver(store: Store) {
  const storeDriver = new InterviewStoreDriver(store);
  return new InterviewAuditDriver(storeDriver, store.client, "me");
}
