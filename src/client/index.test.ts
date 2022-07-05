import test from "tape";
import { ClientDrivers } from "./driver.js";
import { SurveyWebDriver } from "./surveyclient.js";
import got from "got";

test("Example drivers", t => {
  const drivers = new ClientDrivers(got);
  t.true(drivers.surveyDriver instanceof SurveyWebDriver);
  t.end();
});
