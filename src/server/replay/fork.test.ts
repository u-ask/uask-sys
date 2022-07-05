import { startWorker, stopWorker } from "./fork.js";
import test from "tape";
import { Store } from "../../system/store/../store/index.js";
import {
  cleanTestDb,
  seedTestSurvey,
  seedTestPages,
  seedTestPageSets,
  seedTestPageItems,
  seedTestSamples,
  seedTestParticipants,
  seedTestInterviews,
  seedTestIncludes,
  seedTestInterviewItems,
  seedTestRules,
  seedTestWorkflows,
} from "../../system/store/db/test-utils.js";
import {
  ParticipantStoreDriver,
  SampleStoreDriver,
  SurveyStoreDriver,
} from "../../system/store/index.js";
import { ParticipantSummaryDriver } from "../../system/summary/participantsummary.js";

import Knex from "knex";
import { config } from "../../knexclient.js";
const client = Knex(config[process.env.APP_ENV ?? "development"]);
test.onFinish(() => client.destroy());

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
  await seedTestInterviewItems(store);
  await seedTestRules(store);
  await seedTestWorkflows(store);
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
  await Promise.all(participants.map(p => participantSummaryDriver.save(survey, p)));
  await store.client.table("summaries").update({ syncVersion: null });
}

// test("Fork the replay worker #273", async t => {
//   await client.transaction(async tx => {
//     const store = new Store(tx);
//     await seed(store);
//   });
//   startWorker();
//   await new Promise((res, rej) => {
//     const f = async (c = 0) => {
//       const s = await getSynchedCount();
//       if (s > 8) res(s);
//       else if (c > 30000) rej();
//       else setTimeout(f, 300, c + 1);
//     };
//     f();
//   })
//     .then(() => t.pass())
//     .catch(() => t.fail());
//   await stopWorker();
//   t.end();

//   async function getSynchedCount() {
//     const synched = await client
//       .table("summaries")
//       .whereNotNull("summaries.syncVersion");
//     return synched.length;
//   }
// });
