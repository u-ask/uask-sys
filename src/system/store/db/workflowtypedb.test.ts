import test from "./test-runner.js";

test("Test WorkflowTypeDriver.getByType<", async (store, t) => {
  const wfTypeMany = await store.workflowTypeDriver.getByType("many");
  t.equal(wfTypeMany.id, 3);
  t.end();
});

test("Test WorkflowTypeDriver.getAll<", async (store, t) => {
  const wfAllTypes = await store.workflowTypeDriver.getAll();
  t.equal(wfAllTypes.length, 5);
  t.end();
});
