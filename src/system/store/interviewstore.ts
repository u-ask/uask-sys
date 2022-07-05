import { Interview, Participant, Survey } from "uask-dom";
import { IInterviewDriver } from "../../drivers/index.js";
import {
  IInterviewDeleteDriver,
  PartialInterview,
} from "../../drivers/interview.js";
import { Store } from "./../store/index.js";

export class InterviewStoreDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  constructor(private readonly store: Store) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items
  ): Promise<PartialInterview> {
    const nonce = interview.nonce != 0 ? interview.nonce : await newNonce();
    const position = participant.interviews.findIndex(
      i => i == interview || (i.nonce > 0 && i.nonce == interview.nonce)
    );
    const interviewKeys = await this.store.saveInterview(
      survey,
      participant,
      interview.update({ nonce }),
      position == -1 ? participant.interviews.length : position
    );
    const updated = Object.assign({}, interview, { nonce }, interviewKeys);
    const itemKeys = await this.store.saveInterviewItems(
      survey,
      updated,
      items
    );
    return [
      { nonce, ...interviewKeys },
      {
        items: itemKeys,
      },
    ];
  }

  delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    return this.store.interviewStore.delete(survey, participant, interview);
  }
}

export function newNonce(): Promise<number> {
  return Promise.resolve(Math.ceil(Math.random() * 1e16));
}
