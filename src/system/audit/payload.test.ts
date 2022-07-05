import {
  DomainCollection,
  InterviewItem,
  ItemTypes,
  PageItem,
} from "uask-dom";
import test from "tape";
import {
  changePayload,
  createPayload,
  getChangeRecord,
  makeChangeRecord,
} from "./payload.js";

test("Build modification payload #121", t => {
  const fake = { value: 1, childs: DomainCollection(3, 4), __changes__: {} };
  t.false(changePayload(fake));
  t.deepEqual(changePayload({ ...fake, __changes__: { value: 0 } }), {
    value: 1,
  });
  t.end();
});

test("Build creation payload #121", t => {
  const fake = { value: 1, childs: DomainCollection(3, 4) };
  t.deepEqual(createPayload(fake), { value: 1 });
  t.end();
});

test("Build audit payload #121", t => {
  const fake0 = { value: 1, childs: DomainCollection(3, 4) };
  const fake1 = {
    value: 1,
    childs: DomainCollection(3, 4),
    __changes__: { value: 0 },
    __keys__: { id: 1 },
  };
  t.deepEqual(makeChangeRecord(fake0), {
    payload: { value: 1 },
    operation: "create",
  });
  t.deepEqual(makeChangeRecord(fake1), {
    payload: { value: 1 },
    operation: "update",
  });
  t.end();
});

test("Build interview item creation change record #121", t => {
  const pageItem = new PageItem("Q", "V", ItemTypes.text);
  const interviewItem = new InterviewItem(pageItem, "A");
  const record = getChangeRecord(interviewItem);
  t.deepEqual(record, makeChangeRecord(interviewItem));
  t.equal(record.operation, "create");
  t.end();
});

test("Build interview item update change record #121", t => {
  const pageItem = new PageItem("Q", "V", ItemTypes.text);
  const interviewItem = new InterviewItem(pageItem, "A", {
    __changes__: { value: "B" },
    __keys__: { id: 1 },
  });
  const record = getChangeRecord(interviewItem);
  t.deepEqual(record, makeChangeRecord(interviewItem));
  t.equal(record.operation, "update");
  t.end();
});
