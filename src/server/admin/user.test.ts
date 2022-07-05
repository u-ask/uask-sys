import test from "../../system/store/db/test-runner.js";
import { IDrivers } from "../../drivers/index.js";
import {
  testUsersGetBySurvey,
  testCreateNewUser,
  testUpdateExistingUser,
  testGetUserById,
} from "../../drivers/tests/usertests.js";
import { createDrivers, seed } from "./test-utils.js";

test("Truenorth driver - User getAll driver", async (store, t) => {
  await seed(store);
  const driver: IDrivers = createDrivers(store);
  await testUsersGetBySurvey(driver, t);
  t.end();
});

test("Truenorth driver - User save", async (store, t) => {
  await seed(store);
  const driver: IDrivers = createDrivers(store);
  await testCreateNewUser(driver, t);
  t.end();
});

test("Truenorth driver - User update", async (store, t) => {
  await seed(store);
  const driver: IDrivers = createDrivers(store);
  await testUpdateExistingUser(driver, t);
  t.end();
});

test("Truenorth driver - Get User by Id", async (store, t) => {
  await seed(store);
  const driver: IDrivers = createDrivers(store);
  await testGetUserById(driver, t);
  t.end();
});
