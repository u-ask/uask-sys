import { PageRow } from "./pagedb.js";
import { DNode, Page, Survey, SurveyOptions } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { IncludeStore } from "./includedbstore.js";
import { Drivers } from "./store.js";

export class PageStore {
  private readonly includeStore: IncludeStore;

  constructor(private readonly drivers: Drivers) {
    this.includeStore = new IncludeStore(this.drivers);
  }

  saveAll(survey: Survey): Promise<Keys[]> {
    return Promise.all(
      survey.pages.map(async (p, index) => {
        const keys = await this.drivers.pageDriver.save(survey, p, index);
        p.update(keys);
        return keys;
      })
    );
  }

  async getNodes(
    by: "survey" | "pageSet",
    options: SurveyOptions,
    keys?: KeyMap,
    mandatoryOnly = false
  ): Promise<DNode<Page>[]> {
    if (!keys) throw "key missing in row";
    switch (by) {
      case "pageSet":
        return this.drivers.pageDriver
          .getRowByPageSet(keys, mandatoryOnly)
          .then(rows =>
            Promise.all(rows.map(async r => this.pageRowToNode(options, r)))
          );
      case "survey":
        return this.drivers.pageDriver
          .getRowBySurvey(keys, mandatoryOnly)
          .then(rows =>
            Promise.all(rows.map(async r => this.pageRowToNode(options, r)))
          );
    }
  }

  private async pageRowToNode(
    options: SurveyOptions,
    row: Keys & PageRow
  ): Promise<DNode<Page>> {
    const { __keys__, name, exportConfig } = row;
    const includes = await this.includeStore.getNodes(options, __keys__);
    return Object.assign(
      {
        name: JSON.parse(name),
        __keys__,
        includes,
      },
      exportConfig ? { exportConfig: JSON.parse(exportConfig) } : {}
    );
  }
}
