import { Survey, Sample, Participant } from "uask-dom";
import { Stealer } from "stealer";
import {
  IParticipantDeleteDriver,
  IParticipantDriver,
  ISampleDriver,
  ParticipantGetOptions,
} from "../../../drivers/index.js";

type VersionedParticipant = {
  participant: Participant;
  surveyVersion: number;
};

export class ParticipantCacheDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  private static cache: Stealer<string, VersionedParticipant>;

  static _init(): void {
    ParticipantCacheDriver.cache = new Stealer<string, VersionedParticipant>({
      ttl: 120,
      unref: true,
    });
  }

  constructor(
    private readonly driver: IParticipantDriver & IParticipantDeleteDriver,
    private readonly sampleDriver: ISampleDriver
  ) {}
  getAll(
    survey: Survey,
    samples: Sample[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]> {
    return this.driver.getAll(survey, samples, options);
  }

  getBySample(
    survey: Survey,
    sample: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]> {
    return this.driver.getBySample(survey, sample, options);
  }

  async getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    const participant = ParticipantCacheDriver.get(survey, participantCode);
    if (participant) {
      const sample = await this.sampleDriver.getBySampleCode(
        survey,
        participant.sample.sampleCode
      );
      return participant.update({ sample });
    }
    const fetched = await this.driver.getByParticipantCode(
      survey,
      samples,
      participantCode
    );
    ParticipantCacheDriver.set(survey, fetched);
    return fetched;
  }

  save(survey: Survey, participant: Participant): Promise<Partial<Participant>> {
    ParticipantCacheDriver.del(survey, participant);
    return this.driver.save(survey, participant);
  }

  delete(survey: Survey, participant: Participant): Promise<void> {
    ParticipantCacheDriver.del(survey, participant);
    return this.driver.delete(survey, participant);
  }

  private static key(survey: Survey, participantCode: string) {
    return `${survey.name}::${participantCode}`;
  }

  private static get(survey: Survey, participantCode: string): Participant | undefined {
    const k = ParticipantCacheDriver.key(survey, participantCode);
    const pat = ParticipantCacheDriver.cache.get(k);
    if (pat && pat.surveyVersion != (survey.__keys__?.version ?? 0)) {
      ParticipantCacheDriver.cache.delete(k);
      return undefined;
    }
    return pat?.participant;
  }

  static set(survey: Survey, participant: Participant): void {
    const k = ParticipantCacheDriver.key(survey, participant.participantCode);
    ParticipantCacheDriver.cache.set(k, {
      participant,
      surveyVersion: survey.__keys__?.version ?? 0,
    });
  }

  private static del(survey: Survey, participant: Participant): void {
    const k = ParticipantCacheDriver.key(survey, participant.participantCode);
    ParticipantCacheDriver.cache.delete(k);
  }
}

ParticipantCacheDriver._init();
