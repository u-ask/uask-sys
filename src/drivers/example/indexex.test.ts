import test from "tape";
import { ExampleDrivers } from "./index.js";
import { DocumentExampleDriver } from "./documentex.js";
import { ParticipantExampleDriver } from "./participantex.js";
import { SampleExampleDriver } from "./sampleex.js";
import { SurveyExampleDriver } from "./surveyex.js";

test("Example drivers", t => {
  const drivers = new ExampleDrivers();
  t.true(drivers.surveyDriver instanceof SurveyExampleDriver);
  t.true(drivers.sampleDriver instanceof SampleExampleDriver);
  t.true(drivers.participantDriver instanceof ParticipantExampleDriver);
  t.true(drivers.documentDriver instanceof DocumentExampleDriver);
  t.end();
});
