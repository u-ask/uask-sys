import test from "tape";
import {
  testDocumentSave,
  testDocumentGetByHash,
  testDocumentNotFound,
  testDocumentUpdate,
  testDocumentGetAll,
  testDocumentGetNameAndContent,
  testDocumentSaveContent,
  testDocumentDelete,
} from "../tests/documenttests.js";
import { seedExample } from "./example.js";
import { ExampleDrivers } from "./index.js";

test("Document example save", async t => {
  seedExample();
  await testDocumentSave(new ExampleDrivers(), t);
  t.end();
});

test("Document example save content", async t => {
  seedExample();
  await testDocumentSaveContent(new ExampleDrivers(), t);
  t.end();
});

test("Document example delete", async t => {
  seedExample();
  await testDocumentDelete(new ExampleDrivers(), t);
  t.end();
});

test("Document example get by hash", async t => {
  seedExample();
  await testDocumentGetByHash(new ExampleDrivers(), t);
  t.end();
});

test("Document example get content and name", async t => {
  seedExample();
  await testDocumentGetNameAndContent(new ExampleDrivers(), t);
  t.end();
});

test("Document unknown", async t => {
  seedExample();
  await testDocumentNotFound(new ExampleDrivers(), t);
  t.end();
});

test("Document example update", async t => {
  seedExample();
  await testDocumentUpdate(new ExampleDrivers(), t);
  t.end();
});

test("Document example get all", async t => {
  seedExample();
  await testDocumentGetAll(new ExampleDrivers(), t);
  t.end();
});
