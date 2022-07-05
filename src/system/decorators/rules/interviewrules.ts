import {
  Survey,
  Participant,
  Interview,
  execute,
  InterviewItem,
} from "uask-dom";
import {
  IInterviewDriver,
  IParticipantDriver,
} from "../../../drivers/index.js";
import {
  assertNoSubset,
  IInterviewDeleteDriver,
  InterviewSaveOptions,
  PartialInterview,
} from "../../../drivers/interview.js";

export class InterviewRuleDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  constructor(
    private readonly driver: IInterviewDriver & IInterviewDeleteDriver,
    private readonly participantDriver: IParticipantDriver,
    private readonly participantCache: {
      set(survey: Survey, participant: Participant): void;
    }
  ) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items,
    options = new InterviewSaveOptions()
  ): Promise<PartialInterview> {
    assertNoSubset(interview, items);
    const updated = this.updateParticipant(participant, interview);
    const synchronized = this.executeRules(survey, updated, interview);
    const allKeys = await this.saveAll(survey, synchronized, options);
    const interviewIndex = this.findInterviewIndex(updated, interview);
    return this.getKeysWithItemValues(
      allKeys[interviewIndex],
      synchronized.interviews[interviewIndex]
    );
  }

  private updateParticipant(participant: Participant, interview: Interview) {
    return participant.update({
      interviews:
        interview.nonce == 0
          ? participant.interviews.append(interview)
          : participant.interviews.update(i =>
              interview.nonce == i.nonce ? interview : i
            ),
    });
  }

  private async saveAll(
    survey: Survey,
    participant: Participant,
    options: InterviewSaveOptions
  ) {
    const participantKeys = await this.participantDriver.save(
      survey,
      participant
    );
    const interviewKeys: PartialInterview[] = [];

    for (const interview of participant.interviews) {
      const keys = await this.driver.save(
        survey,
        participant,
        interview,
        undefined,
        options
      );
      interviewKeys.push(keys);
    }
    const interviews = participant.interviews.map((i, x) =>
      i.update(interviewKeys[x])
    );
    this.participantCache.set(
      survey,
      participant.update({ ...participantKeys, interviews })
    );
    return interviewKeys;
  }

  private getKeysWithItemValues(keys: PartialInterview, i: Interview) {
    const items = this.addItemValues(keys[1].items, i);
    return [keys[0], { items }] as PartialInterview;
  }

  private addItemValues(ret: Partial<InterviewItem>[], i: Interview) {
    return ret.map((k, x) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __changes__, pageItem, ...o } = i.items[x];
      return {
        ...k,
        ...o,
        __untrack__: true,
      };
    });
  }

  private findInterviewIndex(participant: Participant, interview: Interview) {
    return participant.interviews.findIndex((_, i, interviews) =>
      this.isIthInterview(interviews, i, interview)
    );
  }

  private isIthInterview(
    interviews: Interview[],
    i: number,
    interview: Interview
  ): unknown {
    return (
      (interview.nonce == 0 && i == interviews.length - 1) ||
      interviews[i].nonce == interview.nonce
    );
  }

  async delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    await this.driver.delete(survey, participant, interview);
    const updated = participant.update({
      interviews: participant.interviews.delete(
        i => i.nonce == interview.nonce
      ),
    });
    const synchronized = this.executeRules(survey, updated);
    await this.saveAll(survey, synchronized, { strict: false });
  }

  private executeRules(
    survey: Survey,
    updated: Participant,
    interview?: Interview
  ) {
    return execute(survey.rules, updated, ["always"], interview);
  }
}
