import test from "../store/db/test-runner.js";
import { Store } from "../store/../store/index.js";
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
} from "../store/db/test-utils.js";
import { ParticipantStoreDriver } from "../store/participantstore.js";
import { ParticipantAuditDriver } from "./participantaudit.js";
import { Participant } from "uask-dom";
import { KeyMap } from "../aspect/keys.js";

async function seed(store: Store) {
  await store.client.table("audit_participants").del();
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestPageItems(store);
  await seedTestIncludes(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);
}

test("Store participant change payload #122", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const participant = P11_05_Participants[0].update({
    phone: "0101010101",
  } as Partial<Participant>);
  const keys = await auditDriver.save(P11_05, participant);
  t.equal(keys.__keys__?.id, participant.__keys__?.id);
  const records = await getRecords(store, keys);
  t.equal(records.length, 1);
  t.end();
});

test("Store participant create payload #122", async (store, t) => {
  await seed(store);
  const auditDriver = buildAuditDriver(store);
  const sample = (await store.sampleDriver.getAll(P11_05))[0];
  const participant = new Participant("000016", sample, {
    phone: "0101010101",
  } as Partial<Participant>);
  const keys = await auditDriver.save(P11_05, participant);
  const records = await getRecords(store, keys);
  t.equal(records.length, 1);
  t.end();
});

test("Deleting an participant needs a justification #299", async (store, t) => {
  await seed(store);
  const participant = P11_05_Participants[0];
  const auditDriver = buildAuditDriver(store);
  await auditDriver
    .delete(P11_05, participant)
    .then(() => t.fail())
    .catch(() => t.pass());
  t.end();
});

test("Deleting a participant generates an audit record #299", async (store, t) => {
  await seed(store);
  const participant = P11_05_Participants[0];
  const auditDriver = buildAuditDriver(store);
  const deleted = participant.update({ __delete__: "test" });
  await auditDriver.delete(P11_05, deleted);
  await store.participantStore
    .getNodes("participantCode", P11_05.__keys__ as KeyMap, participant.participantCode, {})
    .then(() => t.fail())
    .catch(() => t.pass());
  const record = await store.client
    .table("audit_participants")
    .where("surveyId", P11_05.__keys__?.id)
    .where("participantId", participant.__keys__?.id)
    .where("operation", '"delete"');
  t.equal(record.length, 1);
  t.equal(JSON.parse(record[0].payload).__delete__, "test");
  t.end();
});

async function getRecords(store: Store, keys: Partial<Participant>) {
  return await store.client.table("audit_participants").where({
    surveyId: P11_05.__keys__?.id,
    participantId: keys.__keys__?.id,
  });
}

function buildAuditDriver(store: Store) {
  const storeDriver = new ParticipantStoreDriver(store);
  return new ParticipantAuditDriver(storeDriver, store.client, "me");
}
