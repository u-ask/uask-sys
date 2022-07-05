import { Knex } from "knex";
import { Page, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { upsert } from "./upsert.js";

export type PageRow = {
  name: string;
  mandatory: boolean;
  exportConfig?: string;
  surveyId: number;
  id: number;
  version: number;
};

export class PageDriver {
  get table(): Knex.QueryBuilder<PageRow> {
    return this.client.table<PageRow>("pages");
  }
  constructor(private client: Knex) {}

  async save(survey: Survey, page: Page, position: number): Promise<Keys> {
    this.eagerSupport = undefined;
    const row = {
      id: page.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      name: JSON.stringify(page.name),
      surveyId: survey.__keys__?.id,
      exportConfig: page.exportConfig
        ? JSON.stringify(page.exportConfig)
        : undefined,
      position,
    };
    return upsert(this, row, ["id"]);
  }

  async getRowByPageSet(
    pageSetKey: {
      [key: string]: number;
    },
    mandatoryOnly: boolean
  ): Promise<(Keys & PageRow)[]> {
    const rows = await this.client
      .table("pageSetPages")
      .where("pageSetId", pageSetKey.id)
      .innerJoin("pages", "pageSetPages.pageId", "pages.id")
      .where("pageSetPages.version", this.client.ref("pages.version"))
      .orderBy("pageSetPages.position");
    return this.mapRows(rows, mandatoryOnly);
  }

  async getRowBySurvey(
    surveyKey: KeyMap,
    mandatoryOnly: boolean
  ): Promise<(Keys & PageRow)[]> {
    const support = this.loadSupport({ surveyId: surveyKey.id });
    const rows = (await support.getAll()) as (KeyMap & PageRow)[];
    return this.mapRows(rows, mandatoryOnly);
  }

  private mapRows<T>(
    rows: (T & KeyMap)[],
    mandatoryOnly: boolean
  ): (T & Keys)[] {
    return rows
      .filter(r => (mandatoryOnly ? r.mandatory : r))
      .map(r =>
        Object.assign(r, {
          __keys__: { id: r.id, version: r.version, surveyId: r.surveyId },
        })
      );
  }

  async getRowById(key: { [key: string]: number }): Promise<Keys & PageRow> {
    const support = this.loadSupport(key);
    const row = (await support.get(key.id)) as Keys & PageRow;
    return Object.assign(row, {
      __keys__: { id: row.id, version: row.version, surveyId: row.surveyId },
    });
  }

  private eagerSupport: EagerSupport | undefined;
  private loadSupport(key: KeyMap) {
    if (
      this.eagerSupport == undefined ||
      this.eagerSupport.surveyId != key.surveyId
    ) {
      this.eagerSupport = new EagerSupport(key.surveyId, this.client);
    }
    return this.eagerSupport;
  }
}

class EagerSupport {
  private readonly rows: Promise<PageRow[]>;
  constructor(readonly surveyId: number, client: Knex) {
    this.rows = client
      .table("pages")
      .where("surveyId", surveyId)
      .orderBy("position")
      .then(r => [...r]);
  }

  async get(id: number) {
    return (await this.rows).find(r => r.id == id);
  }

  async getAll() {
    return await this.rows;
  }
}
