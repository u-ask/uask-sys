import sinon from "sinon";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { AuditAutzDriver } from "./auditautz.js";

test("Writer can read audit record for sample", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new AuditAutzDriver(
    drivers.auditDriver,
    drivers.sampleDriver,
    drivers.userDriver,
    "writer_s002"
  );
  const auditGet = sinon.spy(drivers.auditDriver, "get");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await driver
    .get(survey, { participantCode: "000010" })
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(auditGet.called);
  t.end();
});

test("Writer cannot read audit record for sample", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const driver = new AuditAutzDriver(
    drivers.auditDriver,
    drivers.sampleDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const auditGet = sinon.spy(drivers.auditDriver, "get");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await driver
    .get(survey, { participantCode: "000010" })
    .then(() => t.fail())
    .catch(e => t.equal(e, "not authorized to read participants from sample"));
  t.true(auditGet.called);
  t.end();
});
