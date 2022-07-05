import { Store } from "./../store/index.js";
import test from "./db/test-runner.js";
import { cleanTestDb, seedTestDocuments, seedTestSurvey } from "./db/test-utils.js";
import { buildDrivers } from "./test-utils.js";
import {
  testDocumentSave,
  testDocumentGetByHash,
  testDocumentNotFound,
  testDocumentUpdate,
  testDocumentSaveContent,
  testDocumentGetAll,
  testDocumentGetNameAndContent,
  testDocumentDelete,
} from "../../drivers/tests/documenttests.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestDocuments(store);
}

test("Store driver - get document by hash", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentGetByHash(drivers, t);
  t.end();
});

test("Store driver - get name & content document", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentGetNameAndContent(drivers, t);
  t.end();
});

test("Store driver - save document", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentSave(drivers, t);
  t.end();
});

test("Store driver - save content document", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentSaveContent(drivers, t);
  t.end();
});

test("Store driver - delete document", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentDelete(drivers, t);
  t.end();
});

test("Store driver - document not found", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentNotFound(drivers, t);
  t.end();
});

test("Store driver - update document", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentUpdate(drivers, t);
  t.end();
});

test("Store driver - get all", async (store, t) => {
  await seed(store);
  const drivers = buildDrivers(store);
  await testDocumentGetAll(drivers, t);
  t.end();
});
