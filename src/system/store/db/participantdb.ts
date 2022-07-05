import { Knex } from "knex";
import { Participant, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { upsert } from "./upsert.js";
import { KeyMap } from "../../aspect/keys.js";
import { ParticipantGetOptions } from "../../../drivers/participant.js";

export type ParticipantRow = Participant & {
  sampleId: number;
  surveyId: number;
  id: number;
  __deleted__: boolean;
};

export class ParticipantDriver {
  constructor(private client: Knex) {}

  async save(survey: Survey, participant: Participant): Promise<Keys> {
    const row = {
      id: participant.__keys__?.id,
      sampleId: participant.sample.__keys__?.id,
      surveyId: survey.__keys__?.id,
      participantCode: participant.participantCode,
    };
    return await upsert(this, row, ["id"]);
  }

  async delete(surveyKeys: KeyMap, participantKeys: KeyMap): Promise<void> {
    await this.table.where("id", participantKeys.id).update("__deleted__", true);
  }

  get table(): Knex.QueryBuilder<ParticipantRow> {
    return this.client.table<ParticipantRow>("participants");
  }

  async getRowBySurvey(
    surveyKey: KeyMap,
    options: Partial<ParticipantGetOptions> = {}
  ): Promise<(Keys & ParticipantRow)[]> {
    const query = this.table
      .where("surveyId", surveyKey.id)
      .where("__deleted__", false)
      .orderBy("participantCode");
    return await this.fetchRows(query, options);
  }

  async getRowsBySample(
    surveyKey: KeyMap,
    key: KeyMap,
    options: Partial<ParticipantGetOptions> = {}
  ): Promise<(Keys & ParticipantRow)[]> {
    const query = this.client
      .table<ParticipantRow>("participants")
      .where("surveyId", surveyKey.id)
      .where("sampleId", key.id)
      .where("__deleted__", false)
      .orderBy("participantCode");
    return await this.fetchRows(query, options);
  }

  private async fetchRows(
    query: Knex.QueryBuilder,
    options: Partial<ParticipantGetOptions>
  ) {
    const opt = { ...new ParticipantGetOptions(), ...options };
    query = opt.offset !== 0 ? query.offset(opt.offset) : query;
    query = opt.limit !== Infinity ? query.limit(opt.limit) : query;
    const rows = await query;
    return rows.map((r: ParticipantRow) =>
      Object.assign(r, { __keys__: { id: r.id, surveyId: r.surveyId } })
    );
  }

  async getRowByCode(
    surveyKey: KeyMap,
    participantCode: string,
    options: Partial<ParticipantGetOptions> = {}
  ): Promise<Keys & ParticipantRow> {
    const row = this.client
      .table("participants")
      .where("surveyId", surveyKey.id)
      .where("participantCode", participantCode);
    const rowDel = options.deleted ? row : row.where("__deleted__", false);
    const rowFirst = await rowDel.first();
    return rowFirst
      ? Object.assign(rowFirst, {
          __keys__: { id: rowFirst.id, surveyId: rowFirst.surveyId },
        })
      : {};
  }
}
