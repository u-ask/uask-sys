import { ClientDrivers } from "./driver.js";
import test from "./test-runner.js";
import {
  testSurveyError,
  testSurveyGetByName,
  testSurveySave,
} from "../drivers/tests/surveytests.js";
import { seedExample } from "../drivers/example/index.js";
import { HTTPError } from "got/dist/source";

test("Graphql client survey get by name", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSurveyGetByName(drivers, t);
  t.end();
});

test("Graphql client survey save", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSurveySave(drivers, t).catch((e: HTTPError) =>
    t.fail(e.response.body as string)
  );
  t.end();
});

test("Graphql client survey save", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testSurveyError(drivers, t);
  t.end();
});
