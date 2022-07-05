import { DomainCollection, mlstring } from "uask-dom";
import test from "tape";
import { Document, getAllTags } from "./document.js";

test("Create document", t => {
  const document = new Document(
    "UG1",
    "User Guide P11-05",
    DomainCollection("user", "guide"),
    { __keys__: { id: 0 } }
  );
  t.equal(document.name, "UG1");
  t.equal(document.title, "User Guide P11-05");
  t.deepEqual(document.tags, DomainCollection("user", "guide"));
  t.equal(document.__keys__.id, 0);
  t.end();
});

test("Update document keys", t => {
  const document = new Document(
    "UG1",
    "User Guide P11-05",
    DomainCollection("user", "guide"),
    { __keys__: { id: 0 } }
  );
  document.update({ __keys__: { id: 1 } });
  t.equal(document.__keys__.id, 1);
  t.end();
});

test("Update document properties", t => {
  const document = new Document(
    "UG1",
    "User Guide P11-05",
    DomainCollection("user", "guide")
  );
  const updated = document.update({
    name: "UGP11-05",
    tags: document.tags?.append("P11-05"),
  });
  t.equal(updated.name, "UGP11-05");
  t.deepEqual(updated.tags, DomainCollection("user", "guide", "P11-05"));
  t.end();
});

test("Get all tags in all documents", t => {
  const documents = [
    new Document("UG1", "User Guide P11-05", DomainCollection("user", "guide")),
    new Document("PRO_P1105", "Protocol P11-05"),
    new Document(
      "CU",
      "Charte d'utilisation",
      DomainCollection("user", "charte")
    ),
  ];
  const tags = getAllTags(documents);
  const expectedTags = ["charte", "guide", "user"];
  expectedTags.forEach(tag => t.true(tags.includes(tag as mlstring)));
  t.end();
});

test("Document that is not visible at survey level #289", t => {
  const document = new Document("Doc", "Title", DomainCollection(), {
    visibility: "participant",
  });
  t.true(document.visibility, "participant");
  t.end();
});
