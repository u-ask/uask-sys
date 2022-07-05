import sinon from "sinon";
import { InterviewItem } from "uask-dom";
import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { Notifier } from "./notifier.js";

type PublicNotifier = {
  notifyByEmail(user: { email?: string }, message: string): Promise<void>;
  notifyBySms(user: { phone?: string }, message: string): Promise<void>;
};

test("Notify event by email with message and encoded url #399#402", async t => {
  t.plan(5);
  const user = { email: "writer@client.com" };
  const drivers = new ExampleDrivers();
  const notifier = new Notifier(drivers.userDriver);
  const stub = sinon.stub(
    notifier as unknown as PublicNotifier,
    "notifyByEmail"
  );
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const item = participant.interviews[1].items
    .find(i => i.pageItem.variableName == "__INCLUDED")
    ?.update({ messages: { critical: "Inclusion" } }) as InterviewItem;
  stub.callsFake(async ({ email }, msg) => {
    t.equal(email, "writer@client.com");
    t.true(/sample 001/.test(msg));
    t.true(/code: S\/001/.test(msg));
    t.true(/P11%2F05\/participant\/S%2F001/.test(msg));
    t.true(/#__INCLUDED/.test(msg));
  });
  await notifier.notifyEvent(
    user,
    survey.update({ name: "P11/05" }),
    participant.update({ participantCode: "S/001" }),
    participant.interviews[1],
    item
  );
  t.end();
});
