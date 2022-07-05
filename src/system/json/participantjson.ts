import { DNode, Participant, ParticipantBuilder } from "uask-dom";
import { interviewDeserialize, interviewSerialize } from "./interviewjson.js";
import { trakDeserialize } from "./track.js";
import "../aspect/index.js";

export function participantSerialize(
  participant: Participant,
  track = true
): DNode<Participant> {
  const { interviews, __keys__, __changes__, ...node } = participant;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(node, {
    interviews: [...interviews.map(p => interviewSerialize(p, track))],
    ...trackInfos,
  });
}

export function participantDeserialize(
  pb: ParticipantBuilder,
  participant: DNode<Participant>
): void {
  pb.init(participant.participantCode, participant.sample.sampleCode);

  participant.interviews.forEach(i => {
    interviewDeserialize(pb, i);
  });

  trakDeserialize(pb, participant);
}
