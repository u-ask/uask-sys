import { Knex } from "knex";
import { Sample, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { upsert } from "./upsert.js";

export type SampleRow = Sample & { id: number; surveyId: number };

export class SampleDriver {
  constructor(private client: Knex) {}

  get table(): Knex.QueryBuilder<SampleRow> {
    return this.client.table<SampleRow>("samples");
  }

  async save(survey: Survey, sample: Sample): Promise<Keys> {
    this.eagerSupport = undefined;
    if (!survey.__keys__) throw "missing survey key";
    const surveyId = survey.__keys__.id;
    const row = {
      id: sample.__keys__?.id,
      sampleCode: sample.sampleCode,
      name: sample.name,
      address: sample.address,
      frozen: sample.frozen,
      surveyId,
    };
    return await upsert(this, row, ["id"]);
  }

  private eagerSupport: EagerSupport | undefined;
  async getRowById(key: KeyMap): Promise<Keys & SampleRow> {
    if (
      this.eagerSupport == undefined ||
      this.eagerSupport.surveyId != key.surveyId
    ) {
      this.eagerSupport = new EagerSupport(key.surveyId, this.client);
    }
    const row = (await this.eagerSupport.get(key.id)) as Keys & SampleRow;
    return Object.assign(row, { __keys__: { id: row.id } });
  }

  async getRowsBySurvey(surveyKey: KeyMap): Promise<(Keys & SampleRow)[]> {
    const rows = await this.client
      .table("samples")
      .where("surveyId", surveyKey.id)
      .orderBy("samples.sampleCode");
    return rows.map(r =>
      Object.assign(r, { __keys__: { id: r.id, surveyId: r.surveyId } })
    );
  }

  async getAll(survey: Survey): Promise<(Keys & SampleRow)[]> {
    const rows = await this.client
      .table<SampleRow>("samples")
      .where("surveyId", survey.__keys__?.id)
      .orderBy("samples.sampleCode");
    return rows.map(r =>
      Object.assign(r, { __keys__: { id: r.id, surveyId: r.surveyId } })
    );
  }

  async getRowBySampleCode(
    surveyKeys: KeyMap,
    sampleCode: string
  ): Promise<Keys & SampleRow> {
    const row = await this.client
      .table("samples")
      .where("sampleCode", sampleCode)
      .where("surveyId", surveyKeys.id)
      .first();
    return Object.assign(row, {
      __keys__: { id: row.id, surveyId: row.surveyId },
    });
  }
}

class EagerSupport {
  private readonly rows: Promise<Map<number, SampleRow>>;
  constructor(readonly surveyId: number, client: Knex) {
    this.rows = client
      .table("samples")
      .where("surveyId", surveyId)
      .then(result => new Map(result.map(r => [r.id, r])));
  }

  async get(id: number) {
    return (await this.rows).get(id);
  }
}
