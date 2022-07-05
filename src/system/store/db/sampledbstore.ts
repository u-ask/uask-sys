import { SampleRow } from "./sampledb.js";
import { DNode, Sample, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { Drivers } from "./store.js";

export class SampleStore {
  constructor(private readonly drivers: Drivers) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get save() {
    return this.drivers.sampleDriver.save.bind(this.drivers.sampleDriver);
  }

  saveAll(survey: Survey, samples: Sample[]): Promise<Keys[]> {
    return Promise.all(
      samples.map(async sample => {
        const keys = await this.drivers.sampleDriver.save(survey, sample);
        sample.update(keys);
        return keys;
      })
    );
  }

  async getNodes(
    surveyKeys: KeyMap,
    by: "survey" | "sampleId" | "sampleCode",
    keys?: KeyMap | string
  ): Promise<DNode<Sample>[]> {
    if (by != "survey" && !keys) throw "key missing in row";
    switch (by) {
      case "survey":
        return this.drivers.sampleDriver
          .getRowsBySurvey(surveyKeys as KeyMap)
          .then(rows =>
            Promise.all(rows.map(async r => this.sampleRowToNode(r)))
          );
      case "sampleId":
        return this.drivers.sampleDriver
          .getRowById({ surveyId: surveyKeys.id, ...(keys as KeyMap) })
          .then(async row => this.sampleRowToNode(row))
          .then(s => [s]);
      case "sampleCode":
        return this.drivers.sampleDriver
          .getRowBySampleCode(surveyKeys, keys as string)
          .then(async row => this.sampleRowToNode(row))
          .then(s => [s]);
    }
  }

  private async sampleRowToNode(row: Keys & SampleRow): Promise<DNode<Sample>> {
    const { __keys__, sampleCode, name, address, frozen } = row;
    return {
      sampleCode,
      name,
      address,
      frozen,
      __keys__,
    };
  }
}
