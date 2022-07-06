import { Participant, Sample, Survey } from "uask-dom";
import {
  IParticipantDeleteDriver,
  IParticipantDriver,
  IUserDriver,
  ParticipantGetOptions,
} from "../../../drivers/index.js";
import {
  ParticipantAuthorizationManager,
  SurveyAuthorizationManager,
} from "./autz.js";

export class ParticipantAutzDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  constructor(
    readonly driver: IParticipantDriver & IParticipantDeleteDriver,
    readonly userDriver: IUserDriver,
    readonly userId: string
  ) {}

  async getAll(
    survey: Survey,
    samples: Sample[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]> {
    const am = await this.getAutz(survey, samples);
    const participants = await this.driver.getAll(survey, samples, options);
    return participants.filter(
      p =>
        am.canReadParticipant(p.participantCode) &&
        am.canReadSample(p.sample.sampleCode)
    );
  }

  async getBySample(
    survey: Survey,
    sample: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<Participant[]> {
    const am = await this.getAutz(survey, [sample]);
    if (!am.canReadSample(sample.sampleCode))
      return Promise.reject(am.canReadSampleError(sample.sampleCode));
    const participants = await this.driver.getBySample(survey, sample, options);
    return participants.filter(p => am.canReadParticipant(p.participantCode));
  }

  async getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    const am = await this.getAutz(survey, samples);
    if (!am.canReadParticipant(participantCode))
      return Promise.reject(am.canReadParticipantError(participantCode));
    const participant = await this.driver.getByParticipantCode(
      survey,
      samples,
      participantCode
    );
    if (!am.canReadSample(participant.sample.sampleCode))
      return Promise.reject(
        am.canReadSampleError(participant.sample.sampleCode)
      );
    return participant;
  }

  save(
    survey: Survey,
    participant: Participant
  ): Promise<Partial<Participant>> {
    return this.driver.save(survey, participant);
  }

  async delete(survey: Survey, participant: Participant): Promise<void> {
    const am = await this.getAutz(survey, participant);
    if (!am.canDelete()) return Promise.reject(am.canDeleteError());
    return this.driver.delete(survey, participant);
  }

  private async getAutz(
    survey: Survey,
    sample: Sample[]
  ): Promise<SurveyAuthorizationManager>;
  private async getAutz(
    survey: Survey,
    participant: Participant
  ): Promise<ParticipantAuthorizationManager>;
  private async getAutz(survey: Survey, y: Participant | Sample[]) {
    const user = await this.userDriver.getByUserId(survey, this.userId);
    return y instanceof Participant
      ? new ParticipantAuthorizationManager(survey, y, user)
      : new SurveyAuthorizationManager(survey, user);
  }
}
