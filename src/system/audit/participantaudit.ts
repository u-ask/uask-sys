import { Knex } from "knex";
import { Participant, Sample, Survey } from "uask-dom";
import { IParticipantDeleteDriver, IParticipantDriver } from "../../drivers/index.js";
import { makeChangeRecord } from "./payload.js";

export class ParticipantAuditDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  constructor(
    private readonly driver: IParticipantDriver & IParticipantDeleteDriver,
    private client: Knex,
    readonly userId: string
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
    const payload = makeChangeRecord(participant);
    if (payload) {
      const date = new Date();
      const row = {
        surveyId: survey.__keys__?.id,
        participantId: keys.__keys__?.id,
        payload: JSON.stringify(payload),
        operation: JSON.stringify(participant.__keys__?.id ? "update" : "create"),
        date,
        userId: this.userId,
      };
      await this.client.table("audit_participants").insert(row);
    }
    return keys;
  }

  async delete(survey: Survey, participant: Participant): Promise<void> {
    if (typeof participant.__delete__ == "undefined")
      throw "Participant suppression needs a justification";
    await this.driver.delete(survey, participant);
    const row = {
      surveyId: survey.__keys__?.id,
      participantId: participant.__keys__?.id,
      interviewId: undefined as number | undefined,
      pageItemId: undefined as number | undefined,
      payload: JSON.stringify({ __delete__: participant.__delete__ }),
      operation: JSON.stringify("delete"),
      date: new Date(),
      userId: this.userId,
    };
    await this.client.table("audit_participants").insert([row]);
  }
}
