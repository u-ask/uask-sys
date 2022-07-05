import { DNode, Sample, Survey } from "uask-dom";
import { ISampleDriver } from "../../drivers/index.js";
import { KeyMap } from "../aspect/keys.js";
import { Store } from "./../store/index.js";

export class SampleStoreDriver implements ISampleDriver {
  constructor(private readonly store: Store) {}

  getAll(survey: Survey): Promise<Sample[]> {
    return this.store
      .getSampleNodes(survey.__keys__ as KeyMap, "survey")
      .then(rows => rows.map(row => createSample(row as DNode<Sample>)));
  }

  getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample> {
    return this.store
      .getSampleNodes(survey.__keys__ as KeyMap, "sampleCode", sampleCode)
      .then(row => createSample(row[0]));
  }

  save(survey: Survey, sample: Sample): Promise<Partial<Sample>> {
    return this.store.saveSample(survey, sample);
  }
}

function createSample(node: DNode<Sample>): Sample {
  const { sampleCode, ...other } = node;
  return new Sample(sampleCode, { ...other });
}
