import { Knex } from "knex";
import { CrossItemRule, PageItem, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { PageItemDriver } from "./pageitemdb.js";
import { RuleTypeDriver, RuleTypeRow } from "./ruletypedb.js";
import { ScopeDriver } from "./scopedb.js";
import { upsert, upsertChilds } from "./upsert.js";
import fnv from "@sindresorhus/fnv1a";

export type RuleRow = {
  surveyId: number;
  ruleTypeId: number;
  args: string;
  when: string;
  itemCount: number;
  position: number;
  id: number;
  version: number;
};

export type UnitRulePageItemRow = {
  surveyId: number;
  pageItemId: number;
  scopeId: number;
  ruleHash: number;
  rulePosition: number;
  variableName: string;
};

export type CrossRulePageItemRow = {
  surveyId: number;
  pageItemIds: number[];
  variableNames: string[];
  scopeIds: number[];
  ruleHash: number;
  rulePosition: number;
};

export class RuleDriver {
  constructor(private client: Knex) {}

  async save(
    survey: Survey,
    rule: CrossItemRule,
    position: number
  ): Promise<void> {
    this.eagerSupport = undefined;
    await PageItemDriver.initGlobalItems(this.client);
    const ruleTypeDriver = new RuleTypeDriver(this.client);
    const ruleType = await ruleTypeDriver.getByName(rule.name);
    const row = {
      hash: RuleDriver.h(survey, rule, ruleType),
      surveyId: survey.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      ruleTypeId: ruleType.id,
      args: JSON.stringify(rule.args),
      when: JSON.stringify(rule.when),
      itemCount: rule.pageItems.length,
      position: position,
    };

    const keyInfo = await upsert(this, row, ["surveyId", "hash"]);

    const childRows = await this.getChildRows(rule, survey, keyInfo);

    await upsertChilds(this, childRows, [
      "surveyId",
      "pageItemId",
      "scopeId",
      "ruleHash",
    ]);
  }

  private async getChildRows(
    rule: CrossItemRule,
    survey: Survey,
    keyInfo: Keys & { __untrack__: true }
  ) {
    return Promise.all(
      rule.pageItems.map(async (pi, i) => {
        const pageItem = pi instanceof PageItem ? pi : pi[0];
        const scopeDriver = new ScopeDriver(this.client);
        const scopeId =
          pi instanceof PageItem
            ? (await scopeDriver.getByLevel("local"))?.id
            : (await scopeDriver.getByLevel(pi[1]))?.id;
        return {
          surveyId: survey.__keys__?.id,
          version: survey.__keys__?.version ?? 1,
          pageItemId: pageItem.__keys__?.id,
          scopeId,
          ruleHash: keyInfo.__keys__?.hash,
          position: i,
        };
      })
    );
  }

  get childTable(): Knex.QueryBuilder<UnitRulePageItemRow> {
    return this.client.table<UnitRulePageItemRow>("rulePageItems");
  }

  get table(): Knex.QueryBuilder<RuleRow> {
    return this.client.table<RuleRow>("rules");
  }

  private eagerSupport: EagerSupport | undefined;
  private loadSupport(key: KeyMap) {
    if (
      this.eagerSupport == undefined ||
      this.eagerSupport.surveyId != key.surveyId ||
      this.eagerSupport.version != key.version
    ) {
      this.eagerSupport = new EagerSupport(
        key.surveyId,
        key.version,
        this.client
      );
    }
    return this.eagerSupport;
  }

  async getRowById(key: KeyMap): Promise<Keys & RuleRow> {
    const support = this.loadSupport(key);
    return (await support.getByHash(key.hash)) as Keys & RuleRow;
  }

  async getUnitRuleRowByPageItem(
    pageItemKey: KeyMap
  ): Promise<(Keys & RuleRow)[]> {
    const support = this.loadSupport(pageItemKey);
    return (await support.getByPageItemId(pageItemKey.id)) as (Keys &
      RuleRow)[];
  }

  async getCrossRuleRowBySurvey(
    surveyKey: KeyMap
  ): Promise<(Keys & UnitRulePageItemRow)[]> {
    await PageItemDriver.initGlobalItems(this.client);
    return await this.client
      .table("rulePageItems")
      .innerJoin("rules", joinRules)
      .join("pageItems", "rulePageItems.pageItemId", "pageItems.id")
      .where("rules.surveyId", surveyKey.id)
      .where("itemCount", ">", 1)
      .where("rules.version", surveyKey.version)
      .where("rulePageItems.version", surveyKey.version)
      .select(
        "rulePageItems.*",
        "rules.hash",
        "rules.position as rulePosition",
        "pageItems.variableName"
      )
      .orderBy(["rules.position", "rulePageItems.position"]);
  }

  static h(survey: Survey, rule: CrossItemRule, ruleType: RuleTypeRow): bigint {
    return fnv(
      [survey.__keys__?.id, rule.target.__keys__?.id, ruleType.id].join(",")
    );
  }
}

function joinRules(this: Knex.JoinClause): void {
  this.on("rulePageItems.surveyId", "rules.surveyId").on(
    "rulePageItems.ruleHash",
    "rules.hash"
  );
}

class EagerSupport {
  private readonly rows: Promise<
    (RuleRow & { hash: number; pageItemId: number })[]
  >;
  constructor(
    readonly surveyId: number,
    readonly version: number,
    client: Knex
  ) {
    const q = client
      .table("rulePageItems")
      .where("rulePageItems.surveyId", surveyId)
      .where("rulePageItems.position", 0)
      .innerJoin("rules", joinRules)
      .where("rules.version", version)
      .where("rulePageItems.version", version)
      .select("rules.*", "rulePageItems.pageItemId")
      .orderBy("rules.position");
    this.rows = q.then(r => [...r]);
  }

  async getByHash(hash: number) {
    return (await this.rows).find(r => r.hash == hash);
  }
  async getByPageItemId(pageItemId: number) {
    return (await this.rows).filter(
      r => r.pageItemId == pageItemId && r.itemCount == 1
    );
  }
}
