import {
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  Sample,
  Survey,
  Workflow,
} from "uask-dom";
import {
  IInterviewDriver,
  InterviewSaveOptions,
  IUserDriver,
  PartialInterview,
} from "../../../drivers/index.js";
import { assertNoSubset } from "../../../drivers/interview.js";
import { INotifier } from "../../notifier.js";

export class InterviewNotificationDriver implements IInterviewDriver {
  constructor(
    private readonly driver: IInterviewDriver,
    private readonly userDriver: IUserDriver,
    private readonly notifier: INotifier
  ) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items: IDomainCollection<InterviewItem> = interview.items,
    options?: InterviewSaveOptions
  ): Promise<PartialInterview> {
    assertNoSubset(interview, items);
    const notifyIndex: number[] = [];
    const acknowledged = this.getNotifications(notifyIndex, interview);
    await this.notify(notifyIndex, survey, participant, interview);
    const infoKeys = await this.driver.save(
      survey,
      participant,
      acknowledged,
      undefined,
      options
    );
    return this.buidResult(infoKeys, acknowledged, interview);
  }

  private getNotifications(notifyIndex: number[], interview: Interview) {
    return interview.update({
      items: interview.items.map((i, x) => {
        if (typeof i.event == "undefined") return i;
        const prev = i.__changes__?.value ?? i.value;
        if (prev != i.value) notifyIndex.push(x);
        return i.acknowledgeEvent();
      }),
    });
  }

  private async notify(
    notifyIndex: number[],
    survey: Survey,
    participant: Participant,
    interview: Interview
  ) {
    for (const x of notifyIndex) {
      const item = interview.items[x];
      const notifyUsers = await this.getRecipients(survey, item, participant);
      for (const user of notifyUsers)
        this.notifier.notifyEvent(user, survey, participant, interview, item);
    }
  }

  private async getRecipients(
    survey: Survey,
    item: InterviewItem,
    participant: Participant
  ) {
    const workflows = survey.workflows.filter(w =>
      w.notifications.includes(item.event?.event as string)
    );
    return await this.getWorkflowUsers(survey, participant.sample, workflows);
  }

  private async getWorkflowUsers(
    survey: Survey,
    sample: Sample,
    workflows: IDomainCollection<Workflow>
  ) {
    const users = await this.userDriver.getAll(survey);
    return users.filter(
      u =>
        workflows.some(w => w.name == u.workflow) &&
        u.sampleCodes?.includes(sample.sampleCode)
    );
  }

  private buidResult(
    infoKeys: PartialInterview,
    acknowledged: Interview,
    interview: Interview
  ): PartialInterview {
    return [
      infoKeys[0],
      {
        items: infoKeys[1].items.map((k, x) =>
          acknowledged.items[x] == interview.items[x]
            ? k
            : { ...k, messages: acknowledged.items[x].messages }
        ),
      },
    ];
  }
}
