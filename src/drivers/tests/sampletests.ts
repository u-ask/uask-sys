import { Sample } from "uask-dom";
import { Test } from "tape";
import { IDrivers } from "../index.js";

export async function testSampleGetByCode(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "001");
  t.equal(sample.sampleCode, "001");
}

export async function testSampleGetAll(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  t.deepEqual(samples.length, 2);
}

export async function testSampleSave(drivers: IDrivers, t: Test): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = new Sample("Test", {
    name: "TestSample",
    address: "15 Rue du Test",
  });
  const keys = await drivers.sampleDriver.save(survey, sample);
  const s = await drivers.sampleDriver.getBySampleCode(survey, "Test");
  t.deepLooseEqual(s, { ...sample.update(keys), __changes__: {} });
}

export async function testSampleNotFound(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.sampleDriver
    .getBySampleCode(survey, "111")
    .then(() => t.fail(), t.pass);
}

export async function testSampleError(drivers: IDrivers, t: Test): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const error = await drivers.sampleDriver
    .getBySampleCode(survey, "222")
    .catch(err => err);
  const expectedError = [
    {
      message: "unknown sample",
      statusCode: 400,
    },
  ];
  t.deepLooseEqual(error, expectedError);
}

export async function testSampleFrozen(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = await drivers.sampleDriver.getBySampleCode(survey, "001");
  await drivers.sampleDriver.save(survey, sample.freeze());
  const frozen = await drivers.sampleDriver.getBySampleCode(survey, "001");
  await drivers.sampleDriver.save(survey, sample);
  t.true(frozen.frozen);
}
