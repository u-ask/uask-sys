import { PageSetRow } from "./pagesetdb.js";
import {
  DNode,
  getTranslation,
  mlstring,
  PageSet,
  Survey,
  SurveyOptions,
} from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { PageStore } from "./pagedbstore.js";
import { Drivers } from "./store.js";

export class PageSetStore {
  private readonly pageStore: PageStore;

  constructor(private readonly drivers: Drivers) {
    this.pageStore = new PageStore(this.drivers);
  }

  saveAll(survey: Survey): Promise<Keys[]> {
    return Promise.all(
      survey.pageSets.map(async (ps, index) => {
        const keys = await this.drivers.pageSetDriver.save(survey, ps, index);
        ps.update(keys);
        return keys;
      })
    );
  }

  async getNodes(
    options: SurveyOptions,
    keys?: KeyMap
  ): Promise<DNode<PageSet>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.pageSetDriver
      .getRowBySurvey(keys)
      .then(rows =>
        Promise.all(rows.map(async r => this.pageSetRowToNode(options, r)))
      );
  }

  private async pageSetRowToNode(
    options: SurveyOptions,
    row: Keys & PageSetRow
  ): Promise<DNode<PageSet>> {
    const { __keys__, type, datevar } = row;
    const samePage = (i: { name: mlstring }): string =>
      getTranslation(i.name, "__code__", options.defaultLang) as string;
    const pageNames = await this.pageStore
      .getNodes("pageSet", options, __keys__)
      .then(nodes => nodes.map(samePage));
    const mandatoryPageNames = await this.pageStore
      .getNodes("pageSet", options, __keys__, true)
      .then(nodes => nodes.map(samePage));
    return Object.assign(
      {
        type: JSON.parse(type),
        __keys__,
        pageNames,
        mandatoryPageNames,
      },
      datevar ? { datevar: JSON.parse(datevar) } : {}
    );
  }
}
