import sinon from "sinon";
import test from "tape";
import { ExampleDrivers } from "../../../drivers/example/index.js";
import { ParticipantBox } from "./box.js";
import { InterviewBoxDriver } from "./interviewbox.js";
import { ParticipantBoxDriver } from "./participantbox.js";

test("Secure driver returns only allowed interviews", async t => {
  const ex = new ExampleDrivers();
  const box = new ParticipantBox(
    ex.participantDriver,
    ex.userDriver,
    "writer_p000003"
  );
  const participantDriver = new ParticipantBoxDriver(ex.participantDriver, box);
  const survey = await ex.surveyDriver.getByName("P11-05");
  const samples = await ex.sampleDriver.getAll(survey);
  const participant = await ex.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const getByParticipantCode = sinon.spy(
    ex.participantDriver,
    "getByParticipantCode"
  );
  const save = sinon.stub(ex.interviewDriver, "save");
  const secure = await participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const driver = new InterviewBoxDriver(ex.interviewDriver, box);
  const [allowed, forbidden] = secure.interviews.partition(
    i => !!survey.workflow("writer:external")?.pageSets.includes(i.pageSet)
  );
  for (const i of forbidden) {
    await driver.save(survey, secure, i);
    t.true(save.notCalled);
  }
  for (const i of allowed) {
    await driver.save(survey, secure, i);
    t.true(save.calledWith(survey, participant, i));
    await driver.save(survey, secure, i);
    t.true(getByParticipantCode.calledOnce);
  }
  t.end();
});
