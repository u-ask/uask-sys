import { Got } from "got";
import {
  IAuditDriver,
  IDocumentDriver,
  IDrivers,
  IInterviewDriver,
  IParticipantDriver,
  ISampleDriver,
  ISurveyDriver,
  ISummaryDriver,
  IUserDriver,
  IKpiDriver,
  IParticipantDeleteDriver,
} from "../drivers/index.js";
import { SurveyWebDriver } from "./surveyclient.js";
import { ParticipantWebDriver } from "./participantclient.js";
import { InterviewWebDriver } from "./interviewclient.js";
import { SummaryWebDriver } from "./summaryclient.js";
import { SampleWebDriver } from "./sampleclient.js";
import { AuditWebDriver } from "./auditclient.js";
import { UserWebDriver } from "./userclient.js";
import { Builder, SampleCacheDriver } from "../system/client.js";
import { DocumentWebDriver } from "./documentclient.js";
import { KpiGenericDriver } from "../drivers/kpi.js";
import { IInterviewDeleteDriver } from "../drivers/interview.js";

export class ClientDrivers implements IDrivers {
  readonly sampleDriver: ISampleDriver;
  readonly participantDriver: IParticipantDriver & IParticipantDeleteDriver;
  readonly surveyDriver: ISurveyDriver;
  readonly interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
  readonly summaryDriver: ISummaryDriver;
  readonly auditDriver: IAuditDriver;
  readonly userDriver: IUserDriver;
  readonly documentDriver: IDocumentDriver;
  readonly kpiDriver: IKpiDriver;

  constructor(readonly client: Got) {
    this.surveyDriver = Builder.decorate(SurveyWebDriver, client)
      .withLogging()
      .get();
    this.participantDriver = Builder.decorate(ParticipantWebDriver, client)
      .withLogging()
      .get();
    this.sampleDriver = Builder.decorate(SampleWebDriver, client)
      .withLogging()
      .with(SampleCacheDriver)
      .withLogging()
      .get();
    this.interviewDriver = Builder.decorate(InterviewWebDriver, client)
      .withLogging()
      .get();
    this.summaryDriver = Builder.decorate(SummaryWebDriver, client)
      .withLogging()
      .get();
    this.auditDriver = Builder.decorate(AuditWebDriver, client)
      .withLogging()
      .get();
    this.userDriver = Builder.decorate(UserWebDriver, client)
      .withLogging()
      .get();
    this.documentDriver = Builder.decorate(DocumentWebDriver, client)
      .withLogging()
      .get();
    this.kpiDriver = Builder.decorate(
      KpiGenericDriver,
      this.sampleDriver,
      this.summaryDriver
    )
      .withLogging()
      .get();
  }
}
