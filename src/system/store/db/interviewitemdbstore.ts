import { InterviewItemRow } from "./interviewitemdb.js";
import {
  DNode,
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  SpecialValue,
  Survey,
} from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { Drivers } from "./store.js";

export class InterviewItemStore {
  constructor(private readonly drivers: Drivers) {}

  saveAll(survey: Survey, participants: Participant[]): Promise<Keys[]>;
  saveAll(
    survey: Survey,
    updated: Interview,
    items: IDomainCollection<InterviewItem>
  ): Promise<Keys[]>;
  saveAll(
    survey: Survey,
    y: Participant[] | Interview,
    items?: IDomainCollection<InterviewItem>
  ): Promise<Keys[]> {
    if ("nonce" in y)
      return this.saveItems(
        survey,
        y,
        items as IDomainCollection<InterviewItem>
      );
    return this.saveParticipants(survey, y);
  }

  private saveParticipants(survey: Survey, participants: Participant[]): Promise<Keys[]> {
    return Promise.all(
      participants.map(p =>
        Promise.all(
          p.interviews.map(i =>
            Promise.all(
              i.items.map(async (t, index) => {
                const keys = await this.drivers.interviewItemDriver.save(
                  survey,
                  i,
                  t,
                  index
                );
                t.update(keys);
                return keys;
              })
            )
          )
        ).then(k => (<Keys[]>[]).concat(...k))
      )
    ).then(k => (<Keys[]>[]).concat(...k));
  }

  private saveItems(
    survey: Survey,
    updated: Interview,
    items: IDomainCollection<InterviewItem>
  ): Promise<Partial<InterviewItem>[]> {
    return Promise.all(
      items.map(
        (i, x) =>
          this.drivers.interviewItemDriver.save(
            survey,
            updated,
            i,
            x
          ) as Promise<Partial<InterviewItem>>
      )
    );
  }

  async getNodes(
    surveyKeys: KeyMap,
    keys?: KeyMap
  ): Promise<DNode<InterviewItem>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.interviewItemDriver
      .getRowsByInterview(surveyKeys, keys)
      .then(rows =>
        Promise.all(rows.map(async r => this.interviewItemRowToNode(r)))
      );
  }

  private async interviewItemRowToNode(
    row: Keys & InterviewItemRow
  ): Promise<DNode<InterviewItem>> {
    const {
      variableName,
      value,
      unit,
      specialValue,
      instance,
      context: contextJson,
      messages: messagesJson,
      __keys__,
    } = row;
    const messages = JSON.parse(messagesJson);
    const context =
      contextJson == "0" ? 0 : contextJson == "1" ? 1 : JSON.parse(contextJson);
    return {
      __keys__,
      variableName,
      instance: instance || 1,
      value: JSON.parse(value) ?? undefined,
      unit: unit ?? undefined,
      specialValue: (specialValue as SpecialValue) ?? undefined,
      context,
      messages,
    };
  }
}
