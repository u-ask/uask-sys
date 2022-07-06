import { Knex } from "knex";
import {
  IAuditDriver,
  IDocumentDriver,
  IDrivers,
  IInterviewDriver,
  IParticipantDeleteDriver,
  IParticipantDriver,
  ISampleDriver,
  ISurveyDriver,
  ISummaryDriver,
  IUserDriver,
} from "../drivers/index.js";
import {
  AuditDbDriver,
  Builder,
  InterviewAuditDriver,
  ParticipantAuditDriver,
  ParticipantReconciliationDriver,
  SampleCacheDriver,
  SurveyCacheDriver,
  SurveyReconciliationDriver,
} from "../system/server.js";
import { Store } from "../system/store/../store/index.js";
import { InterviewStoreDriver } from "../system/store/interviewstore.js";
import { ParticipantStoreDriver } from "../system/store/participantstore.js";
import { SampleStoreDriver } from "../system/store/samplestore.js";
import { SurveyStoreDriver } from "../system/store/surveystore.js";
import { DocumentStoreDriver } from "../system/store/documentstore.js";
import { UserTruenorthDriver } from "./admin/index.js";
import { InterviewRuleDriver } from "../system/decorators/rules/index.js";
import { InterviewManagedDriver } from "../system/decorators/managed/interviewmanaged.js";
import { ParticipantSummaryDriver } from "../system/summary/participantsummary.js";
import { SummaryDbDriver } from "../system/summary/driver.js";
import { UserAutzDriver } from "../system/decorators/authorization/userautz.js";
import { ParticipantBoxDriver } from "../system/decorators/box/participantbox.js";
import { InterviewBoxDriver } from "../system/decorators/box/interviewbox.js";
import { ParticipantBox } from "../system/decorators/box/box.js";
import { Notifier } from "./utils/notifier.js";
import { UserManagedDriver } from "../system/decorators/managed/usermanaged.js";
import { KpiGenericDriver, IKpiDriver } from "../drivers/kpi.js";
import {
  IInterviewDeleteDriver,
  InterviewMixinDriver,
} from "../drivers/interview.js";
import { ParticipantMixinDriver } from "../drivers/participant.js";
import { InterviewAutzDriver } from "../system/decorators/authorization/index.js";
import { ParticipantCacheDriver } from "../system/decorators/cache/participantcache.js";
import { InterviewNotificationDriver } from "../system/decorators/notification/interviewnotification.js";
import { UserRoleDriver } from "../system/decorators/authorization/userrole.js";
import { SurveyAutzDriver } from "../system/decorators/authorization/surveyautz.js";
import { SampleAutzDriver } from "../system/decorators/authorization/sampleautz.js";
import { ParticipantAutzDriver } from "../system/decorators/authorization/participantautz.js";
import { SummaryAutzDriver } from "../system/decorators/authorization/summaryautz.js";
import { AuditAutzDriver } from "../system/decorators/authorization/auditautz.js";
import { DocumentAutzDriver } from "../system/decorators/authorization/documentautz.js";

export class ServerDrivers implements IDrivers {
  surveyDriver: ISurveyDriver;
  sampleDriver: ISampleDriver;
  participantDriver: IParticipantDriver & IParticipantDeleteDriver;
  interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
  summaryDriver: ISummaryDriver;
  auditDriver: IAuditDriver;
  userDriver: IUserDriver;
  documentDriver: IDocumentDriver;
  kpiDriver: IKpiDriver;

  constructor(client: Knex, userid: string) {
    const store = new Store(client);

    const sampleCache = Builder.decorate(SampleStoreDriver, store)
      .withLogging()
      .with(SampleCacheDriver)
      .withLogging();

    const userDriver = Builder.decorate(UserTruenorthDriver, client)
      .withLogging()
      .with(UserRoleDriver, sampleCache.get())
      .withLogging()
      .with(UserManagedDriver, client);

    this.userDriver = userDriver.with(UserAutzDriver, userid).get();

    const notifier = new Notifier(userDriver.get(), userid);

    this.sampleDriver = sampleCache
      .with(SampleAutzDriver, userDriver.get(), userid)
      .withLogging()
      .get();

    this.surveyDriver = Builder.decorate(SurveyStoreDriver, store)
      .withLogging()
      .with(SurveyReconciliationDriver)
      .withLogging()
      .with(SurveyCacheDriver)
      .withLogging()
      .with(SurveyAutzDriver, userDriver.get(), userid)
      .withLogging()
      .get();

    const participantStore = Builder.decorate(ParticipantStoreDriver, store);

    const participantReconcil = participantStore
      .withLogging()
      .with(ParticipantReconciliationDriver);

    const participantSummary = participantReconcil
      .withLogging()
      .with(ParticipantMixinDriver, participantStore.get())
      .withLogging()
      .with(ParticipantCacheDriver, this.sampleDriver)
      .withLogging()
      .with(ParticipantAuditDriver, client, userid)
      .withLogging()
      .with(ParticipantSummaryDriver, client);

    const box = new ParticipantBox(
      participantReconcil.get(),
      userDriver.get(),
      userid
    );

    this.participantDriver = participantSummary
      .withLogging()
      .with(ParticipantBoxDriver, box)
      .withLogging()
      .with(ParticipantMixinDriver, participantSummary.get())
      .withLogging()
      .with(ParticipantAutzDriver, userDriver.get(), userid)
      .withLogging()
      .get();

    const interviewStore = Builder.decorate(InterviewStoreDriver, store)
      .withLogging()
      .with(InterviewAuditDriver, client, userid);

    const interviewRule = interviewStore
      .withLogging()
      .with(InterviewManagedDriver)
      .withLogging()
      .with(InterviewMixinDriver, interviewStore.get())
      .withLogging()
      .with(
        InterviewRuleDriver,
        this.participantDriver,
        ParticipantCacheDriver
      );

    this.interviewDriver = interviewRule
      .withLogging()
      .with(InterviewNotificationDriver, userDriver.get(), notifier)
      .withLogging()
      .with(InterviewBoxDriver, box)
      .withLogging()
      .with(InterviewMixinDriver, interviewRule.get())
      .withLogging()
      .with(InterviewAutzDriver, userDriver.get(), userid)
      .withLogging()
      .get();

    this.summaryDriver = Builder.decorate(SummaryDbDriver, client)
      .withLogging()
      .with(SummaryAutzDriver, this.sampleDriver, userDriver.get(), userid)
      .withLogging()
      .get();

    this.auditDriver = Builder.decorate(AuditDbDriver, client)
      .withLogging()
      .with(AuditAutzDriver, this.sampleDriver, userDriver.get(), userid)
      .withLogging()
      .get();

    this.documentDriver = Builder.decorate(DocumentStoreDriver, store)
      .withLogging()
      .with(DocumentAutzDriver, userDriver.get(), userid)
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
