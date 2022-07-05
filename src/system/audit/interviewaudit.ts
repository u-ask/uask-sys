import { Knex } from "knex";
import {
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  Survey,
} from "uask-dom";
import { IInterviewDriver } from "../../drivers/index.js";
import {
  IInterviewDeleteDriver,
  InterviewSaveOptions,
  PartialInterview,
} from "../../drivers/interview.js";
import { ChangeRecord, getChangeRecord } from "./payload.js";

export class InterviewAuditDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  constructor(
    private readonly driver: IInterviewDriver & IInterviewDeleteDriver,
    private client: Knex,
    readonly userId: string
  ) {}
  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items,
    options = new InterviewSaveOptions()
  ): Promise<PartialInterview> {
    const date = new Date();
    const row = this.interviewRecord(survey, participant, interview, date);
    const itemRows = this.childRecords(survey, participant, items, date);
    const keys = await this.driver.save(
      survey,
      participant,
      interview,
      items,
      options
    );
    const rows = row
      .concat(...itemRows)
      .map(r => ({ ...r, interviewId: keys[0].__keys__?.id }));
    if (rows.length) await this.client.table("audit_participants").insert(rows);
    return keys;
  }

  private interviewRecord(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    date: Date
  ) {
    const { payload, operation } = getChangeRecord(interview);
    return payload
      ? [
          {
            surveyId: survey.__keys__?.id,
            participantId: participant.__keys__?.id,
            interviewId: undefined as number | undefined,
            pageItemId: undefined as number | undefined,
            payload: JSON.stringify(payload, (k, v) =>
              k == "options" ? undefined : v
            ),
            operation: JSON.stringify(operation),
            date,
            userId: this.userId,
          },
        ]
      : [];
  }

  private childRecords(
    survey: Survey,
    participant: Participant,
    items: IDomainCollection<InterviewItem>,
    date: Date
  ) {
    const changes = items
      .map(i => {
        return {
          pageItemId: i.pageItem?.__keys__?.id,
          instance: i.pageItem?.instance,
          ...getChangeRecord(i),
        };
      })
      .filter(i => i.operation != "none");
    return changes.map(c => this.buildRecord(survey, participant, c, date));
  }

  private buildRecord(
    survey: Survey,
    participant: Participant,
    c: ChangeRecord<InterviewItem> & {
      pageItemId?: number;
      instance?: number;
    },
    date: Date
  ) {
    return {
      surveyId: survey.__keys__?.id,
      participantId: participant.__keys__?.id,
      interviewId: undefined as number | undefined,
      pageItemId: c.pageItemId,
      payload: JSON.stringify(c.payload, (key, value) =>
        typeof value == "undefined" ? null : value
      ),
      operation: JSON.stringify(c.operation),
      date,
      userId: this.userId,
      instance: c.instance,
    };
  }

  async delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    if (typeof interview.__delete__ == "undefined")
      throw "interview suppression needs a justification";
    await this.driver.delete(survey, participant, interview);
    const row = {
      surveyId: survey.__keys__?.id,
      participantId: participant.__keys__?.id,
      interviewId: undefined as number | undefined,
      pageItemId: undefined as number | undefined,
      payload: JSON.stringify({
        type: interview.pageSet.type,
        __delete__: interview.__delete__,
      }),
      operation: JSON.stringify("delete"),
      date: new Date(),
      userId: this.userId,
    };
    await this.client.table("audit_participants").insert([row]);
  }
}
