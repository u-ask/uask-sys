import { Knex } from "knex";
import { Survey, Sample, Participant } from "uask-dom";
import {
  IParticipantDeleteDriver,
  IParticipantDriver,
  ParticipantSummary,
} from "../../drivers/index.js";
import { Keys } from "../aspect/index.js";

export class ParticipantSummaryDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  constructor(
    private driver: IParticipantDriver & IParticipantDeleteDriver,
    private readonly client: Knex
  ) {}

  getAll(survey: Survey, samples: Sample[], options = {}): Promise<Participant[]> {
    return this.driver.getAll(survey, samples, options);
  }

  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    return this.driver.getByParticipantCode(survey, samples, participantCode);
  }

  getBySample(survey: Survey, sample: Sample, options = {}): Promise<Participant[]> {
    return this.driver.getBySample(survey, sample, options);
  }

  async save(survey: Survey, participant: Participant): Promise<Partial<Participant>> {
    const keys = await this.driver.save(survey, participant);
    await this.saveSummary(this.client, survey, participant, keys)
    return keys;
  }

  private saveSummary(
    client: Knex,
    survey: Survey,
    participant: Participant,
    keys: Keys
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentInterview, pins, kpis, alerts, ...summary } =
      new ParticipantSummary(survey, participant, survey.mainWorkflow);
    const completedInterviewCount = participant.interviews.filter(
      i => i.status == "fulfilled"
    ).length;
    return client
      .table("summaries")
      .insert({
        ...summary,
        inclusionDate: participant.inclusionDate,
        currentInterview: JSON.stringify(currentInterview),
        pins: JSON.stringify(pins),
        kpis: JSON.stringify(kpis),
        alerts: JSON.stringify(alerts),
        completedInterviewCount,
        participantId: keys.__keys__?.id,
        sampleId: participant.sample.__keys__?.id,
        surveyId: survey.__keys__?.id,
        syncVersion: survey.__keys__?.version,
      })
      .onConflict("participantId")
      .merge();
  }

  async delete(survey: Survey, participant: Participant): Promise<void> {
    await this.driver.delete(survey, participant);
    await this.client
      .table("summaries")
      .where("participantId", participant.__keys__?.id)
      .delete();
  }
}
