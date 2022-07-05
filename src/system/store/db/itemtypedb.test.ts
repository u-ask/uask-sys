import test from "./test-runner.js";

test("Test itemTypeDriver.getByName", async (store, t) => {
  const itemYesNo = await store.itemTypeDriver.getById(5);
  t.equal(itemYesNo.name, "yesno");
  t.end();
});

test("Test itemTypeDriver.getByType", async (store, t) => {
  const itemYesNo = await store.itemTypeDriver.getByName("yesno");
  t.equal(itemYesNo.id, 5);
  t.end();
});

test("Test itemTypeDriver.getAll", async (store, t) => {
  const AllItemTypes = await store.itemTypeDriver.getAll();
  t.true(AllItemTypes.length > 10);
  t.end();
});
