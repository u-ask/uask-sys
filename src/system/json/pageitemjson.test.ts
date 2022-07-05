import test from "tape";
import { PageBuilder, getItem } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import { itemDeserialize, itemSerialize } from "./pageitemjson.js";
import { pick } from "./pick.js";

test("Page item serialization", t => {
  exampleSurvey.pages.forEach(p => {
    p.items.map(getItem).forEach(i => {
      const json = itemSerialize(i);
      const obj = pick(json);
      t.deepLooseEqual(obj, json);
    });
  });
  t.end();
});

test("Page item deserialization", t => {
  exampleSurvey.pages.forEach(p => {
    const builder = new PageBuilder("", {}, undefined);
    p.items.map(getItem).forEach((i, x) => {
      const json = itemSerialize(i);
      if (json.section) builder.startSection(json.section);
      itemDeserialize(builder, json);
      if (json.section) builder.endSection();
      Reflect.set(builder, "built", false);
      const obj = builder.build([]).items[x];
      t.deepLooseEqual(obj, i);
    });
  });
  t.end();
});
