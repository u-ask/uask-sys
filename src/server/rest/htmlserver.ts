import restana, { Protocol, Request, Response, Router } from "restana";
import { DriverFactory } from "../factory.js";
import { print } from "../utils/print.js";
import { annotated, blank } from "../utils/itemspecial.js";
import { IDrivers } from "../../drivers/index.js";
import { Participant, Survey } from "uask-dom";

async function getDomain(
  drivers: IDrivers,
  req:
    | (import("http2").Http2ServerRequest & restana.RequestExtensions)
    | (import("http").IncomingMessage & restana.RequestExtensions)
) {
  const survey = await drivers.surveyDriver.getByName(req.params.name);
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    req.params.participantCode
  );
  return { survey, participant };
}

export async function getPrintSpecial<P extends Protocol>(
  driverFactory: DriverFactory,
  special: (survey: Survey) => Participant,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.name);
      const html = req.params.lang
        ? print(survey, special(survey), req.params.lang)
        : print(survey, special(survey));
      res.send(html.toString(), 200, {
        "Content-Type": "text/html",
      });
      res.end();
    },
    { req, res }
  );
}

export async function getPrintByCode<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const { survey, participant } = await getDomain(drivers, req);
      const html = req.params.lang
        ? print(survey, participant, req.params.lang)
        : print(survey, participant);
      res.send(html.toString(), 200, {
        "Content-Type": "text/html",
      });
      res.end();
    },
    { req, res }
  );
}

export function htmlRouter<P extends Protocol>(
  driverFactory: DriverFactory
): Router<P> {
  return restana<P>()
    .newRouter()
    .get("/:name/blank/:lang?", async (req, res) => {
      await getPrintSpecial(driverFactory, blank, req, res);
    })
    .get("/:name/annotated/:lang?", async (req, res) => {
      await getPrintSpecial(driverFactory, annotated, req, res);
    })
    .get("/:name/:participantCode/:lang?", async (req, res) => {
      await getPrintByCode(driverFactory, req, res);
    });
}
