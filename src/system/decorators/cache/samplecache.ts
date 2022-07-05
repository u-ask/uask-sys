import { Survey, Sample } from "uask-dom";
import { Stealer } from "stealer";
import { ISampleDriver } from "../../../drivers/index.js";
import { errorMessage } from "../../errors.js";

export class SampleCacheDriver implements ISampleDriver {
  private static cache: Stealer<string, Sample[]>;

  static _init(): void {
    SampleCacheDriver.cache = new Stealer<string, Sample[]>({
      ttl: 600,
      unref: true,
    });
  }

  constructor(private readonly driver: ISampleDriver) {}

  async getAll(survey: Survey): Promise<Sample[]> {
    const cachedSamples = SampleCacheDriver.cache.get(survey.name);
    if (typeof cachedSamples != "undefined") return cachedSamples;
    const samples = await this.driver.getAll(survey);
    SampleCacheDriver.cache.set(survey.name, samples);
    return samples;
  }

  async getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample> {
    const samples = await this.getAll(survey);
    return (
      samples.find(s => s.sampleCode == sampleCode) ??
      Promise.reject([errorMessage("unknown sample")])
    );
  }

  async save(survey: Survey, sample: Sample): Promise<Partial<Sample>> {
    const keys = await this.driver.save(survey, sample);
    SampleCacheDriver.cache.delete(survey.name);
    return keys;
  }
}

SampleCacheDriver._init();
