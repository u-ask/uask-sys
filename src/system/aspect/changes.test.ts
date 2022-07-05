import test from "tape";
import { getChanges, hasChanges, mergeChanges, resetChanges } from "./change.js";

test("Changes object has keys", t => {
  t.true(hasChanges({ __changes__: { name: "r" } }));
  t.false(hasChanges({ __changes__: {} }));
  t.false(hasChanges({ __changes__: undefined }));
  t.false(hasChanges({}));
  t.end();
});

test("Changes reset", t => {
  const changes = { __changes__: { name: "r" } };
  resetChanges(changes);
  t.deepEqual(changes, { __changes__: {} });
  t.end();
});

test("Changes computed from object", t => {
  const changes = getChanges({ a: 1, b: 2 }, { a: 1, b: 3 }, { b: 3 });
  t.deepEqual(changes, { b: 3 });
  t.end();
});

test("Changes with dates that have same value", t => {
  const date = new Date();
  const other = new Date(date);
  const changes = getChanges({ a: date }, { a: other }, { a: other });
  t.deepEqual(changes, {});
  t.end();
});

test("Changes merged from object", t => {
  const changes = mergeChanges<{ a: number; b: number; c: number }>(
    { a: 2, b: 4, c: 3, __changes__: { a: 1, b: 3 } },
    { a: 3, c: 4 }
  );
  t.deepEqual(changes, { a: 1, b: 3, c: 3 });
  t.end();
});

test("Merge that revert to original value", t => {
  const changes = mergeChanges<{ a: number; b: number; c: number }>(
    { a: 2, b: 4, c: 3, __changes__: { a: 1, b: 3 } },
    { a: 1, b: 5, c: 4 }
  );
  t.deepEqual(changes, { b: 3, c: 3 });
  t.end();
});

test("Merge that revert to original undefined value", t => {
  const changes = mergeChanges<{ a: number; b: number; c: number | undefined }>(
    { a: 2, b: 4, c: undefined, __changes__: {} },
    { c: 4 }
  );
  t.deepEqual(changes, { c: { undef: true } });
  const revert = mergeChanges<{ a: number; b: number; c: number | undefined }>(
    { a: 2, b: 4, c: 4, __changes__: changes },
    { c: undefined }
  );
  t.deepEqual(revert, {});
  t.end();
});

test("Merge changes for nested messages", t => {
  const changes = mergeChanges({ a: {}, __changes__: { a: {} } }, { a: {} });
  t.deepEqual(changes, {});
  t.end();
});
