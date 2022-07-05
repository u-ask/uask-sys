import { PageItemRow } from "./pageitemdb.js";
import { DNode, ItemTypes, PageItem, Rule, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { RuleStore } from "./ruledbstore.js";
import { Drivers } from "./store.js";

export class PageItemStore {
  private readonly ruleStore: RuleStore;

  constructor(private readonly drivers: Drivers) {
    this.ruleStore = new RuleStore(this.drivers);
  }

  saveAll(survey: Survey): Promise<Keys[]> {
    return Promise.all(
      survey.items.map(async pi => {
        const keys = await this.drivers.pageItemDriver.save(survey, pi);
        pi.update(keys);
        return keys;
      })
    );
  }

  async getNode(keys?: KeyMap): Promise<DNode<PageItem>> {
    if (!keys) throw "key missing in row";
    return this.drivers.pageItemDriver
      .getRowById(keys)
      .then(async r => this.pageItemRowToNode(r));
  }

  private async pageItemRowToNode(
    row: Keys & PageItemRow
  ): Promise<DNode<PageItem>> {
    const {
      typeId,
      typeArgs,
      wording,
      units,
      comment,
      section,
      pin,
      kpi,
      variableName,
      array,
      __keys__,
    } = row;
    const { name } = await this.drivers.itemTypeDriver.getById(typeId);
    const type = ItemTypes.create({ name, ...JSON.parse(typeArgs) });
    const allRules = await this.ruleStore.getNodes(__keys__);
    const constantRule = allRules.find(r => r.name == "constant") as
      | (DNode<Rule> & { value: unknown })
      | undefined;
    const rules = allRules.filter(r => r != constantRule);
    const rawKpi = JSON.parse(kpi);
    return Object.assign(
      {
        wording: JSON.parse(wording),
        variableName,
        units: JSON.parse(units),
        __keys__,
        type,
        rules,
        array,
      },
      constantRule ? { default: constantRule.value } : {},
      section ? { section: JSON.parse(section) } : {},
      comment ? { itemComment: JSON.parse(comment) } : {},
      pin ? { pinTitle: JSON.parse(pin) } : {},
      kpi ? { kpiTitle: rawKpi.title ?? rawKpi } : {},
      kpi && !!rawKpi.pivot ? { kpiPivot: rawKpi.pivot } : {}
    );
  }
}
