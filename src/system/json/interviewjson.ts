import {
  DNode,
  getTranslation,
  Interview,
  InterviewItemBuilder,
  ParticipantBuilder,
} from "uask-dom";
import { interviewItemSerialize } from "./interviewitemjson.js";
import { trakDeserialize, trakDeserializeArray } from "./track.js";
import "../aspect/index.js";

export function interviewSerialize(
  interview: Interview,
  track = true
): DNode<Interview> {
  const {
    pageSet,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options,
    items,
    lastInput,
    __keys__,
    __changes__,
    ...node
  } = interview;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(node, {
    pageSetType: getTranslation(
      pageSet.type,
      "__code__",
      interview.options.defaultLang
    ) as string,
    items: [...items.map(i => interviewItemSerialize(i, track))],
    lastInput: lastInput.toISOString(),
    ...trackInfos,
  });
}

export function interviewDeserialize(
  pb: ParticipantBuilder,
  interview: DNode<Interview>
): void {
  const ib = pb.interview(interview.pageSetType);
  ib.init(interview.nonce, new Date(interview.lastInput));
  ib.items(interview.items);
  trakDeserializeArray(
    ib.interviewItems as InterviewItemBuilder[],
    interview.items
  );
  trakDeserialize(ib, interview);
}
