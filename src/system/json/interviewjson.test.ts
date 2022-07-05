import test from "tape";
import { ParticipantBuilder } from "uask-dom";
import { exampleParticipants, exampleSurvey } from "uask-dom/example";
import { interviewDeserialize, interviewSerialize } from "./interviewjson.js";

test("interview serialization", t => {
  exampleParticipants.forEach(p => {
    p.interviews.forEach(i => {
      const json = interviewSerialize(i);
      t.equal(json.nonce, i.nonce);
    });
  });
  t.end();
});

test("interview deserialization", t => {
  exampleParticipants.forEach(p => {
    const pb = new ParticipantBuilder(exampleSurvey, p.participantCode, p.sample);
    p.interviews.forEach((i, index) => {
      const json = interviewSerialize(i);
      interviewDeserialize(pb, json);
      const obj = pb.build().interviews[index];
      t.deepLooseEqual(obj, i);
    });
  });
  t.end();
});
