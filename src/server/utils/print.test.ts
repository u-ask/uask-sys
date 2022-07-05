import {
  InterviewItem,
  ItemContent,
  PageItem,
  parseLayout,
  RecordsetContent,
  RichItemContent,
  TableContent,
} from "uask-dom";
import test from "tape";
import { ExampleDrivers } from "../../drivers/example/index.js";
import * as participantTemplate from "./print.js";
import { HtmlValidate } from "html-validate";

const htmlValidate = new HtmlValidate({
  root: true,
  extends: ["html-validate:recommended"],
});

test("Survey name to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const s = participantTemplate.surveyHeader(survey, participant);
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/P11-05/));
  t.end();
});

test("Interview header to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[1];
  const s = participantTemplate.interviewHeader(survey, participant, interview);
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/Inclusion/));
  t.true(s.match(/Participant: 00001/));
  t.true(s.match(/Sample: 001/));
  t.end();
});

test("Section header to html", async t => {
  const s = participantTemplate.sectionHeader({ title: "Information" });
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/Information/));
  t.end();
});

test("Section header (no title) to html", async t => {
  const s = participantTemplate.sectionHeader({});
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.false(s);
  t.end();
});

test("Item part to html", t => {
  const s = participantTemplate.itemPart({
    content: "Wording",
    name: "wording-class",
  });
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/Wording/));
  t.true(s.match(/wording-class/));
  t.end();
});

test("Simple item to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[1];
  const layout = parseLayout(interview.items);
  const s = participantTemplate.item(
    layout[0].content[2] as ItemContent<InterviewItem>
  );
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/older than 18/));
  t.true(s.match(/Yes/));
  t.end();
});

test("Special value to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[1];
  const layout = parseLayout(interview.items);
  const s = participantTemplate.item(
    layout[2].content[1] as ItemContent<InterviewItem>
  );
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/<div class="item-part value simple">ND<\/div>/));
  t.end();
});

test("Item table to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[3];
  const layout = parseLayout(
    interview.items.map(i => i.update({ context: 1 }))
  );
  const s = participantTemplate.table(
    layout[0].content[0] as TableContent<InterviewItem>
  );
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.false(s.match(/&lt;div/));
  t.true(s.match(/row 1/));
  t.true(s.match(/col2/));
  t.true(s.match(/Yes/));
  t.end();
});

test("Recordset to html #168", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[4];
  const layout = parseLayout(interview.items);
  const s = participantTemplate.recordset(
    layout[0].content[0] as unknown as RecordsetContent<InterviewItem>
  );
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/Work/));
  t.true(s.match(/Year/));
  t.true(s.match(/Cuisinier/));
  t.true(s.match(/Secrétaire/));
  t.end();
});

test("Rich item to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[2];
  const layout = parseLayout(
    interview.items.map(i => i.update({ context: 1 }))
  );
  const s = participantTemplate.richItem(
    layout[1].content[7] as RichItemContent<InterviewItem>
  );
  const report = new HtmlValidate({}).validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/Pain/));
  t.end();
});

test("Section to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[2];
  const layout = parseLayout(
    interview.items.map(i => i.update({ context: 1 }))
  );
  const s = participantTemplate.section(layout[0]);
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/<h2 class="section-header">General<\/h2>/));
  t.end();
});

test("Interview to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[2];
  const s = participantTemplate.interview(survey, participant, interview);
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.true(s.match(/Cough/));
  t.end();
});

test("Participant to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const s = participantTemplate.participant(survey, participant);
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.end();
});

test("Survey to html", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const s = participantTemplate.print(survey, participant);
  const report = htmlValidate.validateString(s);
  t.equal(report.errorCount, 0);
  t.end();
});

test("Showable non applicable items are hidden", async t => {
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const showable = survey.items.find(
    i => i.variableName == "LEGLOCOTHER"
  ) as PageItem;
  const hidden = new InterviewItem(showable, undefined, {
    specialValue: "notApplicable",
  });
  t.false(participantTemplate.showItem(survey, hidden));
  t.end();
});
