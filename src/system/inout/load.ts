import { Knex } from "knex";

import debug from "debug";
const dlog = debug("uask:loader");

import {
  DomainCollection,
  execute,
  IDomainCollection,
  Participant,
  ParticipantBuilder,
  Sample,
  Survey,
  SurveyBuilder,
} from "uask-dom";
import { Dump } from "./dump.js";

import { surveyDeserialize, participantDeserialize } from "../json/index.js";
import {
  Store,
  SurveyStoreDriver,
  SampleStoreDriver,
  ParticipantStoreDriver,
  InterviewStoreDriver,
} from "../store/index.js";
import { ParticipantSummaryDriver } from "../summary/participantsummary.js";
import { SurveyReconciliationDriver } from "../decorators/reconciliation/index.js";
import { InterviewManagedDriver } from "../decorators/managed/interviewmanaged.js";
import {
  InterviewAuditDriver,
  ParticipantAuditDriver,
} from "../audit/index.js";

export type SeedDump = Dump & { timestamp?: number };

export async function load(
  client: Knex,
  data: SeedDump | string
): Promise<void> {
  const dataStruct =
    typeof data == "string" ? (JSON.parse(data) as SeedDump) : data;
  const survey = buildSurvey(dataStruct);
  const seed = await getSeedInfo(client, survey.name);
  if (canSeed(seed, dataStruct)) {
    await clearDatabase(client, seed?.id);
    const store = new Store(client);
    await loadSurvey(store, survey);
    const samples = buildSamples(dataStruct);
    await loadSamples(store, survey, samples);
    const ptotal = dataStruct.participants.length;
    const itotal = dataStruct.participants.reduce(
      (c, p) => c + p.interviews.length,
      0
    );
    const participants = buildParticipants(dataStruct, survey, samples);
    await loadParticipants(
      store,
      survey,
      samples,
      participants,
      ptotal,
      itotal
    );
    const { id } = (await getSeedInfo(client, survey.name)) as Seed;
    await saveSeedInfo(client, id, dataStruct?.timestamp);
  }
}

function canSeed(seed: Seed | undefined, data: SeedDump) {
  return (
    seed?.timestamp == undefined ||
    (data.timestamp != undefined && data.timestamp > seed.timestamp)
  );
}

function buildSurvey(data: Dump) {
  const surveyBuilder = new SurveyBuilder();
  surveyDeserialize(surveyBuilder, data.survey);
  return surveyBuilder.build();
}

export async function loadSurvey(store: Store, survey: Survey): Promise<void> {
  dlog("starting survey...");
  const surveyKey = await new SurveyReconciliationDriver(
    new SurveyStoreDriver(store)
  ).save(survey);
  survey.update(surveyKey);
}

function buildSamples(data: Dump) {
  return DomainCollection(
    ...data.samples.map(s => new Sample(s.sampleCode, s))
  );
}

async function loadSamples(
  store: Store,
  survey: Survey,
  samples: Iterable<Sample>
) {
  dlog("starting samples...");
  for (const sample of samples) {
    await loadSample(store, survey, sample);
  }
}

export async function loadSample(
  store: Store,
  survey: Survey,
  sample: Sample
): Promise<void> {
  const sampleKey = await new SampleStoreDriver(store).save(survey, sample);
  sample.update(sampleKey);
}

function* buildParticipants(
  data: Dump,
  survey: Survey,
  samples: IDomainCollection<Sample>
) {
  for (const participant of data.participants) {
    const participantBuilder = new ParticipantBuilder(survey, samples);
    participantDeserialize(participantBuilder, participant);
    yield participantBuilder.build();
  }
}

async function loadParticipants(
  store: Store,
  survey: Survey,
  samples: IDomainCollection<Sample>,
  participants: Iterable<Participant>,
  ptotal: number,
  itotal: number
) {
  dlog("starting participants...");
  let pcount = 0;
  let icount = 0;
  for (const participant of participants) {
    pcount += 1;
    icount += participant.interviews.length;
    await loadParticipant(store, survey, participant);
    dlog(
      `loaded: ${pcount}/${ptotal} participants, ${icount}/${itotal} interviews`
    );
  }
}

export async function loadParticipant(
  store: Store,
  survey: Survey,
  participant: Participant
): Promise<void> {
  const driver = new ParticipantSummaryDriver(
    new ParticipantAuditDriver(
      new ParticipantStoreDriver(store),
      store.client,
      "system"
    ),
    store.client
  );
  const participantKey = await driver.save(survey, participant);
  participant.update(participantKey);
  const synchronized = execute(survey.rules, participant);
  for (let i = 0; i < synchronized.interviews.length; i++) {
    const interview = synchronized.interviews[i];
    const interviewKey = await new InterviewManagedDriver(
      new InterviewAuditDriver(
        new InterviewStoreDriver(store),
        store.client,
        "system"
      )
    ).save(survey, synchronized, interview);
    interview.update(interviewKey);
  }
}

export async function clearDatabase(
  client: Knex,
  surveyId: number | undefined
): Promise<void> {
  if (typeof surveyId != "undefined") {
    await client.table("seeds").where("surveyId", surveyId).delete();
    await clearParticipants(client, surveyId);
    await clearSamples(client, surveyId);
    await clearSurvey(client, surveyId);
  }
}

export async function clearSurvey(
  client: Knex,
  surveyId: number | undefined
): Promise<void> {
  await client.table("documents").where({ surveyId }).del();
  await client.table("workflowPageSets").where({ surveyId }).del();
  await client.table("workflows").where({ surveyId }).del();
  await client.table("rulePageItems").where({ surveyId }).del();
  await client.table("rules").where({ surveyId }).del();
  await client.table("includes").where({ surveyId }).del();
  await client.table("pageItems").where({ surveyId }).del();
  await client.table("pageSetPages").where({ surveyId }).del();
  await client.table("pageSets").where({ surveyId }).del();
  await client.table("pages").where({ surveyId }).del();
  await client.table("surveys").where({ id: surveyId }).del();
}

export async function clearSamples(
  client: Knex,
  surveyId: number | undefined
): Promise<void> {
  await client.table("samples").where({ surveyId }).del();
}

export async function clearParticipants(
  client: Knex,
  surveyId: number | undefined
): Promise<void> {
  await client.table("audit_participants").where({ surveyId }).del();
  await client.table("summaries").where({ surveyId }).del();
  await client.table("interviewItems").where({ surveyId }).del();
  await client.table("interviews").where({ surveyId }).del();
  await client.table("participants").where({ surveyId }).del();
}

export type Seed = { id: number; timestamp?: number };

export function getSeedInfo(
  client: Knex,
  name: string
): Promise<Seed | undefined> {
  return client
    .table("surveys")
    .where({ name })
    .leftJoin("seeds", "seeds.surveyId", "surveys.id")
    .select<{ id: number; timestamp: number | undefined }[]>("id", "timestamp")
    .first();
}

async function saveSeedInfo(client: Knex, id: number, timestamp?: number) {
  if (timestamp)
    await client.table("seeds").insert({ timestamp: timestamp, surveyId: id });
}
