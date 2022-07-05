import test from "tape";
import { FluentGenerator } from "./fluentgenerator.js";

test("Generate a method call #252", t => {
  const gen = new FluentGenerator();
  gen.call("method1").call("method2");
  const fluent = gen.build("b");
  t.equal(fluent, "b.method1()\n  .method2()");
  t.end();
});

test("Generate a call with mandatory arguments #252", t => {
  const gen = new FluentGenerator();
  gen.call("method1").arg("a11").arg(1);
  const fluent = gen.build("b");
  t.equal(fluent, 'b.method1("a11", 1)');
  t.end();
});

test("Generate a call with a generate argument #252", t => {
  const gen1 = new FluentGenerator();
  const gen2 = new FluentGenerator();
  gen1.call("getArg");
  gen2.call("method1").arg((prefix: string) => gen1.build(prefix));
  const fluent = gen2.build("b");
  t.equal(fluent, "b.method1(b.getArg())");
  t.end();
});

test("Generate a call with optional arguments #252", t => {
  const gen = new FluentGenerator();
  gen.call("method1").arg("a11").opt(undefined).opt(1).opt(undefined);
  const fluent = gen.build("b");
  t.equal(fluent, 'b.method1("a11", undefined, 1)');
  t.end();
});

test("Generate a call with array arguments #252", t => {
  const gen1 = new FluentGenerator();
  const gen2 = new FluentGenerator();
  gen1.call("getArg");
  gen2.call("method1").arg(["a", (prefix: string) => gen1.build(prefix)]);
  const fluent = gen2.build("b");
  t.equal(fluent, 'b.method1(["a", b.getArg()])');
  t.end();
});

test("Generate a property #252", t => {
  const gen = new FluentGenerator();
  gen.prop("prop1");
  const fluent = gen.build("b");
  t.equal(fluent, "b.prop1");
  t.end();
});

test("Generate with indentation #252", t => {
  const gen = new FluentGenerator();
  gen.call("m");
  gen.call("n");
  const fluent = gen.build("b", 2);
  t.equal(fluent, "b.m()\n    .n()");
  t.end();
});

test("Compose generators #252", t => {
  const gen1 = new FluentGenerator();
  const gen2 = new FluentGenerator();
  gen1.call("outer");
  gen2.call("inner");
  gen2.call("inner");
  gen1.compose(gen2, 1, 2);
  gen1.call("outer");
  const fluent = gen1.build("b");
  t.equal(fluent, "b.outer()\n    .inner()\n    .inner()\n  .outer()");
  t.end();
});

test("Empty generator #252", t => {
  const gen = new FluentGenerator();
  t.equal(gen.build(), "");
  t.equal(gen.build("  "), "");
  t.equal(gen.build("b"), "");
  t.end();
});
