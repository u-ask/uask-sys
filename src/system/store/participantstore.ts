import {
  DNode,
  DomainCollection,
  formatCode,
  Participant,
  ParticipantBuilder,
  ParticipantCodeStrategy,
  Sample,
  Survey,
  SurveyOptions,
} from "uask-dom";
import { IParticipantDeleteDriver, IParticipantDriver } from "../../drivers/index.js";
import { KeyMap } from "../aspect/keys.js";
import { participantDeserialize } from "../json/participantjson.js";
import { Store } from "./../store/index.js";

export class ParticipantStoreDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  constructor(private readonly store: Store) {}

  getAll(survey: Survey, samples: Sample[], options = {}): Promise<Participant[]> {
    return this.store
      .getParticipantNodes("survey", survey.__keys__ as KeyMap, undefined, options)
      .then(rows => rows.map(row => createParticipant(survey, samples, row)));
  }

  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    return this.store
      .getParticipantNodes("participantCode", survey.__keys__ as KeyMap, participantCode, {})
      .then(row => createParticipant(survey, samples, row[0]));
  }

  getBySample(survey: Survey, sample: Sample, options = {}): Promise<Participant[]> {
    return this.store
      .getParticipantNodes("sample", survey.__keys__ as KeyMap, sample.__keys__, options)
      .then(rows => rows.map(row => createParticipant(survey, [sample], row)));
  }

  async save(survey: Survey, participant: Participant): Promise<Partial<Participant>> {
    const participantCode = participant.participantCode
      ? participant.participantCode
      : await this.newParticipantCode(survey, participant.sample);
    return this.store
      .saveParticipant(survey, participant.update({ participantCode }))
      .then(k => ({ ...k, participantCode }));
  }

  delete(survey: Survey, participant: Participant): Promise<void> {
    return this.store.participantStore.delete(survey, participant);
  }

  private async newParticipantCode(survey: Survey, sample: Sample): Promise<string> {
    const strategy = {
      ...new SurveyOptions().participantCodeStrategy,
      ...survey.options.participantCodeStrategy,
    } as Required<ParticipantCodeStrategy>;
    const knownCodes = await this.store.client
      .table("participants")
      .where({
        surveyId: survey.__keys__?.id,
        ...(strategy?.bySample ? { sampleId: sample.__keys__?.id } : {}),
      })
      .select<{ participantCode: string }[]>("participantCode")
      .then(r => r.map(s => s.participantCode));
    const prefix = strategy?.bySample ? sample.sampleCode : "";
    return computeNewCode(prefix, knownCodes, strategy);
  }
}

export function computeNewCode(
  prefix: string,
  codes: string[],
  strategy: Required<ParticipantCodeStrategy>
): string {
  if (!codes.length) return prefix + "000001";
  const current = getCurrentCode(
    codes.map(c =>
      formatCode({ participantCode: c }, { participantCodeStrategy: strategy })
    )
  );
  return prefix + `000000${current + 1}`.slice(-6);
}

function getCurrentCode(codes: string[]) {
  return codes.reduce((current, code) => {
    const n = Number(code);
    return n > current ? n : current;
  }, 0);
}

function createParticipant(
  survey: Survey,
  samples: Sample[],
  node: DNode<Participant>
): Participant {
  const pb = new ParticipantBuilder(survey, DomainCollection(...samples));
  participantDeserialize(pb, node);
  return pb.build();
}
