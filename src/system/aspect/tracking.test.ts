import {
  InterviewItem,
  Interview,
  Page,
  Participant,
  PageItem,
  Sample,
  Survey,
  PageSet,
  ItemTypes,
  DomainCollection,
  ZippedInterview,
} from "uask-dom";
import "./tracking.js";
import test from "tape";
import { hasChanges } from "./change.js";

test("Survey has tracking support", t => {
  const survey = new Survey("P11-05", { __keys__: { id: 1 } });
  t.true(survey.updateNoTrack);
  t.equal(survey.__keys__?.id, 1);
  t.end();
});

test("Page has tracking support", t => {
  const page = new Page("General");
  t.true(page.updateNoTrack);
  t.end();
});

test("PageSet has tracking support", t => {
  const pageSet = new PageSet("Inclusion");
  t.true(pageSet.updateNoTrack);
  t.end();
});

test("Question has tracking support", t => {
  const item = new PageItem("?", "", {
    name: "",
    label: () => "",
    rawValue: () => "",
    typedValue: () => "",
  });
  t.true(item.updateNoTrack);
  t.end();
});

test("Participant has tracking support", t => {
  const participant = new Participant("", new Sample("A"));
  t.true(participant.updateNoTrack);
  t.end();
});

test("Interview has tracking support", t => {
  const interview = new Interview(new PageSet("Inclusion"), {});
  t.true(interview.updateNoTrack);
  t.end();
});

test("InterviewItem has tracking support", t => {
  const item = new InterviewItem(
    new PageItem("?", "", {
      name: "",
      label: () => "",
      rawValue: () => "",
      typedValue: () => "",
    }),
    ""
  );
  t.true(item.updateNoTrack);
  t.end();
});

test("Sample has tracking support", t => {
  const sample = new Sample("A");
  t.true(sample.updateNoTrack);
  t.end();
});

test("Changes are tracked subsequently", t => {
  const survey = new Survey("P11-05");
  const updated0 = survey.update({ name: "EX3-A1" });
  t.deepEqual(updated0.__changes__, { name: "P11-05" });
  const updated1 = updated0.update({
    options: { ...survey.options, defaultLang: "fr" },
  });
  t.true(
    hasChanges(updated1) &&
      ["name", "options"].every(k => k in updated1.__changes__)
  );
  t.end();
});

test("Multiple changes that restore original value", t => {
  const survey = new Survey("P11-05");
  const updated0 = survey.update({ name: "EX3-A1" });
  const updated1 = updated0.update({ name: "P11-05" });
  t.deepEqual(updated0.__changes__, { name: "P11-05" });
  t.deepEqual(updated1.__changes__, {});
  t.end();
});

test("Changes are tracked only once", t => {
  const survey = new Survey("P11-05");
  const updated0 = survey.update({ name: "EX3-A1" });
  const updated1 = updated0.update({ name: "C3P-O0" });
  t.deepEqual(updated1.__changes__, { name: "P11-05" });
  t.end();
});

test("No track forced with update", t => {
  const survey = new Survey("P11-05");
  const updated0 = survey.update({ name: "EX3-A1" });
  const updated1 = updated0.update({ name: "C3P-O0", __untrack__: true });
  t.deepEqual(updated1.__changes__, {});
  t.end();
});

test("No track forced with no update", t => {
  const survey = new Survey("P11-05");
  const updated0 = survey.update({ name: "EX3-A1" });
  const updated1 = updated0.update({ __untrack__: true });
  t.deepEqual(updated1.__changes__, {});
  t.end();
});

test("No change keep same reference", t => {
  const survey = new Survey("P11-05");
  const updated = survey.update({ name: "P11-05" });
  t.equal(updated, survey);
  t.end();
});

test("Full change keep operand reference", t => {
  const survey = new Survey("P11-05");
  const updated0 = survey.update({ name: "EX3-A1" });
  const updated1 = survey.update(updated0);
  t.equal(updated1, updated0);
  t.end();
});

test("Untracking keep same reference", t => {
  const survey = new Survey("P11-05");
  const updated = survey.update({ name: "A15-X4" });
  const untracked = updated.update({ __untrack__: true });
  t.equal(untracked, updated);
  t.end();
});

test("Update keys is mutation", t => {
  const survey = new Survey("P11-05");
  const updated = survey.update({ __keys__: { id: 1 }, __untrack__: true });
  t.equal(updated, survey);
  t.deepEqual(survey.__keys__, { id: 1 });
  t.end();
});

test("Update keys in page items is mutation", t => {
  const pageItem = new PageItem("Question", "V", ItemTypes.text);
  const updated = pageItem.update({ __keys__: { id: 1 }, __untrack__: true });
  t.equal(updated, pageItem);
  t.deepEqual(pageItem.__keys__, { id: 1 });
  t.end();
});

test("New object has support", t => {
  const survey = new Survey("P11-05");
  t.deepEqual(survey.__keys__, {});
  t.end();
});

test("Zip with tracking", t => {
  const interview = new Interview(
    new PageSet(""),
    {},
    {
      items: DomainCollection(
        new InterviewItem(new PageItem("", "", ItemTypes.text), "A")
      ),
    }
  );
  const zipWith = [
    { nonce: 16336422688204, __keys__: { id: 10 } },
    { items: [{ context: 5, __keys__: { id: 100 } }] },
  ] as ZippedInterview;
  const zipped = interview.update(zipWith);
  t.equal(zipped.nonce, 16336422688204);
  t.equal(zipped.__keys__?.id, 10);
  t.deepEqual(zipped.__changes__, { nonce: 0 });
  t.equal(zipped.items[0].context, 5);
  t.equal(zipped.items[0].__keys__?.id, 100);
  t.deepEqual(zipped.items[0].__changes__, { context: 0 });
  t.end();
});

test("Do not track changes for equilvalent values", t => {
  const interviewItem = new InterviewItem(
    new PageItem("", "", ItemTypes.yesno),
    true
  );
  t.equal(interviewItem.value, 1);
  const updated = interviewItem.update({ value: true });
  t.equal(updated, interviewItem);
  t.deepEqual(interviewItem.__changes__, {});
  t.end();
});

test("Track changes for deep objects", t => {
  const interviewItem = new InterviewItem(
    new PageItem("", "", ItemTypes.integer),
    1,
    { messages: { inRange: "inRange message" } }
  );
  const updatedOnce = interviewItem.update({ messages: {} });
  t.deepEqual(updatedOnce.__changes__, {
    messages: { inRange: "inRange message" },
  });
  const updatedTwice = updatedOnce.update({
    messages: { inRange: "inRange message" },
  });
  t.deepEqual(updatedTwice.__changes__, {});
  t.end();
});
