import { Knex } from "knex";
import { Survey, Sample } from "uask-dom";
import {
  ISummaryDriver,
  Json,
  ParticipantGetOptions,
  ParticipantSummary,
} from "../../drivers/index.js";

declare module "./ParticipantSummary" {
  export interface ParticipantSummary {
    syncVersion: number;
  }
}

export class SummaryDbDriver implements ISummaryDriver {
  constructor(private readonly client: Knex) {}

  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    options?: ParticipantGetOptions
  ): Promise<ParticipantSummary[]>;
  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    select?: (keyof ParticipantSummary)[],
    options?: ParticipantGetOptions
  ): Promise<Partial<ParticipantSummary>[]>;
  async getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    x?: (keyof ParticipantSummary)[] | ParticipantGetOptions,
    options?: ParticipantGetOptions
  ): Promise<Partial<ParticipantSummary>[]> {
    const select = Array.isArray(x) ? x : [];
    options = Array.isArray(x) ? options : x;
    const rows = await this.getRows(survey, sample, select, options);
    return rows.map(s => {
      const { currentInterview, pins, kpis, alerts, ...summary } = s;
      return {
        ...summary,
        ...(currentInterview
          ? { currentInterview: parseInterview(currentInterview) }
          : {}),
        ...(pins ? { pins: JSON.parse(pins) as Json } : {}),
        ...(kpis ? { kpis: JSON.parse(kpis) as Json } : {}),
        ...(alerts ? { alerts: JSON.parse(alerts) as Json } : {}),
      };
    });
  }

  private async getRows(
    survey: Survey,
    sample: Sample | Sample[] | undefined,
    select:
      | (
          | keyof ParticipantSummary
          | "completedInterviewCount"
          | "inclusionDate"
        )[],
    options: Partial<ParticipantGetOptions> = {}
  ) {
    const opt = { ...new ParticipantGetOptions(), ...options };
    let table = this.client
      .table("summaries")
      .where("surveyId", survey.__keys__?.id);
    table = opt.offset !== 0 ? table.offset(opt.offset) : table;
    table = opt.limit !== Infinity ? table.limit(opt.limit) : table;
    const projection = sample
      ? Array.isArray(sample)
        ? table.whereIn(
            "sampleId",
            sample.map(s => s.__keys__?.id as number)
          )
        : table.where("sampleId", sample.__keys__?.id)
      : table;
    return await projection
      .select(select.length == 0 ? "*" : select)
      .orderBy("participantCode");
  }

  async getOutOfSync(): Promise<Record<string, string[]>> {
    const rows = await this.client
      .table("summaries")
      .innerJoin("surveys", "summaries.surveyId", "surveys.id")
      .where("summaries.syncVersion", "!=", this.client.raw("surveys.version"))
      .orWhereNull("summaries.syncVersion")
      .select("surveys.name", "summaries.participantCode");
    return rows.reduce(
      (a, r) => ({
        ...a,
        [r.name]: a[r.name]
          ? [...a[r.name], r.participantCode]
          : [r.participantCode],
      }),
      {}
    );
  }
}

function parseInterview(str: string): Json {
  const interview = JSON.parse(str);
  if (interview.date) interview.date = new Date(interview.date);
  return interview;
}
