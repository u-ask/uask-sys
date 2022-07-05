import { Sample, Survey } from "uask-dom";

interface ISampleDriver {
  getAll(survey: Survey): Promise<Sample[]>;
  getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample>;
  save(survey: Survey, sample: Sample): Promise<Partial<Sample>>;
}

export { ISampleDriver };
