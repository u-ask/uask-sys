import { Test } from "tape";
import { IDrivers } from "../index.js";
import { Participant } from "uask-dom";
import { sameDomain } from "./test-utils.js";

export async function testParticipantGetBySample(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = (await drivers.sampleDriver.getAll(survey))[0];
  const participants = await drivers.participantDriver.getBySample(survey, sample, {
    limit: 20,
  });
  t.equal(participants.length, 10);
}

export async function testParticipantGetAll(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participants = await drivers.participantDriver.getAll(survey, samples, {
    limit: 20,
  });
  t.equal(participants.length, 15);
}

export async function testParticipantGetByPage(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participants = await drivers.participantDriver.getAll(survey, samples, {
    offset: 5,
    limit: 5,
  });
  t.deepEqual(
    participants.map(p => p.participantCode),
    ["000006", "000007", "000008", "000009", "000010"]
  );
}

export async function testParticipantCreate(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "002");
  const participant = new Participant("", sample);
  const keys = await drivers.participantDriver.save(survey, participant);
  t.true(keys.participantCode?.length);
  const dbParticipant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    keys.participantCode as string
  );
  t.true(sameDomain(dbParticipant, participant.update(keys)));
}

export async function testParticipantUpdate(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const updated = participant.update({ sample: samples[1] });
  const keys = await drivers.participantDriver.save(survey, updated);
  t.equal(keys.participantCode, "000001");
  const dbParticipant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  t.deepLooseEqual(dbParticipant.sample, updated.sample);
}

export async function testParticipantGetByCode(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  t.true(participant.interviews.length);
  t.true(participant.currentItems(survey.items).length);
}

export async function testParticipantNotFound(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  await drivers.participantDriver
    .getByParticipantCode(survey, samples, "11111")
    .then(() => t.fail(), t.pass);
}

export async function testParticipantError(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const error = await drivers.participantDriver
    .getByParticipantCode(survey, samples, "11111")
    .catch(err => err);
  const expectedError = [
    {
      message: "unknown participant",
      statusCode: 400,
    },
  ];
  t.deepLooseEqual(error, expectedError);
}

export async function testParticipantDelete(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000009"
  );
  const deleted = participant.update({ __delete__: "test" });
  await drivers.participantDriver.delete(survey, deleted);

  await drivers.participantDriver.getByParticipantCode(survey, samples, "000009").then(
    () => t.fail(),
    e => t.pass(e)
  );
}
