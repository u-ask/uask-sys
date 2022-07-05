import "../../aspect/index.js";
import {
  P11_05,
  P11_05_Participants,
  P11_05_Samples,
  P11_05_Documents,
  seedExample,
} from "../../../drivers/example/index.js";
import { PageItemDriver } from "./pageitemdb.js";
import { GlobalScope, PageItem } from "uask-dom";
import { Store } from "./store.js";

export { P11_05, P11_05_Participants, P11_05_Samples, P11_05_Documents };

export async function cleanTestDb(store: Store): Promise<void> {
  seedExample();
  const globals = new GlobalScope().items.map(i => i.pageItem);
  uninitializeGlobals(globals);
  const tables = [
    "seeds",
    "audit_participants",
    "summaries",
    "interviewItems",
    "interviews",
    "participants",
    "samples",
    "workflowPageSets",
    "workflows",
    "rulePageItems",
    "rules",
    "includes",
    "pageItems",
    "pageSetPages",
    "pages",
    "pageSets",
    "documents",
    "surveys",
  ];
  const tableList = tables.map(t => `"${t}"`).join(", ");
  await store.client.raw(`truncate ${tableList} restart identity`);
}

export async function seedTestSurvey(store: Store): Promise<void> {
  await store.saveSurvey(P11_05);
}

export async function seedTestPages(store: Store): Promise<void> {
  await store.savePages(P11_05);
}

export async function seedTestPageItems(store: Store): Promise<void> {
  await store.savePageItems(P11_05);
}

export async function seedTestPageSets(store: Store): Promise<void> {
  await store.savePageSets(P11_05);
}

export async function seedTestIncludes(store: Store): Promise<void> {
  await store.saveIncludes(P11_05);
}

export async function seedTestRules(store: Store): Promise<void> {
  await store.saveRules(P11_05);
}

export async function seedTestWorkflows(store: Store): Promise<void> {
  await store.saveWorkflows(P11_05);
}

export async function seedTestSamples(store: Store): Promise<void> {
  await store.saveSamples(P11_05, P11_05_Samples);
}

export async function seedTestParticipants(store: Store): Promise<void> {
  await store.saveParticipants(P11_05, P11_05_Participants);
}

export async function seedTestInterviews(store: Store): Promise<void> {
  await store.saveInterviews(P11_05, P11_05_Participants);
}

export async function seedTestInterviewItems(store: Store): Promise<void> {
  await store.saveInterviewItems(P11_05, P11_05_Participants);
}

export async function seedTestDocuments(store: Store): Promise<void> {
  await store.saveDocuments(P11_05, P11_05_Documents);
}

function uninitializeGlobals(globals: PageItem[]) {
  globals.forEach(g => g.update({ __keys__: {}, __untrack__: true }));
  Object.assign(PageItemDriver, { globalInitializer: undefined });
}
