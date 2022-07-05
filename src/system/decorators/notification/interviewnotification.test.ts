import sinon from "sinon";
import {
  Survey,
  Participant,
  Interview,
  ItemMessages,
  isAcknowledged,
  acknowledge,
} from "uask-dom";
import test from "tape";
import { IInterviewDriver, PartialInterview } from "../../../drivers/index.js";
import {
  ExampleDrivers,
  P11_05,
  P11_05_Participants,
  seedExample,
} from "../../../drivers/example/index.js";
import { InterviewNotificationDriver } from "./interviewnotification.js";
import {
  testInterviewCreation,
  testInterviewItemUpdate,
} from "../../../drivers/tests/interviewtests.js";
import { InterviewMixinDriver } from "../../../drivers/interview.js";

const fakeDriver = {
  save: sinon.fake(
    (s: Survey, p: Participant, i: Interview): Promise<PartialInterview> =>
      Promise.resolve([
        { __keys__: i.__keys__ },
        {
          items: [...i.items.map(i => ({ __keys__: i.__keys__ }))],
        },
      ])
  ),
};

const fakeNotifier = {
  notifyAuthentCode: sinon.fake(),
  notifyParticipantAccount: sinon.fake(),
  notifyEvent: sinon.fake(),
};

test("Notification driver calls underlying driver #275", async t => {
  const { driver, survey, participant, interview } = setup();
  await driver.save(survey, participant, interview);
  t.true(fakeDriver.save.called);
  fakeDriver.save.resetHistory();
  t.end();
});

test("Saving new events triggers a notification #275", async t => {
  const { driver, survey, participant, interview } = setup();
  const itemIndex = interview.items.findIndex(
    i => i.pageItem.variableName == "__INCLUDED"
  );
  const item = interview.items[itemIndex];
  const raised = item
    .update({
      value: undefined,
      __keys__: {},
      __untrack__: true,
    })
    .update({
      value: 1,
      messages: acknowledge({ critical: "Inclusion" }, "critical"),
    });
  await driver.save(
    survey,
    participant,
    interview.update({
      items: interview.items.update(i => (i == item ? raised : i)),
    })
  );
  t.equal(
    fakeNotifier.notifyEvent.getCall(0).args[0].email,
    "administrator@example.com"
  );
  fakeNotifier.notifyEvent.resetHistory();
  t.end();
});

test("Saving non aknowledged events acknowledges it #275", async t => {
  const { driver, survey, participant, interview } = setup();
  const itemIndex = interview.items.findIndex(
    i => i.pageItem.variableName == "__INCLUDED"
  );
  const item = interview.items[itemIndex];
  const raised = item.update({ messages: { critical: "Inclusion" } });
  const info = await driver.save(
    survey,
    participant,
    interview.update({
      items: interview.items.update(i => (i == item ? raised : i)),
    })
  );
  const messages = fakeDriver.save.getCall(0).args[2].items[itemIndex]
    .messages as ItemMessages;
  t.true(isAcknowledged(messages, "critical"));
  const infoMessage = info[1].items[itemIndex].messages as ItemMessages;
  t.true(isAcknowledged(infoMessage, "critical"));
  fakeDriver.save.resetHistory();
  t.end();
});

test("Notification driver - create interview", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testInterviewCreation(drivers, t);
  t.end();
});

test("Notification driver - update items", async t => {
  seedExample();
  const drivers = buildDrivers();
  await testInterviewItemUpdate(drivers, t);
  t.end();
});

function buildDrivers() {
  const example = new ExampleDrivers();
  return {
    ...example,
    interviewDriver: new InterviewMixinDriver(
      new InterviewNotificationDriver(
        example.interviewDriver,
        example.userDriver,
        fakeNotifier
      ),
      example.interviewDriver
    ),
  };
}

function setup() {
  const driver: IInterviewDriver = new InterviewNotificationDriver(
    fakeDriver,
    new ExampleDrivers().userDriver,
    fakeNotifier
  );
  seedExample();
  const survey = P11_05;
  const participant = P11_05_Participants[0];
  const interview = participant.interviews[1];
  return { driver, survey, participant, interview };
}
