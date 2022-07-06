import { Survey, Sample, Participant } from "uask-dom";
import { IParticipantDriver } from "../../../drivers/index.js";
import { ParticipantBox } from "./box.js";

export class ParticipantBoxDriver implements IParticipantDriver {
  constructor(
    private readonly driver: IParticipantDriver,
    private readonly box: ParticipantBox
  ) {}

  async getAll(
    survey: Survey,
    samples: Sample[],
    options = {}
  ): Promise<Participant[]> {
    const participants = await this.driver.getAll(survey, samples, options);
    const secure = await this.box.needBox(survey);
    if (secure)
      return participants.map(participant => secure.box(survey, participant));
    return participants;
  }

  async getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    const participant = await this.driver.getByParticipantCode(
      survey,
      samples,
      participantCode
    );
    const secure = await this.box.needBox(survey);
    if (secure) return secure.box(survey, participant, { memoize: true });
    return participant;
  }

  async getBySample(
    survey: Survey,
    sample: Sample,
    options = {}
  ): Promise<Participant[]> {
    const participants = await this.driver.getBySample(survey, sample, options);
    const secure = await this.box.needBox(survey);
    if (secure)
      return participants.map(participant => secure.box(survey, participant));
    return participants;
  }

  async save(
    survey: Survey,
    participant: Participant
  ): Promise<Partial<Participant>> {
    const boxInstance = participant.participantCode
      ? await this.box.needBox(survey)
      : false;
    if (boxInstance) {
      const restored = await boxInstance.unbox(survey, participant);
      return await this.driver.save(survey, restored);
    }
    return await this.driver.save(survey, participant);
  }
}
