import { AuditExampleDriver } from "./autitex.js";
import { InterviewExampleDriver } from "./interviewex.js";
import { ParticipantExampleDriver } from "./participantex.js";
import { SampleExampleDriver } from "./sampleex.js";
import { SurveyExampleDriver } from "./surveyex.js";
import { SummaryExampleDriver } from "./summaryex.js";
import { UserExampleDriver } from "./userex.js";
import { DocumentExampleDriver } from "./documentex.js";
import {
  IAuditDriver,
  IDrivers,
  IKpiDriver,
  IUserDriver,
  KpiGenericDriver,
} from "../../client.js"; // this path is needed to meet the bundle structure, cf. rollup.client.js
export * from "./example.js";

export class ExampleDrivers implements IDrivers {
  readonly surveyDriver = new SurveyExampleDriver();
  readonly sampleDriver = new SampleExampleDriver();
  readonly participantDriver = new ParticipantExampleDriver();
  readonly interviewDriver = new InterviewExampleDriver();
  readonly summaryDriver = new SummaryExampleDriver();
  readonly userDriver: IUserDriver = new UserExampleDriver();
  readonly auditDriver: IAuditDriver = new AuditExampleDriver(this);
  readonly documentDriver = new DocumentExampleDriver();
  readonly kpiDriver: IKpiDriver = new KpiGenericDriver(
    this.sampleDriver,
    this.summaryDriver
  );
}
