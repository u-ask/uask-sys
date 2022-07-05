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
import { ParticipantSummaryDriver } from "./participantsummary.js";
import { Participant } from "uask-dom";

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

test("Save summary to database", async (store, t) => {
  await seed(store);
  const summaryDriver = buildSummaryDriver(store);
  const participant = P11_05_Participants[0].update({
    phone: "0101010101",
  } as Partial<Participant>);
  const keys = await summaryDriver.save(P11_05, participant);
  t.equal(keys.__keys__?.id, participant.__keys__?.id);
  const summary = await store.client
    .table("summaries")
    .where("participantId", participant.__keys__?.id)
    .first();
  t.equal(summary.participantCode, participant.participantCode);
  t.deepEqual(
    summary.inclusionDate,
    new Date((participant.inclusionDate as Date).toDateString())
  );
  t.equal(
    summary.completedInterviewCount,
    participant.interviews.filter(i => i.status == "fulfilled").length
  );
  t.equal(JSON.parse(summary.alerts).length, participant.alerts.length);
  t.end();
});

test("Delete summary from database &319", async (store, t) => {
  await seed(store);
  const summaryDriver = buildSummaryDriver(store);
  const participant = P11_05_Participants[0];
  await summaryDriver.delete(P11_05, participant);
  const summaries = await store.client
    .table("summaries")
    .where("surveyId", P11_05.__keys__?.id)
    .select("participantCode");
  t.true(
    summaries.every(s => s.participantCode != participant.participantCode)
  );
  t.end();
});

function buildSummaryDriver(store: Store) {
  const storeDriver = new ParticipantStoreDriver(store);
  return new ParticipantSummaryDriver(storeDriver, store.client);
}
