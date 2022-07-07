import { Test } from "tape";
import { IDrivers } from "../index.js";

export async function testSummaryParticipantAlerts(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const participantSummary = await drivers.summaryDriver.getAll(
    survey,
    undefined,
    ["alerts"]
  );
  t.true(participantSummary.every(p => Array.isArray(p.alerts)));
}

export async function testSummaryParticipantPins(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const participantSummary = await drivers.summaryDriver.getAll(
    survey,
    undefined,
    ["participantCode", "currentInterview", "pins"]
  );
  t.true(participantSummary.every(p => "pins" in p && "currentInterview" in p));
}

export async function testSummaryParticipantKpis(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const participantSummary = await drivers.summaryDriver.getAll(
    survey,
    undefined,
    ["participantCode", "currentInterview", "kpis"]
  );
  t.true(participantSummary.every(p => "kpis" in p && "currentInterview" in p));
}

export async function testSummaryParticipantInfo(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const participantSummary = await drivers.summaryDriver.getAll(
    survey,
    undefined,
    ["participantCode", "sampleCode", "currentInterview"]
  );
  t.equal(participantSummary[0].participantCode, "000001");
  t.equal(participantSummary[0].sampleCode, "001");
  t.true(participantSummary[0].currentInterview?.date instanceof Date);
  t.equal(participantSummary[10].participantCode, "000011");
  t.equal(participantSummary[10].sampleCode, "002");
  const participantSampleSummary = await drivers.summaryDriver.getAll(
    survey,
    await drivers.sampleDriver.getBySampleCode(survey, "001"),
    ["participantCode", "sampleCode"]
  );
  t.true(participantSampleSummary.length < 11);
}
