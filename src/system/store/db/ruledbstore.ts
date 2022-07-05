import {
  UnitRulePageItemRow,
  CrossRulePageItemRow,
  RuleRow,
} from "./ruledb.js";
import { CrossItemRule, DNode, Rule, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { Drivers } from "./store.js";

export class RuleStore {
  constructor(private readonly drivers: Drivers) {}

  saveAll(survey: Survey): Promise<void[]> {
    return Promise.all(
      survey.rules.map(async (r, i) => {
        return await this.drivers.ruleDriver.save(survey, r, i);
      })
    );
  }

  async getNodes(keys?: KeyMap): Promise<DNode<Rule>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.ruleDriver
      .getUnitRuleRowByPageItem(keys)
      .then(rows => Promise.all(rows.map(r => this.ruleRowToNode(r))));
  }

  async getCrossNodes(keys?: KeyMap): Promise<DNode<CrossItemRule>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.ruleDriver
      .getCrossRuleRowBySurvey(keys)
      .then(rows => this.groupByRule(rows))
      .then(rows =>
        Promise.all(rows.map(async r => this.crossRuleRowToNode(keys, r)))
      );
  }

  private async ruleRowToNode(row: Keys & RuleRow): Promise<DNode<Rule>> {
    const { name, precedence } = await this.drivers.ruleTypeDriver.getById(
      row.ruleTypeId
    );
    return {
      name,
      precedence,
      ...JSON.parse(row.args),
    };
  }

  private async crossRuleRowToNode(
    keys: KeyMap,
    row: Keys & CrossRulePageItemRow
  ): Promise<DNode<CrossItemRule>> {
    const variableNames = await Promise.all(
      row.variableNames.map(async (r, index) => {
        const scope = await this.drivers.scopeDriver.getById(
          row.scopeIds[index]
        );
        if (scope.level == "global") return "@" + r;
        if (scope.level == "outer") return "$" + r;
        return r;
      })
    );
    const rule = await this.drivers.ruleDriver.getRowById({
      surveyId: row.surveyId,
      version: keys.version,
      hash: row.ruleHash,
    });
    const args = await this.ruleRowToNode(rule).then(r => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { precedence, ...expected } = r;
      return expected;
    });
    return {
      variableNames,
      args: args as unknown as Record<string, unknown>,
      when: JSON.parse(rule.when),
    };
  }

  async groupByRule(
    rows: (Keys & UnitRulePageItemRow)[]
  ): Promise<(Keys & CrossRulePageItemRow)[]> {
    return [
      ...rows
        .reduce((result, r) => {
          let obj = result.get(r.ruleHash);
          if (obj == undefined) {
            obj = {
              surveyId: r.surveyId,
              pageItemIds: [r.pageItemId],
              ruleHash: r.ruleHash,
              scopeIds: [r.scopeId],
              variableNames: [r.variableName],
              rulePosition: r.rulePosition,
            };
            result.set(r.ruleHash, obj);
          } else {
            obj.pageItemIds.push(r.pageItemId);
            obj.scopeIds.push(r.scopeId);
            obj.variableNames.push(r.variableName);
          }
          return result;
        }, new Map<number, Keys & CrossRulePageItemRow>())
        .values(),
    ].sort((r1, r2) => r1.rulePosition - r2.rulePosition);
  }
}
