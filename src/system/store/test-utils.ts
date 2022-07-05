import {
  IAuditDriver,
  IDrivers,
  IKpiDriver,
  ISummaryDriver,
  IUserDriver,
} from "../../drivers/index.js";
import { Store } from "./../store/index.js";
import { InterviewStoreDriver } from "./interviewstore.js";
import { ParticipantStoreDriver } from "./participantstore.js";
import { SampleStoreDriver } from "./samplestore.js";
import { SurveyStoreDriver } from "./surveystore.js";
import { DocumentStoreDriver } from "./documentstore.js";

export function buildDrivers(store: Store): IDrivers {
  return {
    surveyDriver: new SurveyStoreDriver(store),
    sampleDriver: new SampleStoreDriver(store),
    participantDriver: new ParticipantStoreDriver(store),
    interviewDriver: new InterviewStoreDriver(store),
    summaryDriver: <ISummaryDriver>{},
    auditDriver: <IAuditDriver>{},
    userDriver: <IUserDriver>{},
    documentDriver: new DocumentStoreDriver(store),
    kpiDriver: <IKpiDriver>{},
  };
}
