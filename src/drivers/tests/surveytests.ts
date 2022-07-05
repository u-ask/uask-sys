import { builder } from "uask-dom";
import { Test } from "tape";
import { P11_05 } from "../example/index.js";
import { IDrivers } from "../index.js";
import { sameDomain } from "./test-utils.js";

export async function testSurveyGetByName(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  t.true(sameDomain(survey.pages, P11_05.pages));
  t.true(sameDomain(survey.pageSets, P11_05.pageSets));
  t.true(sameDomain(survey.pageSets, P11_05.pageSets));
  t.true(sameDomain(survey.workflows, P11_05.workflows));
}

export async function testSurveySave(drivers: IDrivers, t: Test): Promise<void> {
  const b = builder();
  b.survey("P11-06").pageSet("PS1").pages("P1");
  b.page("P1").question("Q1", "Q1", b.types.yesno);
  const survey = b.get();
  await drivers.surveyDriver.save(survey);
  const s = await drivers.surveyDriver.getByName("P11-06");
  t.deepLooseEqual(s, survey);
}

export async function testSurveyNotFound(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  await drivers.surveyDriver.getByName("HAHA").then(() => t.fail(), t.pass);
}

export async function testSurveyError(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const error = await drivers.surveyDriver.getByName("TEST").catch(error => {
    return error;
  });
  const expectedError = [
    {
      statusCode: 400,
      message: "unknown survey",
    },
  ];
  t.deepLooseEqual(error, expectedError);
}
