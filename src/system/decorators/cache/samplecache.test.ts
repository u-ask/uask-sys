import sinon from "sinon";
import { Sample } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import {
  testSampleGetAll,
  testSampleGetByCode,
  testSampleNotFound,
  testSampleSave,
} from "../../../drivers/tests/sampletests.js";
import { SampleCacheDriver } from "./samplecache.js";

test("All samples are fetched from underlying driver", async t => {
  seedExample();
  const sandbox = sinon.createSandbox();
  const {
    drivers,
    cacheDrivers: { sampleDriver },
  } = buildDrivers();
  const getAll = sinon.spy(drivers.sampleDriver, "getAll");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = await sampleDriver.getBySampleCode(survey, "001");
  t.equal(sample.sampleCode, "001");
  await sampleDriver.getBySampleCode(survey, "001");
  t.true(getAll.calledOnce);
  sandbox.restore();
  t.end();
});

test("Sample saving empties cache", async t => {
  seedExample();
  const sandbox = sinon.createSandbox();
  const {
    drivers,
    cacheDrivers: { sampleDriver },
  } = buildDrivers();
  const getAll = sinon.spy(drivers.sampleDriver, "getAll");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const sample = new Sample("003");
  await sampleDriver.save(survey, sample);
  await sampleDriver.getBySampleCode(survey, "001");
  await sampleDriver.save(survey, sample);
  const samples = await sampleDriver.getAll(survey);
  t.equal(samples.length, 3);
  t.true(getAll.calledTwice);
  sandbox.restore();
  t.end();
});

test("Sample cache driver - get all", async t => {
  seedExample();
  const { drivers, cacheDrivers } = buildDrivers();
  await testSampleGetAll({ ...drivers, ...cacheDrivers }, t);
  t.end();
});

test("Sample cache driver - get by sampleCode", async t => {
  seedExample();
  const { drivers, cacheDrivers } = buildDrivers();
  await testSampleGetByCode({ ...drivers, ...cacheDrivers }, t);
  t.end();
});

test("Sample cache driver - sample save", async t => {
  seedExample();
  const { drivers, cacheDrivers } = buildDrivers();
  await testSampleSave({ ...drivers, ...cacheDrivers }, t);
  t.end();
});

test("Sample cache driver - Sample unknown", async t => {
  seedExample();
  const { drivers, cacheDrivers } = buildDrivers();
  await testSampleNotFound({ ...drivers, ...cacheDrivers }, t);
  t.end();
});

function buildDrivers() {
  SampleCacheDriver._init();
  const drivers = new ExampleDrivers();
  const sampleDriver = new SampleCacheDriver(drivers.sampleDriver);
  return { drivers, cacheDrivers: { sampleDriver } };
}
