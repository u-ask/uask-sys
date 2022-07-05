import { ParticipantRow } from "./participantdb.js";
import { DNode, Participant, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { SampleStore } from "./sampledbstore.js";
import { InterviewStore } from "./interviewdbstore.js";
import { ParticipantGetOptions } from "../../../drivers/participant.js";
import { Drivers } from "./store.js";

export class ParticipantStore {
  private readonly interviewStore: InterviewStore;
  private readonly sampleStore: SampleStore;

  constructor(private readonly drivers: Drivers) {
    this.interviewStore = new InterviewStore(this.drivers);
    this.sampleStore = new SampleStore(this.drivers);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get save() {
    return this.drivers.participantDriver.save.bind(this.drivers.participantDriver);
  }

  async delete(survey: Survey, participant: Participant): Promise<void> {
    for (const interview of participant.interviews)
      await this.interviewStore.delete(survey, participant, interview);
    await this.drivers.participantDriver.delete(
      survey.__keys__ as KeyMap,
      participant.__keys__ as KeyMap
    );
  }

  saveAll(survey: Survey, participants: Participant[]): Promise<Keys[]> {
    return Promise.all(
      participants.map(async p => {
        const keys = await this.drivers.participantDriver.save(survey, p);
        p.update(keys);
        return keys;
      })
    );
  }

  async getNodes(
    by: "survey" | "sample" | "participantCode",
    surveyKeys: KeyMap,
    keys: KeyMap | string | undefined,
    options: Partial<ParticipantGetOptions>
  ): Promise<DNode<Participant>[]> {
    const mapRows = (rows: ParticipantRow[]) =>
      Promise.all(rows.map(async r => this.participantRowToNode(surveyKeys, r)));

    switch (by) {
      case "survey":
        return this.drivers.participantDriver
          .getRowBySurvey(surveyKeys, options)
          .then(mapRows);
      case "sample":
        return this.drivers.participantDriver
          .getRowsBySample(surveyKeys, keys as KeyMap, options)
          .then(mapRows);
      case "participantCode":
        return this.drivers.participantDriver
          .getRowByCode(surveyKeys, keys as string)
          .then(async row => {
            if (typeof row == "undefined")
              return Promise.reject("participant not found");
            return this.participantRowToNode(surveyKeys, row);
          })
          .then(p => [p]);
    }
  }

  private async participantRowToNode(
    surveyKeys: KeyMap,
    row: Keys & ParticipantRow
  ): Promise<DNode<Participant>> {
    const { participantCode, __keys__ } = row;
    const sample = await this.sampleStore
      .getNodes({ id: row.surveyId }, "sampleId", {
        id: row.sampleId,
      })
      .then(s => s[0]);
    const interviews = await this.interviewStore.getNodes(surveyKeys, __keys__);
    return {
      participantCode,
      sample,
      interviews,
      __keys__,
    };
  }
}
