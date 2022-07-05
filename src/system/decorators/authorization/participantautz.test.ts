import sinon from "sinon";
import { Participant } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { ParticipantAutzDriver } from "./participantautz.js";

test("Writer cannot delete participant", async t => {
  const { autzDriver, survey, participant, participantDelete } =
    await setupTest("writer_s001");
  await autzDriver
    .delete(survey, participant)
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to delete"));
  t.false(participantDelete.called);
  t.end();
});

test("Administrator can delete participant", async t => {
  const { autzDriver, survey, participant, participantDelete } =
    await setupTest("administrator");
  await autzDriver
    .delete(survey, participant)
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(participantDelete.called);
  t.end();
});

test("Writer can read from sample", async t => {
  const { autzDriver, survey, samples, participantBySample } = await setupTest(
    "writer_s001"
  );
  await autzDriver
    .getBySample(survey, samples[0])
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(participantBySample.called);
  t.end();
});

test("Writer cannot read from sample", async t => {
  const { autzDriver, survey, samples, participantBySample } = await setupTest(
    "writer_s001"
  );
  await autzDriver
    .getBySample(survey, samples[1])
    .then(() => t.fail())
    .catch(e => t.equal(e, "not authorized to read participants from sample"));
  t.false(participantBySample.called);
  t.end();
});

test("Writer cannot read participant from sample", async t => {
  const { autzDriver, survey, samples, participant, participantBySample } =
    await setupTest("writer_s002");
  await autzDriver
    .getByParticipantCode(survey, samples, participant.participantCode)
    .then(() => t.fail())
    .catch(e => t.equal(e, "not authorized to read participants from sample"));
  t.false(participantBySample.called);
  t.end();
});

test("Writer reads filtered data", async t => {
  const { autzDriver, survey, samples } = await setupTest("writer_s001");
  const participants = await autzDriver.getAll(survey, samples);
  t.true(participants.every(p => p.sample.sampleCode == "001"));
  t.end();
});

test("Writer can read all participants", async t => {
  const { autzDriver, survey, samples } = await setupTest("administrator");
  const participants = await autzDriver.getAll(survey, samples);
  t.equal(participants.length, 15);
  t.end();
});

test("Participant can read its own code", async t => {
  const { autzDriver, survey, samples, participantByCode } = await setupTest(
    "writer_p000003"
  );
  await autzDriver
    .getByParticipantCode(survey, samples, "000003")
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(participantByCode.called);
  t.end();
});

test("Participant cannot read from another code", async t => {
  const { autzDriver, survey, samples, participantByCode } = await setupTest(
    "writer_p000003"
  );
  await autzDriver
    .getByParticipantCode(survey, samples, "000001")
    .then(() => t.fail())
    .catch(e => t.equal(e, "not authorized to read participant"));
  t.false(participantByCode.called);
  t.end();
});

test("Participant reads filtered data", async t => {
  const { autzDriver, survey, samples } = await setupTest("writer_p000003");
  const participants = await autzDriver.getBySample(survey, samples[0]);
  t.deepEqual(
    participants.map(p => p.participantCode),
    ["000003"]
  );
  t.end();
});

async function setupTest(userId: string) {
  seedExample();
  const drivers = new ExampleDrivers();
  const autzDriver = new ParticipantAutzDriver(
    drivers.participantDriver,
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
  return { autzDriver, survey, participant, samples, ...stubs };
}

function setupStub(drivers: ExampleDrivers) {
  const fakeDelete = sinon.fake(() => Promise.resolve());
  const fake = sinon.fake(() =>
    Promise.resolve({} as Partial<Participant> & { participantCode: string })
  );
  return {
    participantSave: sinon
      .stub(drivers.participantDriver, "save")
      .callsFake(fake),
    participantDelete: sinon
      .stub(drivers.participantDriver, "delete")
      .callsFake(fakeDelete),
    participantByCode: sinon.spy(
      drivers.participantDriver,
      "getByParticipantCode"
    ),
    participantBySample: sinon.spy(drivers.participantDriver, "getBySample"),
    participantAll: sinon.spy(drivers.participantDriver, "getAll"),
  };
}
