import test from "tape";
import { ExampleDrivers } from "./index.js";
import {
  testCreateNewUser,
  testGetUserById,
  testUpdateExistingUser,
  testUsersGetBySurvey,
} from "../tests/usertests.js";
import { seedExample } from "./example.js";

test("User example driver", async t => {
  seedExample();
  await testUsersGetBySurvey(new ExampleDrivers(), t);
  t.end();
});

test("User example create", async t => {
  seedExample();
  await testCreateNewUser(new ExampleDrivers(), t);
  t.end();
});

test("User example update", async t => {
  seedExample();
  await testUpdateExistingUser(new ExampleDrivers(), t);
  t.end();
});

test("User example update", async t => {
  seedExample();
  await testGetUserById(new ExampleDrivers(), t);
  t.end();
});
