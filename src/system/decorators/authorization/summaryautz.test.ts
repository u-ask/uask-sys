import sinon from "sinon";
import test from "tape";
import { KpiGenericDriver } from "../../../drivers/index.js";
import { seedExample, ExampleDrivers } from "../../../drivers/example/index.js";
import { SummaryAutzDriver } from "./summaryautz.js";

test("Writer can read summaries from sample", async t => {
  const { autzDriver, survey, samples, summariesGet } = await setupTest(
    "writer_s001"
  );
  await autzDriver
    .getParticipantSummaries(survey, samples[0])
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(summariesGet.called);
  t.end();
});

test("Writer can read kpis from sample", async t => {
  const { autzDriver, survey, samples, summariesGet } = await setupTest(
    "writer_s001"
  );
  const kpiAutzDriver = new KpiGenericDriver(
    Reflect.get(autzDriver, "sampleDriver"),
    autzDriver
  );
  await kpiAutzDriver
    .getAll(survey, [samples[0]])
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(summariesGet.called);
  t.end();
});

test("Writer cannot read summaries from sample", async t => {
  const { autzDriver, survey, samples, summariesGet } = await setupTest(
    "writer_s001"
  );
  await autzDriver
    .getParticipantSummaries(survey, samples[1])
    .then(() => t.fail())
    .catch(e => t.equal(e, "not authorized to read participants from sample"));
  t.false(summariesGet.called);
  t.end();
});

test("Writer cannot read kpis from sample", async t => {
  const { autzDriver, survey, samples, summariesGet } = await setupTest(
    "writer_s001"
  );
  const kpiAutzDriver = new KpiGenericDriver(
    Reflect.get(autzDriver, "sampleDriver"),
    autzDriver
  );
  await kpiAutzDriver
    .getAll(survey, [samples[1]])
    .then(() => t.fail())
    .catch(e => t.equal(e, "not authorized to read participants from sample"));
  t.false(summariesGet.called);
  t.end();
});

test("Writer reads filtered summaries", async t => {
  const { autzDriver, survey } = await setupTest("writer_s001");
  const participants = await autzDriver.getParticipantSummaries(
    survey,
    undefined,
    ["participantCode"]
  );
  t.notEqual(participants.length, 15);
  t.true(participants.every(p => typeof p.sampleCode == "undefined"));
  t.end();
});

test("Administrator reads all summaries", async t => {
  const { autzDriver, survey } = await setupTest("administrator");
  const participants = await autzDriver.getParticipantSummaries(
    survey,
    undefined
  );
  t.equal(participants.length, 15);
  t.true(participants.every(p => typeof p.sampleCode == "string"));
  t.end();
});

async function setupTest(userId: string) {
  seedExample();
  const drivers = new ExampleDrivers();
  const autzDriver = new SummaryAutzDriver(
    drivers.summaryDriver,
    drivers.sampleDriver,
    drivers.userDriver,
    userId
  );
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const stubs = setupStub(drivers);
  return { autzDriver, survey, samples, ...stubs };
}

function setupStub(drivers: ExampleDrivers) {
  return {
    summariesGet: sinon.spy(drivers.summaryDriver, "getParticipantSummaries"),
  };
}
