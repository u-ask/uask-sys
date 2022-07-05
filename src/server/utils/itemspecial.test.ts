import {
  getItem,
  getItemContext,
  getItemWording,
  getTranslation,
  ItemTypes,
} from "uask-dom";
import test from "tape";
import { ExampleDrivers } from "../../client-example.js";
import { special, blank, reword, WrappedType } from "./itemspecial.js";
import { print } from "./print.js";

test("Print empty CRF #178", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const participant = blank(survey);
  const html = print(survey, participant, "en");
  for (const item of survey.items.filter(
    i => i.type.name != "info" && !i.variableName.startsWith("__")
  )) {
    const wording = getTranslation(
      getItemWording({ wording: item.wording, context: 1 }),
      "en"
    ) as string;
    for (const w of wording.split("->"))
      if (html.includes(w.trim())) t.pass(`${w.trim()} found`);
      else t.fail(`${w.trim()} not found`);
  }
  t.end();
});

test("Modify page items of a survey for print #178", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const modified = special(survey, pi =>
    pi.update({ wording: "This is a test" })
  );
  t.true(modified.items.every(i => i.wording == "This is a test"));
  t.end();
});

test("Wrap types for print #178", t => {
  const wrapped = new WrappedType(ItemTypes.choice("one", "A", "B"));
  t.equal(
    wrapped.label(undefined),
    '<span class="label box">○</span> A<br><span class="label box">○</span> B'
  );
  t.end();
});

test("Wrap types for print #178", t => {
  const wrapped = new WrappedType(ItemTypes.date());
  t.equal(
    wrapped.label(undefined),
    '<span class="label box">__ __ __ __‒__ __‒__ __</span> '
  );
  t.end();
});

test("Build a participant for empty printing #278", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const participant = blank(survey);
  for (const interview of participant.interviews) {
    t.deepEqual(
      interview.items.map(i => i.pageItem),
      interview.pageSet.items.map(i => getItem(i))
    );
    t.deepEqual(
      interview.items.map(i => i.context),
      interview.pageSet.items.map(i => getItemContext(i))
    );
  }
  t.end();
});

test("Add variable name to wording #178", t => {
  t.deepEqual(reword("Test", "V"), "Test<br>V");
  t.deepEqual(reword({ l1: "Test1", l2: "Test2" }, "V"), {
    l1: "Test1<br>V",
    l2: "Test2<br>V",
  });
  t.deepEqual(
    reword(
      [
        { l1: "Test1", l2: "Test2" },
        { l1: "Test3", l2: "Test4" },
      ],
      "V"
    ),
    [
      { l1: "Test1<br>V", l2: "Test2<br>V" },
      { l1: "Test3<br>V", l2: "Test4<br>V" },
    ]
  );
  t.end();
});
