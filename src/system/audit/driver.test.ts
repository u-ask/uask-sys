import { AuditExampleDriver } from "../../drivers/example/autitex.js";
import test from "../store/db/test-runner.js";
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
import { AuditDbDriver } from "./driver.js";
import {
  testInterviewCodeAudit,
  testInterviewItemCodeAudit,
  testParticipantCodeAudit,
  testParticipantInterviewsAudit,
} from "../../drivers/tests/audittests.js";
import {
  IDocumentDriver,
  IDrivers,
  IKpiDriver,
  ISummaryDriver,
  IUserDriver,
} from "../../drivers/index.js";
import { SurveyStoreDriver } from "../store/surveystore.js";
import { SampleStoreDriver } from "../store/samplestore.js";
import { ParticipantStoreDriver } from "../store/participantstore.js";
import { InterviewStoreDriver } from "../store/interviewstore.js";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { Store } from "../store/index.js";

export function buildDrivers(store: Store): IDrivers {
  return {
    surveyDriver: new SurveyStoreDriver(store),
    sampleDriver: new SampleStoreDriver(store),
    participantDriver: new ParticipantStoreDriver(store),
    interviewDriver: new InterviewStoreDriver(store),
    summaryDriver: <ISummaryDriver>{},
    auditDriver: new AuditDbDriver(store.client),
    userDriver: <IUserDriver>{},
    documentDriver: <IDocumentDriver>{},
    kpiDriver: <IKpiDriver>{},
  };
}

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
  const driver = new AuditExampleDriver(new ExampleDrivers());
  await Promise.all(
    P11_05_Participants.map(participant =>
      driver.get(P11_05, { participantCode: participant.participantCode }).then(records =>
        Promise.all(
          records.map(r => {
            const interview = participant.interviews.find(
              i => i.nonce == r.target.nonce
            );
            const interviewItem = interview?.items.find(
              i => i.pageItem.variableName == r.target.variableName
            );
            return store.client.table("audit_participants").insert({
              surveyId: P11_05.__keys__?.id,
              participantId: participant.__keys__?.id,
              interviewId: interview?.__keys__?.id,
              pageItemId: interviewItem?.__keys__?.pageItemId,
              instance: interviewItem?.pageItem?.instance,
              payload: JSON.stringify(r.changes),
              operation: JSON.stringify(r.operation),
              date: r.date,
              userId: r.user,
            });
          })
        )
      )
    )
  );
}

test("Store get audit record from interview item #123", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testInterviewItemCodeAudit(drivers, t);
  t.end();
});

test("Store get audit record from interview #123", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testInterviewCodeAudit(drivers, t);
  t.end();
});

test("Store get audit record from participant #124", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantCodeAudit(drivers, t);
  t.end();
});

test("Get create records for interviews #329", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testParticipantInterviewsAudit(drivers, t);
  t.end();
});
