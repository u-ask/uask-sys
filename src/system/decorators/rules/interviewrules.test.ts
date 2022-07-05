import test from "tape";
import sinon, { SinonSpy } from "sinon";
import * as uask from "uask-dom";

import { getTranslation, Interview } from "uask-dom";
import {
  testInterviewItemUpdate,
  testInterviewCreation,
  testInterviewCreateWithItems,
} from "../../../drivers/tests/interviewtests.js";
import { ExampleDrivers } from "../../../drivers/example/index.js";
import { seedExample } from "../../../drivers/example/index.js";
import { InterviewRuleDriver } from "./interviewrules.js";
import { IDrivers } from "../../../drivers/index.js";

test("interview update with rule decorator", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testInterviewItemUpdate(drivers, t);
  t.end();
});

test("interview creation with rule decorator", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testInterviewCreation(drivers, t);
  t.end();
});

test("interview creation with items and rule decorator", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testInterviewCreateWithItems(drivers, t);
  t.end();
});

test("Item values are returned when a rule modifies something", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant0 = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const followup = participant0.interviews.find(
    i => getTranslation(i.pageSet.type) == "Follow Up"
  ) as Interview;
  const weightIx = followup.items.findIndex(
    i => i.pageItem.variableName == "WEIGHT"
  );
  const hightIx = followup.items.findIndex(
    i => i.pageItem.variableName == "HEIGHT"
  );
  const bmiIx = followup.items.findIndex(i => i.pageItem.variableName == "BMI");
  const updated = followup.update({
    items: followup.items.map((i, x) =>
      x == weightIx
        ? i.update({ value: 1 })
        : x == hightIx
        ? i.update({ value: 1 })
        : i
    ),
  });
  const keys = await drivers.interviewDriver.save(survey, participant0, updated);
  t.equal(keys[1].items[weightIx].value, 1);
  t.equal(keys[1].items[hightIx].value, 1);
  t.equal(keys[1].items[bmiIx].value, 1);
  t.end();
});

test("all rules executed on interview update", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant0 = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview0 = participant0.interviews.last as Interview;
  const saveInterview = sinon.spy(
    Reflect.get(drivers.interviewDriver, "driver"),
    "save"
  );
  const executeFn = sinon.spy(
    drivers.interviewDriver,
    "executeRules" as keyof InterviewRuleDriver
  );
  await drivers.interviewDriver.save(survey, participant0, interview0);
  t.equal(saveInterview.callCount, participant0.interviews.length);
  t.true(
    saveInterview
      .getCalls()
      .every(
        (c, i) =>
          typeof c.args[2].nonce == "number" &&
          c.args[2].nonce == participant0.interviews[i].nonce
      )
  );
  t.true(executeFn.called);
  saveInterview.restore();
  executeFn.restore();
  t.end();
});

test("all rules executed on interview delete #319", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant0 = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview0 = participant0.interviews.last as Interview;
  const saveInterview = sinon
    .stub(Reflect.get(drivers.interviewDriver, "driver"), "save")
    .callsFake(() => ({}));
  const executeFn = sinon.spy(
    drivers.interviewDriver,
    "executeRules" as keyof InterviewRuleDriver
  );
  await drivers.interviewDriver.delete(survey, participant0, interview0);
  t.equal(saveInterview.callCount, participant0.interviews.length - 1);
  t.true(
    saveInterview
      .getCalls()
      .every(
        c =>
          typeof c.args[2].nonce == "number" &&
          c.args[2].nonce != interview0.nonce
      )
  );
  t.true(executeFn.called);
  saveInterview.restore();
  executeFn.restore();
  t.end();
});

test("Participant cached when complete", async t => {
  seedExample();
  const drivers = buildDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant0 = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const followupIx = participant0.interviews.findIndex(
    i => getTranslation(i.pageSet.type) == "Follow Up"
  );
  const followup = participant0.interviews[followupIx];
  const weightIx = followup.items.findIndex(
    i => i.pageItem.variableName == "WEIGHT"
  );
  const updated = followup.update({
    items: followup.items.map((i, x) =>
      x == weightIx ? i.update({ value: 1 }) : i
    ),
  });
  cacheSet.resetHistory();
  const info = await drivers.interviewDriver.save(survey, participant0, updated);
  const final = updated.update(info);
  const cached = cacheSet.getCall(0).args[1].interviews[followupIx];
  t.deepLooseEqual(cached, final);
  t.end();
});

const cacheSet = sinon.fake() as SinonSpy<[uask.Survey, uask.Participant], void>;

function buildDrivers(): IDrivers & { interviewDriver: InterviewRuleDriver } {
  const drivers = new ExampleDrivers();
  return {
    ...drivers,
    interviewDriver: new InterviewRuleDriver(
      drivers.interviewDriver,
      drivers.participantDriver,
      {
        set: cacheSet,
      }
    ),
  };
}
