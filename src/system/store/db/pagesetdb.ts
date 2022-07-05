import { Knex } from "knex";
import { PageSet, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { upsert, upsertChilds } from "./upsert.js";
import { WorkflowPageSetRow } from "./workflowdb.js";
import { KeyMap } from "../../aspect/keys.js";

export type PageSetRow = {
  type: string;
  datevar: string;
  surveyId: number;
  id: number;
  version: number;
};

type PageSetPageRow = {
  surveyId: number;
  pageSetId: number;
  pageId: number;
  mandatory: boolean;
  position: number;
};

export class PageSetDriver {
  constructor(private client: Knex) {}

  async save(survey: Survey, pageSet: PageSet, position: number): Promise<Keys> {
    const row = {
      id: pageSet.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      type: JSON.stringify(pageSet.type),
      surveyId: survey.__keys__?.id,
      datevar: JSON.stringify(pageSet.datevar),
      position,
    };
    const keyInfo = await upsert(this, row, ["id"]);

    const childRows = [
      ...pageSet.pages.map((p, i) => ({
        surveyId: survey.__keys__?.id,
        version: survey.__keys__?.version ?? 1,
        pageSetId: keyInfo.__keys__?.id,
        pageId: p.__keys__?.id,
        mandatory: !!pageSet.mandatoryPages?.some(
          m => m.__keys__?.id == p.__keys__?.id
        ),
        position: i,
      })),
    ];
    await upsertChilds(this, childRows, ["surveyId", "pageSetId", "pageId"]);

    return keyInfo;
  }

  get childTable(): Knex.QueryBuilder<PageSetPageRow> {
    return this.client.table<PageSetPageRow>("pageSetPages");
  }

  get table(): Knex.QueryBuilder<PageSetRow> {
    return this.client.table<PageSetRow>("pageSets");
  }

  async getRowBySurvey(surveyKey: KeyMap): Promise<(Keys & PageSetRow)[]> {
    const rows = await this.client
      .table("pageSets")
      .where("surveyId", surveyKey.id)
      .orderBy("position");
    return this.mapRows(rows);
  }

  async getRowByWorkflow(
    workflowKey: KeyMap
  ): Promise<(Keys & WorkflowPageSetRow)[]> {
    const rows = await this.client
      .table("workflowPageSets")
      .where("workflowId", workflowKey.id)
      .innerJoin("pageSets", "workflowPageSets.pageSetId", "pageSets.id")
      .where("workflowPageSets.version", this.client.ref("pageSets.version"))
      .orderBy("workflowPageSets.position");
    return this.mapRows(rows);
  }

  private mapRows<T>(rows: (T & KeyMap)[]): (T & Keys)[] {
    return rows.map(r =>
      Object.assign(r, {
        __keys__: { id: r.id, version: r.version, surveyId: r.surveyId },
      })
    );
  }
}
