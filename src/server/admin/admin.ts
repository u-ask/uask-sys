import restana, { Protocol, Router, Request, Response } from "restana";
import { User } from "uask-dom";
import { DriverFactory } from "../factory.js";

async function getAllAccountsForSurvey<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const users = await drivers.userDriver.getAll(survey);
      res.send(users);
    },
    { req, res }
  );
}

async function getAccountByIdForSurvey<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const user = await drivers.userDriver.getByUserId(
        survey,
        req.params.userid
      );
      res.send(user);
    },
    { req, res }
  );
}

async function saveAccountOnSurvey<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      try {
        const survey = await drivers.surveyDriver.getByName(req.params.survey);
        const user = Object.assign(Object.create(User.prototype), req.body);
        const result = await drivers.userDriver.save(survey, user);
        res.send(result);
      } catch (e) {
        res.send({ errors: [e] }, 400);
      }
    },
    { req, res }
  );
}

export function adminRouter<P extends Protocol>(
  driverFactory: DriverFactory
): Router<P> {
  return restana<P>()
    .newRouter()
    .get("/:survey/users", async (req, res) => {
      await getAllAccountsForSurvey(driverFactory, req, res);
    })
    .get("/:survey/users/:userid", async (req, res) => {
      await getAccountByIdForSurvey(driverFactory, req, res);
    })
    .post("/:survey/users/:userid", async (req, res) => {
      await saveAccountOnSurvey(driverFactory, req, res);
    });
}
