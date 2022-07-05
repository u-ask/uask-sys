import { Knex } from "knex";
import { Survey } from "uask-dom";
import { UaskError } from "../../errors.js";
import { Keys } from "../../aspect/index.js";
import { upsert } from "./upsert.js";

export type SurveyRow = {
  name: string;
  options: string;
  id: number;
  version: number;
};

export class SurveyDriver {
  constructor(private client: Knex) {}

  get table(): Knex.QueryBuilder<SurveyRow> {
    return this.client.table<SurveyRow>("surveys");
  }

  save(survey: Survey): Promise<Keys> {
    const options = JSON.stringify(survey.options);
    const row = {
      id: survey.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      name: survey.name,
      options,
    };
    return upsert(this, row, ["id"]);
  }

  async getByName(name: string): Promise<Keys & SurveyRow> {
    const row = await this.client.table("surveys").where("name", name).first();
    if (row == undefined)
      return Promise.reject(
        new UaskError({ code: "NOT_FOUND", message: "unknown survey" })
      );
    return Object.assign(row, {
      __keys__: { id: row.id, version: row.version },
    });
  }
}
