import test from "tape";
import { ExampleDrivers } from "./index.js";
import {
  testInterviewCreation,
  testInterviewDelete,
  testInterviewItemSubsetUpdate,
  testInterviewItemUpdate,
} from "../tests/interviewtests.js";
import { seedExample } from "./example.js";

test("Interview example save created", async t => {
  seedExample();
  await testInterviewCreation(new ExampleDrivers(), t);
  t.end();
});

test("Interview example save updated", async t => {
  seedExample();
  await testInterviewItemUpdate(new ExampleDrivers(), t);
  t.end();
});

test("Interview example save subset updated", async t => {
  seedExample();
  await testInterviewItemSubsetUpdate(new ExampleDrivers(), t);
  t.end();
});

test("Interview example deleted", async t => {
  seedExample();
  await testInterviewDelete(new ExampleDrivers(), t);
  t.end();
});
