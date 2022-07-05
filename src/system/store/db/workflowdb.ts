import { Knex } from "knex";
import { IDomainCollection, PageSet, Survey, Workflow } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { upsert, upsertChilds } from "./upsert.js";
import { WorkflowTypeDriver, WorkflowTypeRow } from "./workflowtypedb.js";

export type WorkflowRow = {
  name: string;
  notifications: string;
  position: number;
  surveyId: number;
  id: number;
};

export type WorkflowPageSetRow = {
  surveyId: number;
  pageSetId: number;
  workflowId: number;
  workflowTypeId: number;
  position: number;
  type: string;
};

export class WorkflowDriver {
  constructor(private client: Knex) {}

  async save(
    survey: Survey,
    workflow: Workflow,
    position: number
  ): Promise<Keys> {
    const row = {
      id: workflow.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      name: workflow.name,
      notifications: JSON.stringify(workflow.notifications),
      position: position,
      surveyId: survey.__keys__?.id,
    };
    const keyInfo = await upsert(this, row, ["id"]);

    const workflowTypeDriver = new WorkflowTypeDriver(this.client);
    const infoType = await workflowTypeDriver.getByType("info");
    const infoRow = workflow.info
      ? this.getChildRow(survey, workflow, keyInfo, workflow.info, infoType, 0)
      : undefined;

    const oneType = await workflowTypeDriver.getByType("single");
    const oneRows = this.getChildRows(
      survey,
      workflow,
      keyInfo,
      workflow.single,
      oneType
    );

    const manyType = await workflowTypeDriver.getByType("many");
    const manyRows = this.getChildRows(
      survey,
      workflow,
      keyInfo,
      workflow.many,
      manyType
    );

    const startsWithType = await workflowTypeDriver.getByType("sequence");
    const startsWithRows = this.getChildRows(
      survey,
      workflow,
      keyInfo,
      workflow.sequence,
      startsWithType
    );

    const endsWithType = await workflowTypeDriver.getByType("stop");
    const endsWithRows = this.getChildRows(
      survey,
      workflow,
      keyInfo,
      workflow.stop,
      endsWithType
    );

    await upsertChilds(
      this,
      infoRow
        ? [infoRow, ...oneRows, ...manyRows, ...startsWithRows, ...endsWithRows]
        : [...oneRows, ...manyRows, ...startsWithRows, ...endsWithRows],
      ["surveyId", "pageSetId", "workflowId", "workflowTypeId"]
    );

    return keyInfo;
  }

  private getChildRows(
    survey: Survey,
    workflow: Workflow,
    keyInfo: Keys,
    pageSets: IDomainCollection<PageSet>,
    type: WorkflowTypeRow
  ) {
    return pageSets.map((p, i) =>
      this.getChildRow(survey, workflow, keyInfo, p, type, i)
    );
  }

  private getChildRow(
    survey: Survey,
    workflow: Workflow,
    keyInfo: Keys,
    pageSet: PageSet,
    type: WorkflowTypeRow,
    i: number
  ) {
    return {
      surveyId: survey.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      pageSetId: pageSet.__keys__?.id,
      workflowId: keyInfo.__keys__?.id,
      workflowTypeId: type.id,
      position: i,
    };
  }

  get childTable(): Knex.QueryBuilder<WorkflowPageSetRow> {
    return this.client.table<WorkflowPageSetRow>("workflowPageSets");
  }

  get table(): Knex.QueryBuilder<WorkflowRow> {
    return this.client.table<WorkflowRow>("workflows");
  }

  async getRowsBySurvey(surveyKey: KeyMap): Promise<(Keys & WorkflowRow)[]> {
    const rows = await this.client
      .table("workflows")
      .where("surveyId", surveyKey.id)
      .orderBy("position");
    return rows.map(r =>
      Object.assign(r, {
        __keys__: {
          id: r.id,
          version: r.version,
          surveyId: r.surveyId,
        },
      })
    );
  }
}
