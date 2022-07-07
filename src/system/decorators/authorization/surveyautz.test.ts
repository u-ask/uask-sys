import sinon from "sinon";
import { Survey } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { SurveyAutzDriver } from "./surveyautz.js";

test("Role cannot save survey", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new SurveyAutzDriver(
    drivers.surveyDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const save = sinon.spy(drivers.surveyDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await driver
    .save(survey)
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to save survey"));
  t.false(save.called);
  t.end();
});

test("Role can save survey", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new SurveyAutzDriver(
    drivers.surveyDriver,
    drivers.userDriver,
    "administrator"
  );
  const save = sinon
    .stub(drivers.surveyDriver, "save")
    .callsFake(() => Promise.resolve({}));
  await driver
    .save(new Survey("P11-05"))
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(save.called);
  t.end();
});

test("Creating survey also creates a developer", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new SurveyAutzDriver(
    drivers.surveyDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const saveSurvey = sinon.spy(drivers.surveyDriver, "save");
  const saveUser = sinon.spy(drivers.userDriver, "save");
  const survey = new Survey("P11-06");
  await driver
    .save(survey)
    .then(() => t.pass())
    .catch(e => t.fail(e));
  t.true(saveSurvey.called);
  t.true(saveUser.called);
  t.equal(saveUser.getCall(0).args[1].userid, "writer_s001");
  t.equal(saveUser.getCall(0).args[1].role, "superadministrator");
  t.end();
});
