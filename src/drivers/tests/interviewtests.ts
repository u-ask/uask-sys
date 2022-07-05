import {
  getTranslation,
  getItem,
  PageItem,
  PageSet,
  Interview,
  InterviewItem,
  ParticipantBuilder,
  DomainCollection,
} from "uask-dom";
import { Test } from "tape";
import { IDrivers } from "../index.js";

export async function testInterviewItemUpdate(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews.find(
    i => getTranslation(i.pageSet.type) == "Follow Up"
  ) as Interview;
  const item = interview.items.find(
    i => i.pageItem.variableName == "VDATE"
  ) as InterviewItem;
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const updated = interview.update({
    items: interview.items.update(i =>
      i == item ? i.update({ value: date }) : i
    ),
  });
  const keys = await drivers.interviewDriver.save(survey, participant, updated);
  t.equals(keys[1].items?.length, interview.items.length);
  const dbParticipant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const dbInterview = dbParticipant.interviews.find(
    i => i.nonce == interview.nonce
  ) as Interview;
  t.deepEqual(
    dbInterview?.items.find(i => i.pageItem.variableName == "VDATE")?.value,
    date
  );
}

export async function testInterviewItemSubsetUpdate(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews.find(
    i => getTranslation(i.pageSet.type) == "Follow Up"
  ) as Interview;
  const item = interview.items.find(
    i => i.pageItem.variableName == "VDATE"
  ) as InterviewItem;
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const updated = item.update({ value: date });
  const keys = await drivers.interviewDriver.save(
    survey,
    participant,
    interview,
    DomainCollection(updated)
  );
  t.equals(keys[1].items?.length, 1);
}

export async function testInterviewCreation(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const pageSet = survey.pageSets.find(
    p => getTranslation(p.type, "en") == "Follow Up"
  ) as PageSet;
  const items = pageSet.items.map(
    i => new InterviewItem(getItem(i), undefined)
  );
  const interview = new Interview(pageSet, {}, { items: items });
  const keys = await drivers.interviewDriver.save(
    survey,
    participant,
    interview
  );
  const updated = interview.update(keys);
  t.true(updated.nonce > 0);
}

export async function testInterviewCreateWithItems(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000014"
  );
  const pageSet = survey.pageSets.find(
    p => getTranslation(p.type, "en") == "Inclusion"
  ) as PageSet;
  const ageItem = pageSet.items.find(
    i => getItem(i).variableName == "AGE"
  ) as PageItem;
  const inclItem = pageSet.items.find(
    i => getItem(i).variableName == "__INCLUDED"
  ) as PageItem;
  const items = pageSet.items.map(i => {
    const pi = getItem(i);
    return new InterviewItem(
      pi,
      pi == ageItem || pi == inclItem ? true : undefined
    );
  });
  const interview = new Interview(pageSet, {}, { items });
  const interviewKeys = await drivers.interviewDriver.save(
    survey,
    participant,
    interview
  );
  const newInterview = interview.update(interviewKeys);
  const newParticipant = new ParticipantBuilder(survey, participant)
    .interview(newInterview)
    .build();
  t.equals(newParticipant.interviews.length, 1);
}

export async function testInterviewDelete(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const deleted = participant.interviews[0].update({ __delete__: "test" });
  await drivers.interviewDriver.delete(survey, participant, deleted);
  const p = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    participant.participantCode
  );
  t.equal(p.interviews.length, participant.interviews.length - 1);
  t.ok(p.interviews.every(i => i.nonce != participant.interviews[0].nonce));
}
