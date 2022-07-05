import test from "tape";
import { ExampleDrivers } from "./index.js";
import {
  testSampleError,
  testSampleGetAll,
  testSampleGetByCode,
  testSampleNotFound,
  testSampleSave,
} from "../tests/sampletests.js";
import { seedExample } from "./example.js";

test("Sample example driver", async t => {
  seedExample();
  await testSampleGetAll(new ExampleDrivers(), t);
  t.end();
});

test("Sample example by sampleCode", async t => {
  seedExample();
  await testSampleGetByCode(new ExampleDrivers(), t);
  t.end();
});

test("Sample example save", async t => {
  seedExample();
  await testSampleSave(new ExampleDrivers(), t);
  t.end();
});

test("Sample unknown", async t => {
  seedExample();
  await testSampleNotFound(new ExampleDrivers(), t);
  t.end();
});

test("Sample unknown", async t => {
  seedExample();
  await testSampleError(new ExampleDrivers(), t);
  t.end();
});
