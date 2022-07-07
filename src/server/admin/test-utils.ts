import { Account, AccountManager } from "uask-auth/server";
import { exampleAccounts } from "uask-auth/example";
import { UserTruenorthDriver } from "./user.js";
import {
  IDrivers,
  IParticipantDriver,
  IInterviewDriver,
  ISummaryDriver,
  IAuditDriver,
  IKpiDriver,
  IParticipantDeleteDriver,
} from "../../drivers/index.js";
import { DocumentExampleDriver } from "../../drivers/example/documentex.js";
import { SampleExampleDriver } from "../../drivers/example/sampleex.js";
import { SurveyExampleDriver } from "../../drivers/example/surveyex.js";
import { IInterviewDeleteDriver } from "../../drivers/interview.js";
import { Store } from "../../system/store/../store/index.js";

export async function cleanUserTestDb(store: Store): Promise<void> {
  await store.client.table("accounts").del();
}

export async function saveUsers(store: Store): Promise<void> {
  await store.client.table("accounts").delete();
  const manager = new AccountManager(store.client);
  await Promise.all(exampleAccounts.map((a: Account) => manager.save(a)));
}

export async function seed(store: Store): Promise<void> {
  await cleanUserTestDb(store);
  await saveUsers(store);
}

export function createDrivers(store: Store): IDrivers {
  return {
    surveyDriver: new SurveyExampleDriver(),
    participantDriver: {} as IParticipantDriver & IParticipantDeleteDriver,
    sampleDriver: new SampleExampleDriver(),
    interviewDriver: {} as IInterviewDriver & IInterviewDeleteDriver,
    summaryDriver: {} as ISummaryDriver,
    auditDriver: {} as IAuditDriver,
    userDriver: new UserTruenorthDriver(store.client),
    documentDriver: new DocumentExampleDriver(),
    kpiDriver: {} as IKpiDriver,
  };
}
