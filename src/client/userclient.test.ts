import test from "./test-runner.js";
import { seedExample } from "../drivers/example/index.js";
import { ClientDrivers } from "./driver.js";
import {
  testCreateNewUser,
  testGetUserById,
  testUpdateExistingUser,
  testUsersGetBySurvey,
} from "../drivers/tests/usertests.js";

test("Client driver - get all users from survey", async (client, t) => {
  seedExample();
  const driver = new ClientDrivers(client);
  await testUsersGetBySurvey(driver, t);
  t.end();
});

test("Client driver - save a new user", async (client, t) => {
  seedExample();
  const driver = new ClientDrivers(client);
  await testCreateNewUser(driver, t);
  t.end();
});

test("Client driver - update an existing user", async (client, t) => {
  seedExample();
  const driver = new ClientDrivers(client);
  await testUpdateExistingUser(driver, t);
  t.end();
});

test("Client driver - get user by id", async (client, t) => {
  seedExample();
  const driver = new ClientDrivers(client);
  await testGetUserById(driver, t);
  t.end();
});
