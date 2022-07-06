import { builder, User } from "uask-dom";
import {
  testUsersGetBySurvey,
  testCreateNewUser,
  testUpdateExistingUser,
  testGetUserById,
} from "../../../drivers/tests/usertests.js";
import { UserManagedDriver } from "./usermanaged.js";
import { Store } from "../../store/../store/index.js";
import test from "../../store/db/test-runner.js";
import { createDrivers, seed } from "../../../server/admin/test-utils.js";

test("save two times a user with the same email", async (store, t) => {
  await seed(store);
  const driver = buildDrivers(store);
  const b = builder();
  b.survey("P11-06");
  const newSurvey = b.get();
  await driver.surveyDriver.save(newSurvey);
  const survey = await driver.surveyDriver.getByName("P11-06");
  const user = new User(
    "Monique",
    "Reigner",
    "Dr.",
    "developer",
    "writer001@example.com"
  );
  await driver.userDriver.save(survey, user);
  const updatedUser = await driver.userDriver.getByUserId(
    survey,
    "writer001@example.com"
  );
  t.true(!!updatedUser);
  t.end();
});

test("Get all users from survey", async (store, t) => {
  await seed(store);
  const driver = buildDrivers(store);
  await testUsersGetBySurvey(driver, t);
  t.end();
});

test("save a new user", async (store, t) => {
  await seed(store);
  const driver = buildDrivers(store);
  await testCreateNewUser(driver, t);
  t.end();
});

test("update an existing user", async (store, t) => {
  await seed(store);
  const driver = buildDrivers(store);
  await testUpdateExistingUser(driver, t);
  t.end();
});

test("get a user by userid", async (store, t) => {
  await seed(store);
  const driver = buildDrivers(store);
  await testGetUserById(driver, t);
  t.end();
});

function buildDrivers(store: Store) {
  const drivers = createDrivers(store);
  Object.assign(drivers, {
    userDriver: new UserManagedDriver(drivers.userDriver, store.client),
  });
  return drivers;
}
