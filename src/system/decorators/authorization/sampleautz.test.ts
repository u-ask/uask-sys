import sinon from "sinon";
import { Sample } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { SampleAutzDriver } from "./sampleautz.js";

test("Role cannot save document", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new SampleAutzDriver(
    drivers.sampleDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const save = sinon.spy(drivers.sampleDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await driver
    .save(survey, new Sample("003"))
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to save sample"));
  t.false(save.called);
  t.end();
});

test("Role can save document", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new SampleAutzDriver(
    drivers.sampleDriver,
    drivers.userDriver,
    "administrator"
  );
  const save = sinon.spy(drivers.sampleDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await driver
    .save(survey, new Sample("003"))
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(save.called);
  t.end();
});
