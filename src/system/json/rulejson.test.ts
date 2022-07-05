import test, { Test } from "tape";
import { ItemTypes, PageItemBuilder } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import { ruleDeserialize, ruleSerialize } from "./rulejson.js";
import { getItem } from "uask-dom";
import { pick } from "./pick.js";

test("Required rule serialization", t => {
  testRuleSerializationByName(t, "required");
  t.end();
});

test("Required rule deserialization", t => {
  testRuleDeserializationByName(t, "required");
  t.end();
});

test("In range rule serialization", t => {
  testRuleSerializationByName(t, "inRange");
  t.end();
});

test("In range rule deserialization", t => {
  testRuleDeserializationByName(t, "inRange");
  t.end();
});

test("Decimal Precision rule serialization", t => {
  testRuleSerializationByName(t, "decimalPrecision");
  t.end();
});

test("Decimal Precision rule deserialization", t => {
  testRuleDeserializationByName(t, "decimalPrecision");
  t.end();
});

test("Max length rule serialization", t => {
  testRuleSerializationByName(t, "maxLength");
  t.end();
});

test("Max length rule deserialization", t => {
  testRuleDeserializationByName(t, "maxLength");
  t.end();
});

test("Letter case rule serialization", t => {
  testRuleSerializationByName(t, "letterCase");
  t.end();
});

test("Letter case rule deserialization", t => {
  testRuleDeserializationByName(t, "letterCase");
  t.end();
});

test("Constant rule serialization", t => {
  testRuleSerializationByName(t, "constant");
  t.end();
});

test("Constant rule deserialization", t => {
  testRuleDeserializationByName(t, "constant");
  t.end();
});

function testRuleSerializationByName(t: Test, name: string) {
  exampleSurvey.pages.forEach(p => {
    p.items.forEach(i => {
      getItem(i).rules.forEach(r => {
        if (r.name == name) {
          const json = ruleSerialize(r);
          const obj = pick(json);
          t.deepLooseEqual(obj, json);
        }
      });
    });
  });
}

function testRuleDeserializationByName(t: Test, name: string) {
  exampleSurvey.pages.forEach(p => {
    p.items.forEach(i => {
      const builder = new PageItemBuilder(
        "",
        "",
        ItemTypes.yesno,
        undefined,
        {}
      );
      getItem(i)
        .rules.filter(r => r.name == name)
        .forEach(r => {
          const json = ruleSerialize(r);
          ruleDeserialize(builder, json);
          const obj = builder.build([]).rules[0];
          t.deepEqual(obj, r);
        });
    });
  });
}
