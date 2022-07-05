import { SurveyRow } from "./surveydb.js";
import { DNode, Survey, SurveyOptions } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { WorkflowStore } from "./workflowdbstore.js";
import { RuleStore } from "./ruledbstore.js";
import { PageStore } from "./pagedbstore.js";
import { PageSetStore } from "./pagesetsdbstore.js";
import { Drivers } from "./store.js";

export class SurveyStore {
  private readonly pageStore: PageStore;
  private readonly pageSetStore: PageSetStore;
  private readonly ruleStore: RuleStore;
  private readonly workflowStore: WorkflowStore;

  constructor(private readonly drivers: Drivers) {
    this.pageStore = new PageStore(this.drivers);
    this.pageSetStore = new PageSetStore(this.drivers);
    this.ruleStore = new RuleStore(this.drivers);
    this.workflowStore = new WorkflowStore(this.drivers);
  }

  async save(survey: Survey): Promise<Keys> {
    const keys = await this.drivers.surveyDriver.save(survey);
    survey.update(keys);
    return keys;
  }

  async getNode(name: string): Promise<DNode<Survey>> {
    return this.drivers.surveyDriver
      .getByName(name)
      .then(async row => this.surveyRowToNode(row));
  }

  private async surveyRowToNode(row: Keys & SurveyRow): Promise<DNode<Survey>> {
    const __keys__ = row.__keys__;
    const surveyOptions = JSON.parse(row.options) as SurveyOptions;
    const workflows = await this.workflowStore.getNodes(surveyOptions, __keys__);
    const pageSets = await this.pageSetStore.getNodes(surveyOptions, __keys__);
    const pages = await this.pageStore.getNodes(
      "survey",
      surveyOptions,
      __keys__
    );
    const crossRules = await this.ruleStore.getCrossNodes(__keys__);
    return {
      name: row.name,
      __keys__,
      config: surveyOptions,
      workflows,
      pageSets,
      pages,
      crossRules,
    };
  }
}
