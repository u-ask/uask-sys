import restana, { Request, Response, Protocol, Router } from "restana";
import { Consumer, DriverFactory } from "../factory.js";
import { INotifier } from "../../system/notifier.js";

export function notificationRouter<P extends Protocol>(
  driverFactory: DriverFactory,
  notifier: Consumer<INotifier>
): Router<P> {
  return restana<P>()
    .newRouter()
    .post("/:name/participant/create/:participantCode", async (req, res) => {
      await notifyParticipantCreation(driverFactory, notifier, req, res);
    });
}

async function notifyParticipantCreation<P extends Protocol>(
  driverFactory: DriverFactory,
  notifier: Consumer<INotifier>,
  req: Request<P>,
  res: Response<P>
) {
  return driverFactory(
    async (drivers, fromUser) => {
      const survey = await drivers.surveyDriver.getByName(req.params.name);
      const samples = await drivers.sampleDriver.getAll(survey);
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        req.params.participantCode
      );
      const toUser = `${survey.name}_${participant.participantCode}`;
      const notif = await notifier(drivers, fromUser);
      await notif.notifyParticipantAccount(toUser, survey, participant);
      res.send(200);
    },
    { req, res }
  );
}
