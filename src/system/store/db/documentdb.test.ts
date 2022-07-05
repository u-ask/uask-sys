import test from "./test-runner.js";
import {
  cleanTestDb,
  P11_05,
  seedTestDocuments,
  seedTestSurvey,
} from "./test-utils.js";
import { Document } from "../../../drivers/document.js";
import { P11_05_Documents } from "../../../drivers/example/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { Store } from "./store.js";

async function seed(store: Store) {
  await cleanTestDb(store);
  await seedTestSurvey(store);
}

test("Delete document", async (store, t) => {
  await seed(store);
  const doc = P11_05_Documents[1];
  await store.documentDriver.save(P11_05, doc);
  await store.documentDriver.deleteByHash(P11_05.__keys__ as KeyMap, doc.hash);
  await store
    .getDocumentNode(doc.hash, P11_05.__keys__ as KeyMap)
    .then(() => t.fail(), t.pass);
  t.end();
});

test("Get content's document", async (store, t) => {
  await seed(store);

  const document = P11_05_Documents[2];

  const addDoc = await store.documentDriver.save(P11_05, document);
  document.update(addDoc);
  const updated = document.update({ content: document.content });
  await store.documentDriver.save(P11_05, updated);
  const { content, name } = await store.documentDriver.getContentByHash(
    P11_05.__keys__ as KeyMap,
    document.hash
  );
  t.true(content);
  t.equals(name, document.name);
  t.end();
});

test("Save document", async (store, t) => {
  await seed(store);
  const d = P11_05_Documents[0];

  const addDoc = await store.documentDriver.save(
    P11_05,
    d.update({ hash: 1234, name: "TEST" })
  );
  d.update(addDoc);

  const query1 = await store.client
    .table("documents")
    .where("hash", d.__keys__?.hash);
  t.equal(query1[0].name, "TEST");
  t.end();
});

test("Get document node by hash", async (store, t) => {
  await seed(store);
  await seedTestDocuments(store);
  const document = P11_05_Documents[0];
  const node = await store.getDocumentNode(
    document.hash,
    P11_05.__keys__ as KeyMap
  );
  t.equal(node.hash, String(document.hash));
  t.equal(node.title, document.title);
});

test("Get document nodes", async (store, t) => {
  await seed(store);
  await seedTestDocuments(store);

  const surveyKeys = P11_05.__keys__;
  if (!surveyKeys) throw "keys missing";

  const documents = P11_05_Documents;

  const nodes = await store.getDocumentNodes(surveyKeys);
  t.equal(nodes.length, documents.length);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, ...docExpected } = P11_05_Documents[0];

  const nodeDocument = nodes.find(doc => doc.name == docExpected.name);
  t.deepLooseEqual(nodeDocument, docExpected);
  t.end();
});

test("Get all documents only retreives survey level visibility", async (store, t) => {
  await seed(store);
  await seedTestDocuments(store);
  const surveyKeys = P11_05.__keys__;
  if (!surveyKeys) throw "keys missing";

  const nodes0 = await store.getDocumentNodes(surveyKeys);
  await store.documentDriver.save(
    P11_05,
    new Document("Doc", "Title", undefined, {
      visibility: "participant",
      hash: 1234567890,
    })
  );
  const nodes1 = await store.getDocumentNodes(surveyKeys);
  t.deepEqual(nodes1, nodes0);
  const node = await store.getDocumentNode(
    1234567890,
    P11_05.__keys__ as KeyMap
  );
  t.equal(node.name, "Doc");
  t.end();
});
