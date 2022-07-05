import sinon from "sinon";

import test from "tape";
import { ReplayWorker } from "./worker.js";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { UserSystemDriver } from "./replay.js";

class ReplayTestDrivers extends ExampleDrivers {
  readonly userDriver = new UserSystemDriver();
}

test("Summary synchronization iteration #273", async t => {
  const drivers = new ReplayTestDrivers();
  const getSurvey = sinon.spy(drivers.surveyDriver, "getByName");
  const saveParticipant = sinon.stub(drivers.participantDriver, "save");
  const participantCodes = [
    "000002",
    "000003",
    "000007",
    "000010",
    "000012",
    "000001",
  ];
  const worker = new ReplayWorker(f => f(drivers), makeGetter(participantCodes));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of worker.iterate());
  t.equal(getSurvey.callCount, 1);
  t.equal(saveParticipant.callCount, 5);
  t.true(
    participantCodes
      .slice(0, 5)
      .every((code, i) => saveParticipant.getCall(i).args[1].participantCode == code)
  );
  t.end();
});

test("Summary synchronization loop #273", async t => {
  const drivers = new ReplayTestDrivers();
  const getSurvey = sinon.spy(drivers.surveyDriver, "getByName");
  const saveParticipant = sinon.stub(drivers.participantDriver, "save");
  const participantCodes = [
    "000002",
    "000003",
    "000007",
    "000010",
    "000012",
    "000001",
  ];
  const worker = new ReplayWorker(f => f(drivers), makeGetter(participantCodes));
  const consume = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const r = await worker.loop.next();
    if (!r.done) setTimeout(consume, 300);
  };
  consume();
  const waitForSixthCall = (r: () => void, count: number) => {
    if (saveParticipant.callCount == 6 || count == 10) r();
    else setTimeout(waitForSixthCall, 300, r, count + 1);
  };
  await new Promise<void>(r => waitForSixthCall(r, 0));
  await worker.loop.return("shutdown");
  t.equal(getSurvey.callCount, 2);
  t.equal(saveParticipant.callCount, 6);
  t.end();
});

test("Summary synchronization loop properly stops #273", async t => {
  const drivers = new ReplayTestDrivers();
  const getSurvey = sinon.spy(drivers.surveyDriver, "getByName");
  const saveParticipant = sinon.stub(drivers.participantDriver, "save");
  const participantCodes = [
    "000002",
    "000003",
    "000007",
    "000010",
    "000012",
    "000001",
  ];
  const worker = new ReplayWorker(f => f(drivers), makeGetter(participantCodes));
  const consume = async () => {
    const r = await worker.loop.next();
    if (!r.done) setTimeout(consume, 300);
  };
  consume();
  const waitForSixthCall = (r: () => void, count: number) => {
    if (saveParticipant.callCount == 1 || count == 10) r();
    else setTimeout(waitForSixthCall, 300, r, count + 1);
  };
  await new Promise<void>(r => waitForSixthCall(r, 0));
  await worker.loop.return("shutdown");
  t.equal(getSurvey.callCount, 1);
  t.equal(saveParticipant.callCount, 1);
  t.end();
});

function makeGetter(
  participantCodes: string[]
): () => Promise<Record<string, string[]>> {
  let callCount = 0;
  return () => {
    const outOfScope = {
      "P11-05": participantCodes.slice(callCount * 5),
    };
    callCount++;
    return Promise.resolve(outOfScope);
  };
}
