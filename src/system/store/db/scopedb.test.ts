import test from "./test-runner.js";

test("Test ScopeDriver.getByLevel", async (store, t) => {
  const itemCase = await store.scopeDriver.getByLevel("outer");
  t.equal(itemCase.id, 2);
  t.end();
});

test("Test ScopeDriver.getAll", async (store, t) => {
  const AllItemTypes = await store.scopeDriver.getAll();
  t.equal(AllItemTypes.length, 3);
  t.end();
});

test("Test ScopeDriver.getById", async (store, t) => {
  const ScopeLevelGlobal = await store.scopeDriver.getById(1);
  t.equal(ScopeLevelGlobal.id, 1);
  t.end();
});
