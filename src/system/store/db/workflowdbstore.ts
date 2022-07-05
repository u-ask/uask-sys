import {
  DNode,
  getTranslation,
  Survey,
  SurveyOptions,
  Workflow,
} from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { WorkflowRow } from "./workflowdb.js";
import { KeyMap } from "../../aspect/keys.js";
import { Drivers } from "./store.js";

export class WorkflowStore {
  constructor(private readonly drivers: Drivers) {}

  saveAll(survey: Survey): Promise<Keys[]> {
    return Promise.all(
      survey.workflows.map(async (w, i) => {
        const keys = await this.drivers.workflowDriver.save(survey, w, i);
        w.update(keys);
        return keys;
      })
    );
  }

  async getNodes(
    options: SurveyOptions,
    keys?: KeyMap
  ): Promise<DNode<Workflow>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.workflowDriver
      .getRowsBySurvey(keys)
      .then(rows =>
        Promise.all(
          rows.map(async r => this.workflowRowToNode(keys, options, r))
        )
      );
  }

  private async workflowRowToNode(
    surveyKeys: KeyMap,
    options: SurveyOptions,
    row: Keys & WorkflowRow
  ): Promise<DNode<Workflow>> {
    const { __keys__, notifications } = row;
    if (!__keys__) throw "key missing in row";
    const pageSets = await this.drivers.pageSetDriver
      .getRowByWorkflow(__keys__)
      .then(rows =>
        rows.map(row => {
          const name = getTranslation(
            JSON.parse(row.type),
            "__code__",
            options.defaultLang
          ) as string;
          return { ...row, name };
        })
      );
    const typeToPageSets = await Promise.all(
      pageSets.map(async row => {
        const type = await this.drivers.workflowTypeDriver
          .getById(row.workflowTypeId)
          .then(r => r.type);
        return { ...row, type };
      })
    ).then(rows => this.groupByWorkflowType(rows));
    const infoType = typeToPageSets.get("info")?.[0];
    return {
      __keys__,
      name: row.name,
      ...(infoType ? { infoType } : {}),
      singleTypes: typeToPageSets.get("single") ?? [],
      manyTypes: typeToPageSets.get("many") ?? [],
      sequenceTypes: typeToPageSets.get("sequence") ?? [],
      stopTypes: typeToPageSets.get("stop") ?? [],
      notifications: JSON.parse(notifications),
    } as DNode<Workflow>;
  }

  async groupByWorkflowType(
    rows: {
      type: string;
      name: string;
    }[]
  ): Promise<Map<string, string[]>> {
    return rows.reduce((result, r) => {
      let names = result.get(r.type);
      if (names == undefined) {
        names = [r.name];
        result.set(r.type, names);
      } else {
        names.push(r.name);
      }
      return result;
    }, new Map<string, string[]>());
  }
}
