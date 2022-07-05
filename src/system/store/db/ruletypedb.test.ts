import test from "./test-runner.js";

test("Test RuleTypeDriver.getByName<", async (store, t) => {
  const itemCase = await store.ruleTypeDriver.getByName("letterCase");
  t.equal(itemCase.id, 9);
  t.end();
});

test("Test RuleTypeDriver.getAll<", async (store, t) => {
  const AllItemTypes = await store.ruleTypeDriver.getAll();
  t.equal(AllItemTypes.length, 12);
  t.end();
});

test("Test RuleTypeDriver.getById<", async (store, t) => {
  const ruleTypeMaxLength = await store.ruleTypeDriver.getById(3);
  t.equal(ruleTypeMaxLength.id, 3);
  t.end();
});
