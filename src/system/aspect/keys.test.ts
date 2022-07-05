import test from "tape";
import { hasKeys } from "./keys.js";

test("Keys object has keys", t => {
  t.true(hasKeys({ __keys__: { id: 1 } }));
  t.false(hasKeys({ __keys__: {} }));
  t.false(hasKeys({ __keys__: undefined }));
  t.false(hasKeys({}));
  t.end();
});
