import test from "./test-runner.js";
import { ClientDrivers } from "./driver.js";
import { seedExample } from "../drivers/example/index.js";
import {
  testDocumentGetAll,
  testDocumentGetByHash,
  testDocumentSave,
  testDocumentUpdate,
} from "../drivers/tests/documenttests.js";

test("Document get with rest client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testDocumentGetByHash(drivers, t);
  t.end();
});

test("Document create with rest client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testDocumentSave(drivers, t);
  t.end();
});

test("Document update with rest client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testDocumentUpdate(drivers, t);
  t.end();
});

test("Document get all with rest client", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testDocumentGetAll(drivers, t);
  t.end();
});
