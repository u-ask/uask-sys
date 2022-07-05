import test from "tape";
import sinon from "sinon";
import { ExampleDrivers, seedExample } from "../../../drivers/example/index.js";
import { InterviewManagedDriver } from "./interviewmanaged.js";
import {
  testInterviewCreation,
  testInterviewItemUpdate,
} from "../../../drivers/tests/interviewtests.js";
import { KeyMap } from "../../aspect/keys.js";
import { Interview } from "uask-dom";
import { InterviewMixinDriver } from "../../../drivers/interview.js";

test("Underlying driver not called when no change", async t => {
  const {
    drivers,
    managedDrivers: { interviewDriver },
  } = buildDrivers();
  const save = sinon.spy(drivers.interviewDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[0];
  addKeySimulation(interview);
  await interviewDriver.save(survey, participant, interview);
  t.true(save.notCalled);
  t.end();
});

test("Underlying driver called only for modified items", async t => {
  const {
    drivers,
    managedDrivers: { interviewDriver },
  } = buildDrivers();
  const save = sinon.spy(drivers.interviewDriver, "save");
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[0].update({
    items: participant.interviews[0].items.map((i, x) =>
      x == 1 ? i.update({ value: "changed" }) : i
    ),
  });
  addKeySimulation(interview);
  await interviewDriver.save(survey, participant, interview);
  t.true(save.calledOnce);
  t.true(
    save.calledWith(survey, participant, interview, interview.items.slice(1, 2))
  );
  t.end();
});

test("Interview created with managed driver", async t => {
  seedExample();
  const { drivers, managedDrivers } = buildDrivers();
  await testInterviewCreation({ ...drivers, ...managedDrivers }, t);
  t.end();
});

test("Interview update with managed driver", async t => {
  seedExample();
  const { drivers, managedDrivers } = buildDrivers();
  await testInterviewItemUpdate({ ...drivers, ...managedDrivers }, t);
  t.end();
});

function buildDrivers() {
  const drivers = new ExampleDrivers();
  const interviewDriver = new InterviewMixinDriver(
    new InterviewManagedDriver(drivers.interviewDriver)
  );
  return { drivers, managedDrivers: { interviewDriver } };
}

function addKeySimulation(interview: Interview) {
  let k = 1;
  (interview.__keys__ as KeyMap).id = k++;
  interview.items.forEach(i => {
    (i.__keys__ as KeyMap).id = k++;
  });
}
