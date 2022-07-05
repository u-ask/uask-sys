import test from "tape";
import { ExampleDrivers } from "./index.js";
import {
  testSurveyNotFound,
  testSurveyGetByName,
  testSurveySave,
} from "../tests/surveytests.js";
import { seedExample } from "./example.js";

test("Survey example driver, get by name", async t => {
  seedExample();
  await testSurveyGetByName(new ExampleDrivers(), t);
  t.end();
});

test("Survey example driver, save", async t => {
  seedExample();
  await testSurveySave(new ExampleDrivers(), t);
  t.end();
});

test("Survey unknown", async t => {
  seedExample();
  await testSurveyNotFound(new ExampleDrivers(), t);
  t.end();
});
