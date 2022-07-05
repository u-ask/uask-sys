import test from "tape";
import {
  InterviewItem,
  getItemWording,
  getItemType,
  mlstring,
} from "uask-dom";
import { exampleSurvey, exampleParticipants } from "uask-dom/example";
import { Json } from "./types.js";
import { ParticipantSummary } from "./summary.js";
import { pick } from "../system/client.js";

test("Participant summary contains participant information", t => {
  const participant = exampleParticipants[0];
  const summary = new ParticipantSummary(
    exampleSurvey,
    participant,
    exampleSurvey.mainWorkflow
  );
  t.equal(summary.participantCode, participant.participantCode);
  t.equal(summary.interviewCount, participant.interviews.length);
  t.equal(summary.sampleCode, participant.sample.sampleCode);
  t.end();
});

test("Participant summary contains pin values", t => {
  const participant = exampleParticipants[0];
  const summary = new ParticipantSummary(
    exampleSurvey,
    participant,
    exampleSurvey.mainWorkflow
  );
  const expected = participant
    .currentItems(exampleSurvey.pins)
    .reduce((r, i) => formatSummary(r, i), {} as Json);
  t.deepEqual(summary.pins, expected);
  t.end();
});

test("Participant Summary contains kpi values", t => {
  const participant = exampleParticipants[0];
  const summary = new ParticipantSummary(
    exampleSurvey,
    participant,
    exampleSurvey.mainWorkflow
  );
  const expectedSimple = participant
    .currentItems(exampleSurvey.kpis.filter(k => k.variableName != "YEAR"))
    .reduce((r, i) => formatSummary(r, i), {} as Json);
  const expectedPivot = participant.interviews[4].kpis.reduce((r, i) => {
    const [kpi, pivot] = i as [InterviewItem, InterviewItem];
    return formatSummary(r, {
      ...kpi,
      pageItem: {
        ...kpi.pageItem,
        kpi: Object.entries(
          (kpi.pageItem.kpi as { title: mlstring }).title
        ).reduce(
          (r, [l, t]) => ({
            ...r,
            [l]: `${t}|${pivot.pageItem.variableName}=${pivot.value}`,
          }),
          {}
        ),
        variableName: `${kpi.pageItem.variableName}|${pivot.pageItem.variableName}=${pivot.value}`,
      },
    } as unknown as InterviewItem);
  }, {} as Json);
  const expected = { ...expectedSimple, ...expectedPivot };
  t.deepEqual(summary.kpis, expected);
  t.end();
});

test("Participant summary contains alerts", t => {
  const participant = exampleParticipants[0];
  const summary = new ParticipantSummary(
    exampleSurvey,
    participant,
    exampleSurvey.mainWorkflow
  );
  t.true(summary.alerts.every(a => a.message));
  t.true(summary.alerts.every(a => a.interview));
  t.true(summary.alerts.every(a => a.page));
  t.end();
});

function formatSummary(r: Json, i: InterviewItem | undefined) {
  return {
    ...r,
    ...(i
      ? {
          [i.pageItem.variableName]: {
            wording: getItemWording(i),
            type: pick(getItemType(i)),
            value: i.value,
            pin: i.pageItem.pin,
            kpi: i.pageItem.kpi,
            specialValue: i.specialValue,
          },
        }
      : {}),
  };
}
