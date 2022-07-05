import sinon from "sinon";
import { Interview, PageSet } from "uask-dom";
import test from "tape";
import { ExampleDrivers } from "../../../drivers/example/index.js";
import { ParticipantBox } from "./box.js";
import { ParticipantBoxDriver } from "./participantbox.js";

test("Secure driver returns only allowed interviews for patient", async t => {
  const ex = new ExampleDrivers();
  const driver = new ParticipantBoxDriver(
    ex.participantDriver,
    new ParticipantBox(ex.participantDriver, ex.userDriver, "writer_p000003")
  );
  const survey = await ex.surveyDriver.getByName("P11-05");
  const samples = await ex.sampleDriver.getAll(survey);
  const participant = await ex.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const secure = await driver.getByParticipantCode(survey, samples, "000001");
  t.equal(secure.interviews.length, participant.interviews.length);
  const forbidden = secure.interviews.filter(
    i => !survey.workflow("writer:external")?.pageSets.includes(i.pageSet)
  );
  t.true(forbidden.length > 0);
  t.true(forbidden.every(i => i.items.length == 0));
  t.end();
});

test("Secure driver save all interviews", async t => {
  const ex = new ExampleDrivers();
  const save = sinon.stub(ex.participantDriver, "save");
  const driver = new ParticipantBoxDriver(
    ex.participantDriver,
    new ParticipantBox(ex.participantDriver, ex.userDriver, "writer_p000003")
  );
  const survey = await ex.surveyDriver.getByName("P11-05");
  const samples = await ex.sampleDriver.getAll(survey);
  const participant = await ex.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const secure = await driver.getByParticipantCode(survey, samples, "000001");
  const interview = new Interview(
    survey.workflow("writer:external")?.pageSets[0] as PageSet,
    survey.options
  );
  await driver.save(
    survey,
    secure.update({ interviews: secure.interviews.append(interview) })
  );
  t.true(
    save.calledWith(
      survey,
      participant.update({
        interviews: participant.interviews.append(interview),
      })
    )
  );
  t.end();
});
