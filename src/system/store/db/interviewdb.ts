import { Knex } from "knex";
import { Interview, mlstring, Participant, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { upsert } from "./upsert.js";

export type InterviewRow = {
  surveyId: number;
  participantId: number;
  pageSetId: number;
  pageSetType: mlstring;
  id: number;
  nonce: number;
  lastInput: Date;
  options: string;
};

export class InterviewDriver {
  get table(): Knex.QueryBuilder<InterviewRow> {
    return this.client.table<InterviewRow>("interviews");
  }

  constructor(private client: Knex) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    position: number
  ): Promise<Keys> {
    const row = {
      id: interview.__keys__?.id,
      pageSetId: interview.pageSet.__keys__?.id,
      surveyId: survey.__keys__?.id,
      participantId: participant.__keys__?.id,
      nonce: interview.nonce,
      lastInput: interview.lastInput,
      position,
    };
    return upsert(this, row, ["id"]);
  }

  async delete(surveyKeys: KeyMap, interviewKeys: KeyMap[]): Promise<void> {
    await this.client
      .table("interviews")
      .whereIn(
        "id",
        interviewKeys.map(k => k.id)
      )
      .delete();
  }

  async getRowByParticipant(
    surveyKeys: KeyMap,
    participantKey: KeyMap
  ): Promise<(Keys & InterviewRow)[]> {
    const rows = await this.client
      .table("interviews")
      .where("participantId", participantKey.id)
      .innerJoin("surveys", "interviews.surveyId", "surveys.id")
      .innerJoin("pageSets", "interviews.pageSetId", "pageSets.id")
      .where("pageSets.version", ">=", surveyKeys.version)
      .select("interviews.*", "surveys.options", "pageSets.type")
      .orderBy("interviews.position");
    return rows.map(r =>
      Object.assign(r, {
        pageSetType: JSON.parse(r.type),
        __keys__: { id: r.id, surveyId: r.surveyId, participantId: r.participantId },
      })
    );
  }
}
