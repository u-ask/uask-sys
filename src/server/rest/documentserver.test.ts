import test from "../../client/test-runner.js";
import { Document } from "../../drivers/document.js";

test("Server create document request", async (client, t) => {
  const hash = 1234;
  const document = new Document("Name", "Title", undefined, { hash });
  const response = await client.post("document/P11-05/create", {
    json: document,
  });
  t.equal(response.statusCode, 201);
  t.equal(JSON.parse(response.body).hash, hash);
  t.end();
});

test("Server get all documents request", async (client, t) => {
  const document = new Document("doc.txt", "Title ok", undefined, {
    hash: 4567,
  });
  await client.post("document/P11-05/create", {
    json: document,
  });
  const response = await client.get("document/P11-05/all");
  const documents: Document[] = JSON.parse(response.body);
  t.equal(response.statusCode, 200);
  t.assert(documents.length >= 2);
  t.true(documents.find(d => d.hash == 4567));
  t.end();
});

test("Server delete document request", async (client, t) => {
  const hash = 56789;
  const document = new Document("Name", "Title", undefined, { hash });
  await client.post("document/P11-05/create", {
    json: document,
  });
  const responseDelete = await client.delete(`document/P11-05/${hash}`);
  t.equal(responseDelete.statusCode, 200);
  const response = await client.get("document/P11-05/all");
  const documents: Document[] = JSON.parse(response.body);
  t.false(documents.find(d => d.hash == hash));
  t.end();
});

test("Server get document request", async (client, t) => {
  const response = await client.get("document/P11-05/1234");
  const doc = JSON.parse(response.body);
  t.equal(response.statusCode, 200);
  t.equals(doc.hash, 1234);
  t.end();
});

test("Server update document request", async (client, t) => {
  const hash = 1234;
  const title = "New Title";
  const document = new Document("Name", title, undefined, {
    hash,
    content: new Uint8Array([32, 13]),
  });
  const response = await client.post(`document/P11-05/${hash}`, {
    json: document,
  });
  t.equal(response.statusCode, 200);
  const responseGet = await client.get(`document/P11-05/${hash}`);
  const doc = JSON.parse(responseGet.body);
  t.equals(doc.title, title);
  t.end();
});

test("Server save document content request", async (client, t) => {
  const response = await client.post("document/P11-05/1234/content", {
    body: Buffer.from(new Uint8Array([32, 14, 12])),
    headers: { "Content-Type": "application/octet-stream" },
  });
  t.equal(response.statusCode, 200);
  t.end();
});

test("Server get document content request", async (client, t) => {
  const response = await client.get("document/P11-05/1234/content");
  const content = JSON.parse(response.body);
  t.equal(response.statusCode, 200);
  t.true(content);
  t.notDeepEqual(content, {});
  t.end();
});
