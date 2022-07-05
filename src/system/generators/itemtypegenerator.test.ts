import { ItemTypes, TypeArgs } from "uask-dom";
import test from "tape";
import { getTypeGenerator } from "./itemtypegenerator.js";

test("Generate simple item type #252", t => {
  const type = ItemTypes.integer;
  const generator = getTypeGenerator({ ...type } as TypeArgs);
  const fluent = generator.build("b.types");
  t.equal(fluent, "b.types.integer");
  t.end();
});

test("Generate paramterized item type #252", t => {
  const type = ItemTypes.date(true);
  const generator = getTypeGenerator({ ...type } as TypeArgs);
  const fluent = generator.build("b.types");
  t.equal(fluent, "b.types.date(true)");
  t.end();
});

test("Generate choice item type #252", t => {
  const type = ItemTypes.choice("many", "1", "2", "4")
    .wording("A", "B", "C")
    .translate("fr", "X", "Y", "Z");
  const generator = getTypeGenerator({ ...type } as TypeArgs, {
    languages: ["fr", "en"],
  });
  const fluent = generator.build("b.types");
  t.equal(
    fluent,
    'b.types.choice("many", "1", "2", "4")\n        .wording("A", "B", "C")\n          .translate("fr", "X", "Y", "Z")'
  );
  t.end();
});

test("Generate score item type #252", t => {
  const type = ItemTypes.score(1, 2, 4)
    .wording("A", "B", "C")
    .translate("fr", "X", "Y", "Z");
  const generator = getTypeGenerator({ ...type } as TypeArgs, {
    languages: ["fr", "en"],
  });
  const fluent = generator.build("b.types");
  t.equal(
    fluent,
    'b.types.score(1, 2, 4)\n        .wording("A", "B", "C")\n          .translate("fr", "X", "Y", "Z")'
  );
  t.end();
});

test("Generate scale item type #252", t => {
  const type = ItemTypes.scale(3, 5)
    .wording("A", "B", "C")
    .translate("fr", "X", "Y", "Z");
  const generator = getTypeGenerator({ ...type } as TypeArgs, {
    languages: ["fr", "en"],
  });
  const fluent = generator.build("b.types");
  t.equal(
    fluent,
    'b.types.scale(3, 5)\n        .wording("A", "B", "C")\n          .translate("fr", "X", "Y", "Z")'
  );
  t.end();
});

test("Generate contextual type #252", t => {
  const type = ItemTypes.context([
    ItemTypes.integer,
    ItemTypes.date(true),
    ItemTypes.score(1, 2).wording("Yes", "No"),
  ]);
  const generator = getTypeGenerator({ ...type } as TypeArgs);
  const fluent = generator.build("b.types", 0);
  t.equal(
    fluent,
    'b.types.context([\n      b.types.integer, \n      b.types.date(true), \n      b.types.score(1, 2)\n                .wording("Yes", "No")])'
  );
  t.end();
});
