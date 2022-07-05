import { Sample, Survey } from "uask-dom";
import { errorMessage, ISampleDriver } from "../../client.js";
import { doImport } from "./surveyex.js";

export class SampleExampleDriver implements ISampleDriver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAll(survey: Survey): Promise<Sample[]> {
    return doImport(survey.name).then(i => [...i.samples]);
  }

  getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample> {
    return doImport(survey.name)
      .then(i => i.samples.find(s => s.sampleCode == sampleCode))
      .then(s => s ?? Promise.reject([errorMessage("unknown sample")]));
  }

  save(survey: Survey, sample: Sample): Promise<Partial<Sample>> {
    return doImport(survey.name).then(i => {
      const x = i.samples.findIndex(s => s.sampleCode == sample.sampleCode);
      const s = sample.update({ __untrack__: true });
      if (x == -1) i.samples.push(s);
      else i.samples[x] = s;
      return s;
    });
  }
}
