import { DNode, InterviewBuilder, InterviewItem } from "uask-dom";

import { trakDeserialize } from "./track.js";
import "../aspect/index.js";

export function interviewItemSerialize(
  interviewItem: InterviewItem,
  track = true
): DNode<InterviewItem> {
  const {
    pageItem,
    value,
    unit,
    specialValue,
    context,
    messages,
    __keys__,
    __changes__,
    ...node
  } = interviewItem;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(
    node,
    {
      variableName: pageItem.variableName,
      instance: pageItem.instance,
      ...trackInfos,
    },
    typeof value != "undefined"
      ? value instanceof Date
        ? { value: isNaN(value.getTime()) ? undefined : value.toISOString() }
        : { value }
      : {},
    unit ? { unit } : {},
    specialValue ? { specialValue } : {},
    context ? { context } : {},
    messages ? { messages } : {}
  );
}

export function interviewItemDeserialize(
  ib: InterviewBuilder,
  interviewItem: DNode<InterviewItem>
): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const b = ib
    .item(interviewItem.variableName, interviewItem.instance)
    .context(interviewItem.context);
  if (typeof interviewItem.value != "undefined") b.value(interviewItem.value);
  if (typeof interviewItem.unit != "undefined") b.unit(interviewItem.unit);
  if (typeof interviewItem.specialValue != "undefined")
    b.specialValue(interviewItem.specialValue);
  if (typeof interviewItem.messages != "undefined")
    b.messages(interviewItem.messages);

  trakDeserialize(b, interviewItem);
}
