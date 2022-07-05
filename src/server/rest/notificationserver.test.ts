import test from "tape";
import restana from "restana";
import { ExampleDrivers } from "../../drivers/example/index.js";
import { Consumer, DriverFactory } from "../factory.js";
import got from "got";
import bodyParser from "body-parser";
import { Participant, Survey } from "uask-dom";
import { notificationRouter } from "./notificationserver.js";
import { INotifier } from "../../system/notifier.js";
import { Notifier } from "../utils/notifier.js";
import sinon from "sinon";
import { IDrivers } from "../../drivers/index.js";

const drivers = new ExampleDrivers();
const driverFactory: DriverFactory = c => c(drivers, "me");
let notifyParticipantAccountTest: (s: Survey, u: Participant) => void;
const notifier = sinon.stub(async (d: IDrivers, u: string) => {
  const notifier = new Notifier(d.userDriver, u);
  sinon.stub(notifier, "notifyParticipantAccount").callsFake(async (u, s, c) => {
    notifyParticipantAccountTest(s, c);
  });
  return notifier;
});
const serve = restana()
  .use(bodyParser.json())
  .use(
    "/notification",
    notificationRouter(driverFactory, notifier as Consumer<INotifier>)
  );
serve.start(32323);
test.onFinish(() => serve.close());

test("Participant creation notification", async t => {
  t.plan(2);

  notifyParticipantAccountTest = (s, u) => {
    t.equal(s.name, "P11-05");
    t.equal(u.participantCode, "000001");
  };

  await got.post(
    "http://localhost:32323/notification/P11-05/participant/create/000001"
  );
  t.end();
});
