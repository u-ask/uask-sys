import test from "tape";
import { InterviewBuilder } from "uask-dom";
import { exampleParticipants, exampleSurvey } from "uask-dom/example";
import {
  interviewItemDeserialize,
  interviewItemSerialize,
} from "./interviewitemjson.js";

test("interviewItem serialization", t => {
  exampleParticipants.forEach(p => {
    p.interviews.forEach(i => {
      i.items.forEach(item => {
        const json = interviewItemSerialize(item);
        t.equal(json.variableName, item.pageItem.variableName);
      });
    });
  });
  t.end();
});

test("interviewItem deserialization", t => {
  exampleParticipants.forEach(p => {
    p.interviews.forEach(i => {
      const ib = new InterviewBuilder(exampleSurvey, i.pageSet);
      ib.init(i.nonce, i.lastInput);
      i.items.forEach(item => {
        const json = interviewItemSerialize(item);
        interviewItemDeserialize(ib, json);
      });
      const obj = ib.build([]);
      i.items.forEach((item, index) => {
        t.deepLooseEqual(obj.items[index], item);
      });
    });
  });
  t.end();
});
