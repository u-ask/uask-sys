import { ClientDrivers } from "./driver.js";
import test from "./test-runner.js";
import {
  testSampleError,
  testSampleFrozen,
  testSampleGetAll,
  testSampleGetByCode,
  testSampleSave,
} from "../drivers/tests/sampletests.js";
import { seedExample } from "../drivers/example/index.js";
import { SampleCacheDriver } from "../system/client.js";

test("Sample graphql client get all", async (client, t) => {
  SampleCacheDriver._init();
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSampleGetAll(drivers, t);
  t.end();
});

test("Sample graphql client get by sample code", async (client, t) => {
  SampleCacheDriver._init();
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSampleGetByCode(drivers, t);
  t.end();
});

test("Sample graphql client save", async (client, t) => {
  SampleCacheDriver._init();
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSampleSave(drivers, t);
  t.end();
});

test("Sample error", async (client, t) => {
  SampleCacheDriver._init();
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSampleError(drivers, t);
  t.end();
});

test("Store driver - frozen sample #301", async (client, t) => {
  SampleCacheDriver._init();
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSampleFrozen(drivers, t);
  t.end();
});
