import sinon from "sinon";
import { DomainCollection } from "uask-dom";
import test from "tape";
import { Document } from "../../../drivers/index.js";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { DocumentAutzDriver } from "./documentautz.js";

const exampleSurveyDocument = new Document(
  "Survey Doc",
  "",
  DomainCollection(),
  {
    hash: 1234,
  }
);

const exampleParticipantDocument = new Document(
  "Participant Image",
  "",
  DomainCollection(),
  { visibility: "participant", hash: 5678 }
);

test("Role cannot save survey document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleSurveyDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const save = sinon.spy(drivers.documentDriver, "save");
  const saveContent = sinon.spy(drivers.documentDriver, "saveContent");
  await driver
    .save(survey, new Document("", ""))
    .catch(e => t.equal(e, "role is not authorized to save survey document"));
  await driver
    .saveContent(survey, 1234, new Uint8Array())
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to save survey document"));
  t.false(save.called);
  t.false(saveContent.called);
  t.end();
});

test("Role cannot delete survey document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleSurveyDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const save = sinon.spy(drivers.documentDriver, "delete");
  await driver
    .delete(survey, 1234)
    .then(() => t.fail())
    .catch(e => t.equal(e, "role is not authorized to save survey document"));
  t.false(save.called);
  t.end();
});

test("Role can save survey document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleSurveyDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "administrator"
  );
  const save = sinon.stub(drivers.documentDriver, "save");
  const saveContent = sinon.stub(drivers.documentDriver, "saveContent");
  await driver
    .save(survey, new Document("", ""))
    .then(() => t.pass())
    .catch(() => t.fail());
  await driver
    .saveContent(survey, 1234, new Uint8Array())
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(save.called);
  t.true(saveContent.called);
  t.end();
});

test("Role can delete survey document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleSurveyDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "administrator"
  );
  const save = sinon.stub(drivers.documentDriver, "delete");
  await driver
    .delete(survey, 1234)
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(save.called);
  t.end();
});

test("Role cannot save participant document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleParticipantDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "administrator"
  );
  const save = sinon.spy(drivers.documentDriver, "save");
  const saveContent = sinon.spy(drivers.documentDriver, "saveContent");
  await driver
    .save(
      survey,
      new Document("", "", DomainCollection(), { visibility: "participant" })
    )
    .then(() => t.fail())
    .catch(e =>
      t.equal(e, "role is not authorized to save participant document")
    );
  await driver
    .saveContent(survey, 5678, new Uint8Array())
    .then(() => t.fail())
    .catch(e =>
      t.equal(e, "role is not authorized to save participant document")
    );
  t.false(save.called);
  t.false(saveContent.called);
  t.end();
});

test("Role cannot delete participant document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleParticipantDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "administrator"
  );
  const save = sinon.stub(drivers.documentDriver, "delete");
  await driver
    .delete(survey, 5678)
    .then(() => t.fail())
    .catch(e =>
      t.equal(e, "role is not authorized to save participant document")
    );
  t.false(save.called);
  t.end();
});

test("Role can save participant document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleParticipantDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const save = sinon.stub(drivers.documentDriver, "save");
  const saveContent = sinon.stub(drivers.documentDriver, "saveContent");
  await driver
    .save(
      survey,
      new Document("", "", DomainCollection(), { visibility: "participant" })
    )
    .then(() => t.pass())
    .catch(() => t.fail());
  await driver
    .saveContent(survey, 5678, new Uint8Array())
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(save.called);
  t.true(saveContent.called);
  t.end();
});

test("Role can delete participant document #391", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver.save(survey, exampleParticipantDocument);
  const driver = new DocumentAutzDriver(
    drivers.documentDriver,
    drivers.userDriver,
    "writer_s001"
  );
  const save = sinon.stub(drivers.documentDriver, "delete");
  await driver
    .delete(survey, 5678)
    .then(() => t.pass())
    .catch(() => t.fail());
  t.true(save.called);
  t.end();
});
