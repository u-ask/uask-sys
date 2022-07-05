import sinon from "sinon";
import { User } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { UserAutzDriver } from "./userautz.js";

test("User can save a user", async t => {
  seedExample();
  const driver = buildAutzDrivers("administrator");
  const survey = await driver.surveyDriver.getByName("P11-05");
  const userSave = sinon.spy(Reflect.get(driver.userDriver, "driver"), "save");
  await driver.userDriver
    .save(survey, new User("administrator", "me"))
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(userSave.called);
  t.end();
});

test("User cannot save a user", async t => {
  seedExample();
  const driver = buildAutzDrivers("writer_s001");
  const survey = await driver.surveyDriver.getByName("P11-05");
  const userSave = sinon.spy(Reflect.get(driver.userDriver, "driver"), "save");
  await driver.userDriver
    .save(survey, new User("administrator", "me"))
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to save user"));
  t.false(userSave.called);
  t.end();
});

test("User can save himself", async t => {
  seedExample();
  const driver = buildAutzDrivers("writer_s001");
  const survey = await driver.surveyDriver.getByName("P11-05");
  const userSave = sinon.spy(Reflect.get(driver.userDriver, "driver"), "save");
  await driver.userDriver
    .save(survey, new User("writer").update({ userid: "writer_s001" }))
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(userSave.called);
  t.end();
});

function buildAutzDrivers(userid: string) {
  const drivers = new ExampleDrivers();
  Object.assign(drivers, {
    userDriver: new UserAutzDriver(drivers.userDriver, userid),
  });
  return drivers;
}
