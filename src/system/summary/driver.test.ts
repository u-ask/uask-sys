import { Store } from "../store/../store/index.js";
import test from "../store/db/test-runner.js";
import {
  cleanTestDb,
  seedTestIncludes,
  seedTestInterviewItems,
  seedTestInterviews,
  seedTestPageItems,
  seedTestPages,
  seedTestPageSets,
  seedTestParticipants,
  seedTestSamples,
  seedTestSurvey,
  seedTestWorkflows,
} from "../store/db/test-utils.js";

import {
  testSummaryParticipantInfo,
  testSummaryParticipantPins,
  testSummaryParticipantAlerts,
  testSummaryParticipantKpis,
} from "../../drivers/tests/summarytests.js";
import { IDrivers, IUserDriver } from "../../drivers/index.js";
import {
  SurveyStoreDriver,
  SampleStoreDriver,
  ParticipantStoreDriver,
  InterviewStoreDriver,
} from "../store/index.js";
import { IAuditDriver, IKpiDriver } from "../../drivers/index.js";
import { SummaryDbDriver } from "./driver.js";
import { ParticipantSummaryDriver } from "./participantsummary.js";
import { DocumentStoreDriver } from "../store/documentstore.js";
import { Page } from "uask-dom";
import { exampleParticipants } from "uask-dom/example";

async function seed(store: Store) {
  await store.client.table("audit_participants").del();
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
  await seedTestPageItems(store);
  await seedTestIncludes(store);
  await seedTestWorkflows(store);
  await seedTestSamples(store);
  await seedTestParticipants(store);
  await seedTestInterviews(store);
  await seedTestInterviewItems(store);
  const surveyStoreDriver = new SurveyStoreDriver(store);
  const sampleStoreDriver = new SampleStoreDriver(store);
  const participantStoreDriver = new ParticipantStoreDriver(store);
  const participantSummaryDriver = new ParticipantSummaryDriver(
    participantStoreDriver,
    store.client
  );
  const survey = await surveyStoreDriver.getByName("P11-05");
  const samples = await sampleStoreDriver.getAll(survey);
  const participants = await participantStoreDriver.getAll(survey, samples, {
    limit: Infinity,
  });
  await Promise.all(
    participants.map(p => participantSummaryDriver.save(survey, p))
  );
}

test("Summary DB driver get participant info", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSummaryParticipantInfo(drivers, t);
  t.end();
});

test("Summary DB driver get participant pinned items", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSummaryParticipantPins(drivers, t);
  t.end();
});

test("Summary DB driver get participant kpied items", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSummaryParticipantKpis(drivers, t);
  t.end();
});

test("Summary DB driver get participant alerts", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testSummaryParticipantAlerts(drivers, t);
  t.end();
});

test("Summary DB driver select list", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const summaries = await drivers.summaryDriver.getAll(
    survey,
    undefined,
    [
      "participantCode",
      "sampleCode",
      "currentInterview",
      "interviewCount",
      "pins",
      "kpis",
      "included",
    ]
  );
  t.ok(summaries.every(s => s.alerts == undefined));
  t.end();
});

test("Summary DB driver keeps trac of survey version #273", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const summaries = await store.client
    .table("summaries")
    .where("surveyId", survey.__keys__?.id)
    .select("syncVersion");
  t.ok(summaries.every(s => s.syncVersion == survey.__keys__?.version));
  t.end();
});

test("Get a summary out of sync", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const updated = survey.update({
    pages: survey.pages.append(new Page("")),
    __keys__: { ...survey.__keys__, version: 5 },
  });
  await drivers.surveyDriver.save(updated);
  const driver = new SummaryDbDriver(store.client);
  const outOfSync = await driver.getOutOfSync();
  t.deepEqual(
    {
      ...outOfSync,
      "P11-05": outOfSync["P11-05"].sort(),
    },
    { "P11-05": exampleParticipants.map(p => p.participantCode) }
  );
  t.end();
});

export function buildDrivers(store: Store): IDrivers {
  return {
    surveyDriver: new SurveyStoreDriver(store),
    sampleDriver: new SampleStoreDriver(store),
    participantDriver: new ParticipantStoreDriver(store),
    interviewDriver: new InterviewStoreDriver(store),
    summaryDriver: new SummaryDbDriver(store.client),
    auditDriver: <IAuditDriver>{},
    userDriver: <IUserDriver>{},
    documentDriver: new DocumentStoreDriver(store),
    kpiDriver: <IKpiDriver>{},
  };
}
