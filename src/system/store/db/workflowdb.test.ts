import test from "./test-runner.js";
import {
  cleanTestDb,
  seedTestSurvey,
  P11_05,
  seedTestWorkflows,
  seedTestPageSets,
  seedTestPages,
} from "./test-utils.js";
import { DomainCollection, PageSet } from "uask-dom";
import { Store } from "./store.js";
import { workflowSerialize } from "../../json/index.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
  await seedTestPages(store);
  await seedTestPageSets(store);
}

test("Save workflow", async (store, t) => {
  await seed(store);
  await seedTestWorkflows(store);

  t.true(P11_05.workflows.every(p => p.__keys__?.id));

  const query0 = await store.client
    .table("workflows")
    .where("surveyId", P11_05.__keys__?.id)
    .orderBy("id")
    .select(["id"]);
  t.true(query0.length > 0);

  const query1 = await store.client
    .table("workflowPageSets")
    .where("surveyId", P11_05.__keys__?.id)
    .whereNotNull("pageSetId");
  t.true(query1.length >= 4);

  const query2 = await store.client
    .table("workflowPageSets")
    .where("surveyId", P11_05.__keys__?.id)
    .countDistinct("workflowTypeId");
  t.true((query2.length = 4));

  t.end();
});

test("Update Workflow", async (store, t) => {
  await seed(store);
  await seedTestWorkflows(store);

  const workflow = P11_05.workflows[0];
  const PageSetNotInWorkflowMany = P11_05.pageSets.find(
    ps => !workflow.many.includes(ps)
  ) as PageSet;

  const updated = workflow.update({
    many: DomainCollection(PageSetNotInWorkflowMany, ...workflow.many),
  });

  await store.workflowDriver.save(P11_05, updated, 999);

  const query0 = await store.client
    .table("workflows")
    .where("id", workflow.__keys__?.id)
    .select<{ id: number; position: number }[]>(["id", "position"])
    .first();
  t.equal(query0?.position, 999);

  const query1 = await store.client
    .table("workflowPageSets")
    .where("workflowId", workflow.__keys__?.id)
    .where("workflowTypeId", 3) // many
    .whereNotNull("pageSetId")
    .whereNotNull("workflowTypeId")
    .orderBy("position")
    .select<{ pageSetId: number; position: number }[]>([
      "pageSetId",
      "position",
    ]);
  t.equal(query1.length, workflow.many.length + 1);
  t.true(
    query1.every(
      q =>
        q.pageSetId ==
        (q.position == 0
          ? PageSetNotInWorkflowMany
          : workflow.many[q.position - 1]
        ).__keys__?.id
    )
  );
  t.end();
});

test("Workflows grouped by type", async (store, t) => {
  await seed(store);
  const w1 = {
    type: "single",
    name: "pageSet1",
  };
  const w2 = {
    type: "many",
    name: "pageSet2",
  };
  const w3 = {
    type: "many",
    name: "pageSet3",
  };
  const w4 = {
    type: "single",
    name: "pageSet4",
  };
  const coll = [w1, w2, w3, w4];
  const s = await store.workflowStore.groupByWorkflowType(coll);
  t.deepLooseEqual(s.get("single"), ["pageSet1", "pageSet4"]);
  t.deepLooseEqual(s.get("many"), ["pageSet2", "pageSet3"]);
  t.end();
});

test("Get workflow nodes", async (store, t) => {
  await seed(store);
  await seedTestWorkflows(store);

  const surveyKey = P11_05.__keys__;
  if (!surveyKey) throw "keys missing";

  const workflows = P11_05.workflows;

  const nodes = await store.workflowStore.getNodes(P11_05.options, surveyKey);
  t.equal(nodes.length, workflows.length);

  nodes.forEach((n, p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __changes__, ...expected } = workflowSerialize(
      workflows[p],
      P11_05.options
    );
    t.deepLooseEqual(n, expected);
  });

  t.end();
});
