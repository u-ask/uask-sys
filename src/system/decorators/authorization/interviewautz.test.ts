import sinon from "sinon";
import { Interview } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../example.js";
import { PartialInterview } from "../../../drivers/interview.js";
import { InterviewAutzDriver } from "./interviewautz.js";

test("Writer can write items when sample not frozen #301", async t => {
  const { autzDriver, survey, participant, interviewSave } = await setupTest(
    "writer_s001"
  );
  const interview = new Interview(survey.pageSets[5], survey.options);
  await autzDriver
    .save(survey, participant, interview)
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(interviewSave.called);
  t.end();
});

test("Writer cannot write items when sample frozen #301", async t => {
  const { autzDriver, survey, participant, interviewSave } = await setupTest(
    "writer_s001"
  );
  const frozen = participant.update({ sample: participant.sample.freeze() });
  const interview = new Interview(survey.pageSets[5], survey.options);
  await autzDriver
    .save(survey, frozen, interview)
    .then(() => t.fail())
    .catch(e => t.equal(e, "sample is frozen"));
  t.false(interviewSave.called);
  t.end();
});

test("Writer cannot delete interview", async t => {
  const { autzDriver, survey, participant, interviewDelete } = await setupTest(
    "writer_s001"
  );
  const interview = participant.interviews[participant.interviews.length - 1];
  await autzDriver
    .delete(survey, participant, interview)
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to delete"));
  t.false(interviewDelete.called);
  t.end();
});

test("Administrator cannot write items", async t => {
  const { autzDriver, survey, participant, interviewSave } = await setupTest(
    "administrator"
  );
  const interview = new Interview(survey.pageSets[5], survey.options);
  await autzDriver
    .save(survey, participant, interview)
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to write items"));
  t.false(interviewSave.called);
  t.end();
});

test("Administrator can delete interview", async t => {
  const { autzDriver, survey, participant, interviewDelete } = await setupTest(
    "administrator"
  );
  const interview = participant.interviews[participant.interviews.length - 1];
  await autzDriver
    .delete(survey, participant, interview)
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(interviewDelete.called);
  t.end();
});

async function setupTest(userId: string) {
  seedExample();
  const drivers = new ExampleDrivers();
  const autzDriver = new InterviewAutzDriver(
    drivers.interviewDriver,
    drivers.userDriver,
    userId
  );
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const stubs = setupStub(drivers);
  return { autzDriver, survey, participant, ...stubs };
}

function setupStub(drivers: ExampleDrivers) {
  const fakeDelete = sinon.fake(() => Promise.resolve());
  const fakeSave = sinon.fake(() =>
    Promise.resolve([{}, { items: [] }] as PartialInterview)
  );
  return {
    interviewSave: sinon
      .stub(drivers.interviewDriver, "save")
      .callsFake(fakeSave),
    interviewDelete: sinon
      .stub(drivers.interviewDriver, "delete")
      .callsFake(fakeDelete),
  };
}
