import test from "tape";
import { pick } from "./pick.js";

test("Undefined removed", t => {
  const date = new Date();
  t.deepEqual(pick({ a: 1, b: undefined, c: date }), {
    a: 1,
    c: date.toISOString(),
  });
  t.end();
});
