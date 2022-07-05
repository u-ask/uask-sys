import sinon from "sinon";

import test from "tape";
import { Replay, UserSystemDriver } from "./replay.js";
import { ExampleDrivers } from "../../drivers/example/index.js";

class ReplayTestDrivers extends ExampleDrivers {
  readonly userDriver = new UserSystemDriver();
}

test("Replay should save interview with rules", async t => {
  const drivers = new ReplayTestDrivers();
  const execute = sinon.spy(Replay, "replayRules");
  const saveParticipant = sinon.stub(drivers.participantDriver, "save");
  const saveInterview = sinon.stub(drivers.interviewDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const doReplay = await Replay.replay(drivers, survey);
  const sofar = (await doReplay.next()).value?.interviews.sofar;
  execute.restore();
  t.equal(saveInterview.callCount, sofar);
  t.equal(execute.callCount, 1);
  t.equal(saveParticipant.callCount, 0);
  t.end();
});

test("Replay should save participant summaries #119", async t => {
  const drivers = new ReplayTestDrivers();
  const execute = sinon.spy(Replay, "replayRules");
  const saveParticipant = sinon.stub(drivers.participantDriver, "save");
  const saveInterview = sinon.stub(drivers.interviewDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const replayOptions = { rules: false, summaries: true };
  const doReplay = await Replay.replay(drivers, survey, replayOptions);
  const sofar = (await doReplay.next()).value?.participants.sofar;
  execute.restore();
  t.equal(saveParticipant.callCount, sofar);
  t.equal(execute.callCount, 0);
  t.equal(saveInterview.callCount, 0);
  t.end();
});

test("Replay given participant only #273", async t => {
  const drivers = new ReplayTestDrivers();
  const saveParticipant = sinon.stub(drivers.participantDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "002");
  const participants = await drivers.participantDriver.getAll(survey, [sample]);
  const replayOptions = { rules: true, summaries: true };
  const doReplay = await Replay.replay(drivers, survey, participants, replayOptions);
  await doReplay.next();
  t.true(saveParticipant.calledWith(survey, participants[0]));
  t.end();
});
