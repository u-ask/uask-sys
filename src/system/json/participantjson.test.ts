import test from "tape";
import { DomainCollection, ParticipantBuilder } from "uask-dom";
import { exampleParticipants, exampleSamples, exampleSurvey } from "uask-dom/example";
import { participantSerialize, participantDeserialize } from "./participantjson.js";

test("Participant serialization", t => {
  exampleParticipants.forEach(p => {
    const json = participantSerialize(p);
    t.deepLooseEqual(json.participantCode, p.participantCode);
  });
  t.end();
});

test("Participant deserialization", t => {
  exampleParticipants.forEach(p => {
    const json = participantSerialize(p);
    const pb = new ParticipantBuilder(
      exampleSurvey,
      DomainCollection(...exampleSamples)
    );
    participantDeserialize(pb, json);
    const obj = pb.build();
    t.deepLooseEqual(obj, p);
  });
  t.end();
});

test("Serialization without keys", t => {
  const json = participantSerialize(exampleParticipants[0], false);
  const str = JSON.stringify(json);
  t.false(/"__keys__":\{[^}]+\}/.test(str));
  t.end();
});
