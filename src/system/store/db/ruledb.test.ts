import test from "./test-runner.js";
import { CrossItemRule, getItem } from "uask-dom";
import { ruleSerialize } from "../../json/index.js";
import {
  cleanTestDb,
  seedTestPageItems,
  seedTestSurvey,
  P11_05,
  seedTestRules,
  seedTestPages,
} from "./test-utils.js";
import { Store } from "./store.js";
import { crossRuleSerialize } from "../../json/crossrulejson.js";
import { RuleDriver } from "./ruledb.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageItems(store);
}

test("Save Crossrule", async (store, t) => {
  await seed(store);

  const crossrule = P11_05.crossRules.find(
    r => r.name == "activation"
  ) as CrossItemRule;
  const node = await store.getSurveyNode("P11-05");
  const survey = P11_05.update({ __keys__: node.__keys__ });
  await store.ruleDriver.save(survey, crossrule, 0);
  let query = await store.client.table("rules").select();
  t.equal(query[0].ruleTypeId, 4);
  t.equal(query[0].itemCount, 2);

  query = await store.client.table("rulePageItems").select();
  t.true((query[0].id = 2));
  t.end();
});

test("Save all cross rules", async (store, t) => {
  await seed(store);
  await seedTestRules(store);

  const query0 = await store.client
    .table("rules")
    .where("surveyId", P11_05.__keys__?.id)
    .andWhere("itemCount", 1);
  t.true(query0.length > 2);

  const query1 = await store.client
    .table("rules")
    .where("surveyId", P11_05.__keys__?.id);
  t.true(query1.length > 4);

  const query2 = await store.client
    .table("rulePageItems")
    .where("surveyId", P11_05.__keys__?.id);
  t.true(query2.length > 10);

  t.end();
});

test("Get rule row for page item", async (store, t) => {
  await seed(store);
  const item = P11_05.pages
    .map(p => p.items.map(getItem).find(i => i.rules.length > 1))
    .filter(i => !!i).last;
  if (!item?.__keys__) throw "key missing";

  const node = await store.getSurveyNode("P11-05");
  const survey = P11_05.update({ __keys__: node.__keys__ });
  const rules = survey.rules.filter(
    c => c.pageItems.length == 1 && c.pageItems[0] == item
  );
  await Promise.all(
    rules.map(async (r, i) => {
      await store.ruleDriver.save(survey, r, i);
    })
  );

  const nodes = await store.ruleStore.getNodes(item.__keys__);
  t.equal(nodes.length, item.rules.length);

  nodes.forEach((n, i) => {
    const expected = ruleSerialize(item.rules[i]);
    t.deepLooseEqual(n, expected);
  });

  t.end();
});

test("Update cross rule", async (store, t) => {
  await seed(store);
  await seedTestRules(store);

  const crossrule = P11_05.crossRules[1];

  const node = await store.getSurveyNode("P11-05");
  const survey = P11_05.update({ __keys__: node.__keys__ });
  await store.ruleDriver.save(survey, crossrule, 999);
  const ruleType = await store.ruleTypeDriver.getByName(crossrule.name);

  const query0 = await store.client
    .table("rules")
    .where("hash", String(RuleDriver.h(survey, crossrule, ruleType)))
    .select<{ id: number; position: number }[]>(["hash", "position"])
    .first();
  t.equal(query0?.position, 999);

  const query1 = await store.client
    .table("rulePageItems")
    .where("ruleHash", String(RuleDriver.h(survey, crossrule, ruleType)))
    .whereNotNull("pageItemId")
    .orderBy("position")
    .select<{ pageSetId: number; position: number }[]>([
      "pageItemId",
      "position",
    ]);
  t.equal(query1.length, crossrule.pageItems.length);

  t.end();
});

test("RulePageItem Rows grouped by ruleHash", async (store, t) => {
  await seed(store);
  const r1 = {
    surveyId: 1,
    pageItemId: 10,
    ruleHash: 11,
    scopeId: 3,
    rulePosition: 1,
    variableName: "V10",
  };
  const r2 = {
    surveyId: 1,
    pageItemId: 20,
    ruleHash: 22,
    scopeId: 3,
    rulePosition: 2,
    variableName: "V20",
  };
  const r3 = {
    surveyId: 1,
    pageItemId: 30,
    ruleHash: 22,
    scopeId: 3,
    rulePosition: 3,
    variableName: "V30",
  };
  const r4 = {
    surveyId: 1,
    pageItemId: 40,
    ruleHash: 11,
    scopeId: 3,
    rulePosition: 4,
    variableName: "V40",
  };

  const coll = [r1, r2, r3, r4];
  const s = await store.ruleStore.groupByRule(coll);
  t.deepLooseEqual(s[0].ruleHash, r1.ruleHash);
  t.deepLooseEqual(s[0].pageItemIds, [r1.pageItemId, r4.pageItemId]);
  t.deepLooseEqual(s[1].pageItemIds, [r2.pageItemId, r3.pageItemId]);
  t.deepLooseEqual(s[0].scopeIds, [r1.scopeId, r4.scopeId]);
  t.end();
});

test("Get crossRule nodes", async (store, t) => {
  await seed(store);
  await seedTestRules(store);

  const surveyKey = P11_05.__keys__;
  if (!surveyKey) throw "keys missing";

  const crossRules = P11_05.crossRules;

  const nodes = await store.ruleStore.getCrossNodes(surveyKey);
  t.equal(nodes.length, crossRules.length);

  nodes.forEach(n => {
    const crossRule = crossRules.find(
      r =>
        r.target.variableName == n.variableNames[n.variableNames.length - 1] &&
        r.name == n.args.name
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const expected = crossRuleSerialize(crossRule as CrossItemRule);
    t.deepLooseEqual(n, expected);
  });

  t.end();
});
