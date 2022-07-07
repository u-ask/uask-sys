import { UaskClient } from "./dist/client/index.js";
import { ParticipantBuilder } from "uask-dom";

const client = new UaskClient("http://127.0.0.1:3005");

const survey = await client.surveyDriver.getByName("First-Survey");
const sample = await client.sampleDriver.getBySampleCode(survey, "Sample-001");

const builder0 = new ParticipantBuilder(survey, "", sample)
builder0.interview("Questionnaire")
  .item("OK").value(true)
  .item("WHEN").value(new Date());
const participant = builder0.build();
const interview = participant.interviews[0];

const participantKeys = await client.participantDriver.save(survey, participant);
const participantWithCode = participant.update(participantKeys);

const interviewKeys = await client.interviewDriver.save(survey, participantWithCode, interview);
const interviewWithNonce = interview.update(interviewKeys);
const builder1 = new ParticipantBuilder(survey, participantWithCode);
builder1.interview(interviewWithNonce);

const persistedParticipant = builder1.build();
console.log(persistedParticipant);
await client.destroy();