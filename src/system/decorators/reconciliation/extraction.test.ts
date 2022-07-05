import test from "tape";
import { extractInterview, extractParticipant4Survey } from "./extraction.js";
import {
  buildInterviewWithStaleItems,
  buildParticipantWithStaleItems,
} from "./test-utils.js";

test("Extract current items for interview", t => {
  const { interview, item } = buildInterviewWithStaleItems();
  const extracted = extractInterview(interview);
  t.equal(extracted.items.length, 1);
  t.equal(extracted.items[0].pageItem, item);
  t.end();
});

test("Extract current items and interviews for participant", t => {
  const { participant, survey, pageSet, item } = buildParticipantWithStaleItems();
  const extracted = extractParticipant4Survey(participant, survey);
  t.equal(extracted.interviews.length, 1);
  t.equal(extracted.interviews[0].pageSet, pageSet);
  t.equal(extracted.interviews[0].items.length, 1);
  t.equal(extracted.interviews[0].items[0].pageItem, item);
  t.end();
});
