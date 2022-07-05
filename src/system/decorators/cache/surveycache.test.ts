import test from "tape";

import { ExampleDrivers } from "../../../drivers/example/index.js";
import {
  testSurveyNotFound,
  testSurveyGetByName,
  testSurveySave,
} from "../../../drivers/tests/surveytests.js";
import { seedExample } from "../../../drivers/example/index.js";
import { SurveyCacheDriver } from "./surveycache.js";

test("Survey example driver, get by name", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testSurveyGetByName(drivers, t);
  t.end();
});

test("Survey example driver, save", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testSurveySave(drivers, t);
  t.end();
});

test("Survey unknown", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testSurveyNotFound(drivers, t);
  t.end();
});

function buildDrivers() {
  const drivers = new ExampleDrivers();
  Object.assign(drivers, {
    surveyDriver: new SurveyCacheDriver(drivers.surveyDriver),
  });
  return drivers;
}
