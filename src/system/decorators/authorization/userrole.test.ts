import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import {
  testUsersGetBySurvey,
  testCreateNewUser,
  testUpdateExistingUser,
  testGetUserById,
} from "../../../drivers/tests/usertests.js";
import { UserRoleDriver } from "./userrole.js";

test("Get all users from survey", async t => {
  seedExample();
  const driver = buildRoleDrivers();
  await testUsersGetBySurvey(driver, t);
  t.end();
});

test("save a new user", async t => {
  seedExample();
  const driver = buildRoleDrivers();
  await testCreateNewUser(driver, t);
  t.end();
});

test("update an existing user", async t => {
  seedExample();
  const driver = buildRoleDrivers();
  await testUpdateExistingUser(driver, t);
  t.end();
});

test("get a user by userid", async t => {
  seedExample();
  const driver = buildRoleDrivers();
  await testGetUserById(driver, t);
  t.end();
});

function buildRoleDrivers() {
  const drivers = new ExampleDrivers();
  Object.assign(drivers, {
    userDriver: new UserRoleDriver(drivers.userDriver),
  });
  return drivers;
}
