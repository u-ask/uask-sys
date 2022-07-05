import { DNode, Participant, Sample, Survey } from "uask-dom";
import { Knex } from "knex";
import {
  ParticipantStoreDriver,
  SampleStoreDriver,
  Store,
  SurveyStoreDriver,
} from "../store/index.js";
import { surveySerialize, participantSerialize } from "../json/index.js";
import { SurveyReconciliationDriver } from "../decorators/reconciliation/index.js";

export type Dump = {
  survey: DNode<Survey>;
  samples: Sample[];
  participants: DNode<Participant>[];
};

export async function dump(
  client: Knex,
  name: string,
  setTimestamp = false
): Promise<string> {
  const store = new Store(client);
  const survey = await new SurveyReconciliationDriver(
    new SurveyStoreDriver(store)
  ).getByName(name);
  const samples = await new SampleStoreDriver(store).getAll(survey);
  const participants = await new ParticipantStoreDriver(store).getAll(survey, samples);
  return dataStringify(survey, samples, participants, setTimestamp);
}

export function dataStringify(
  survey: Survey,
  samples: Sample[],
  participants: Participant[],
  setTimestamp = false
): string {
  const dump = toDump(survey, samples, participants);
  const str = JSON.stringify({
    ...dump,
    ...(setTimestamp ? { timestamp: Date.now() } : {}),
  });
  const idPattern = jsonPropertyPattern('"__keys__":{[^}]*}');
  const changePattern = jsonPropertyPattern('"__changes__":{}');
  const re = new RegExp(`${idPattern}|${changePattern}`, "g");
  return str.replace(re, "");
}

function jsonPropertyPattern(pattern: string) {
  return `(,${pattern})|(${pattern},?)`;
}

function toDump(survey: Survey, samples: Sample[], participants: Participant[]): Dump {
  return {
    survey: surveySerialize(survey),
    samples,
    participants: participants.map(p => participantSerialize(p)),
  };
}
