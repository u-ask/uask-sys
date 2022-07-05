import {
  IParticipantDriver,
  IParticipantDeleteDriver,
  ParticipantGetOptions,
} from "./participant.js";
import { ISampleDriver } from "./sample.js";
import { ISurveyDriver } from "./survey.js";
import {
  IInterviewDeleteDriver,
  IInterviewDriver,
  InterviewSaveOptions,
  PartialInterview,
} from "./interview.js";
import { ISummaryDriver, SummaryGenericDriver } from "./summary.js";
import { IUserDriver } from "./user.js";
import {
  IAuditDriver,
  AuditableRef,
  AuditRecord,
  AuditTrail,
} from "./audit.js";
import { IDocumentDriver } from "./document.js";
import { IKpiDriver, KpiGenericDriver } from "./kpi.js";

export { ParticipantSummary } from "./summary.js";
export { Document, getAllTags } from "./document.js";
export * from "./types.js";
export {
  ISurveyDriver,
  ISampleDriver,
  IParticipantDriver,
  IParticipantDeleteDriver,
  ParticipantGetOptions,
  IInterviewDriver,
  IInterviewDeleteDriver,
  InterviewSaveOptions,
  PartialInterview,
  ISummaryDriver,
  SummaryGenericDriver,
  IUserDriver,
  IAuditDriver,
  AuditRecord,
  AuditableRef,
  AuditTrail,
  IDocumentDriver,
  IKpiDriver,
  KpiGenericDriver,
};

export interface IDrivers {
  readonly surveyDriver: ISurveyDriver;
  readonly sampleDriver: ISampleDriver;
  readonly participantDriver: IParticipantDriver & IParticipantDeleteDriver;
  readonly interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
  readonly summaryDriver: ISummaryDriver;
  readonly userDriver: IUserDriver;
  readonly auditDriver: IAuditDriver;
  readonly documentDriver: IDocumentDriver;
  readonly kpiDriver: IKpiDriver;
}
