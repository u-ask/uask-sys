import test from "tape";
import {
  PageBuilder,
  PageItemBuilder,
  ItemTypes,
  SurveyBuilder,
  PageSetBuilder,
  Page,
} from "uask-dom";
import "./tracking.js";
import "./building.js";

test("SurveyBuilder has tracking support", t => {
  const surveyBuilder = new SurveyBuilder();
  t.true(surveyBuilder.__keys__);
  t.true(surveyBuilder.__changes__);
  t.true(surveyBuilder.track);
  t.end();
});

test("PageBuilder has tracking support", t => {
  const builder = new PageBuilder("General", {});
  t.true(builder.__keys__);
  t.true(builder.__changes__);
  t.true(builder.track);
  t.end();
});

test("PageSetBuilder has tracking support", t => {
  const builder = new PageSetBuilder("Inclusion", {});
  t.true(builder.__keys__);
  t.true(builder.__changes__);
  t.true(builder.track);
  t.end();
});

test("QuestionBuilder has tracking support", t => {
  const builder = new PageItemBuilder(
    "Is participant included",
    "INCL",
    ItemTypes.yesno,
    undefined,
    {}
  );
  t.true(builder.__keys__);
  t.true(builder.__changes__);
  t.true(builder.track);
  t.end();
});

test("Build sudy tracking information", t => {
  const surveyBuilder = new SurveyBuilder();
  surveyBuilder.survey("P11-05");
  surveyBuilder.track(
    { __keys__: { id: 1 } },
    { __changes__: { name: "OTHER" } }
  );
  const survey = surveyBuilder.get();
  t.equal(survey.__keys__?.id, 1);
  t.equal(survey.__changes__?.name, "OTHER");
  t.end();
});

test("Build pageSet tracking support", t => {
  const pageBuilder = new PageBuilder("General", {});
  const pageSetBuilder = new PageSetBuilder("Inclusion", {}).pages(
    "General"
  ) as PageSetBuilder;
  pageSetBuilder.track(
    { __keys__: { id: 1 } },
    { __changes__: { type: "Enrolment" } }
  );
  const page = pageBuilder.build([]);
  const pageSet = pageSetBuilder.build([page as Page]);
  t.equal(pageSet.pages[0], page);
  t.equal(pageSet.__keys__?.id, 1);
  t.equal(pageSet.__changes__?.type, "Enrolment");
  t.end();
});
