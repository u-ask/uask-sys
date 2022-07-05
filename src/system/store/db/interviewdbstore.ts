import { InterviewRow } from "./interviewdb.js";
import {
  DNode,
  getTranslation,
  Interview,
  Participant,
  Survey,
} from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { InterviewItemStore } from "./interviewitemdbstore.js";
import { Drivers } from "./store.js";

export class InterviewStore {
  private readonly interviewItemStore: InterviewItemStore;

  constructor(private readonly drivers: Drivers) {
    this.interviewItemStore = new InterviewItemStore(this.drivers);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get save() {
    return this.drivers.interviewDriver.save.bind(this.drivers.interviewDriver);
  }

  async saveAll(survey: Survey, participants: Participant[]): Promise<void> {
    await Promise.all(
      participants.map(async p => {
        for (let i = 0; i < p.interviews.length; i++) {
          const interview = p.interviews[i];
          const keys = await this.drivers.interviewDriver.save(
            survey,
            p,
            interview,
            i
          );
          interview.update(keys);
        }
      })
    );
  }

  async delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    await this.drivers.interviewItemDriver.delete(survey.__keys__ as KeyMap, [
      interview.__keys__ as KeyMap,
    ]);
    await this.drivers.interviewDriver.delete(survey.__keys__ as KeyMap, [
      interview.__keys__ as KeyMap,
    ]);
  }

  async getNodes(
    surveyKeys: KeyMap,
    keys?: KeyMap
  ): Promise<DNode<Interview>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.interviewDriver
      .getRowByParticipant(surveyKeys, keys)
      .then(rows =>
        Promise.all(rows.map(async r => this.interviewRowToNode(surveyKeys, r)))
      );
  }

  private async interviewRowToNode(
    surveyKeys: KeyMap,
    row: Keys & InterviewRow
  ): Promise<DNode<Interview>> {
    const { nonce, options, pageSetType, lastInput, __keys__ } = row;
    const config = JSON.parse(options);
    const items = await this.interviewItemStore.getNodes(surveyKeys, __keys__);
    return {
      nonce,
      __keys__,
      pageSetType: getTranslation(
        pageSetType,
        "__code__",
        config.defaultLang
      ) as string,
      items,
      lastInput: new Date(lastInput).toISOString(),
    };
  }
}
