import { Participant, Sample, Survey } from "uask-dom";

export class ParticipantGetOptions {
  offset = 0;
  limit = Infinity;
  deleted = false;
}

interface IParticipantDriver {
  getAll(
    survey: Survey,
    samples: Sample[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]>;
  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant>;
  getBySample(
    survey: Survey,
    sample: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]>;
  save(survey: Survey, participant: Participant): Promise<Partial<Participant>>;
}

export interface IParticipantDeleteDriver {
  delete(survey: Survey, participant: Participant): Promise<void>;
}

export class ParticipantMixinDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  constructor(
    private readonly driver: IParticipantDriver,
    private readonly deleteDriver: IParticipantDeleteDriver
  ) {}

  getAll(
    survey: Survey,
    samples: Sample[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]> {
    return this.driver.getAll(survey, samples, options);
  }

  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    return this.driver.getByParticipantCode(survey, samples, participantCode);
  }

  getBySample(
    survey: Survey,
    sample: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]> {
    return this.driver.getBySample(survey, sample, options);
  }

  save(survey: Survey, participant: Participant): Promise<Partial<Participant>> {
    return this.driver.save(survey, participant);
  }

  delete(survey: Survey, participant: Participant): Promise<void> {
    return this.deleteDriver.delete(survey, participant);
  }
}

export { IParticipantDriver };
