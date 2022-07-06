import { Sample, Survey } from "uask-dom";
import { ISampleDriver, IUserDriver } from "../../../drivers/index.js";
import { SurveyAuthorizationManager } from "./autz.js";

export class SampleAutzDriver implements ISampleDriver {
  constructor(
    private readonly driver: ISampleDriver,
    private readonly userDriver: IUserDriver,
    private readonly userid: string
  ) {}

  getAll(survey: Survey): Promise<Sample[]> {
    return this.driver.getAll(survey);
  }

  getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample> {
    return this.driver.getBySampleCode(survey, sampleCode);
  }

  async save(survey: Survey, sample: Sample): Promise<Partial<Sample>> {
    const caller = await this.userDriver.getByUserId(survey, this.userid);
    const am = new SurveyAuthorizationManager(survey, caller);
    if (!am.canSaveSample()) return Promise.reject(am.canSaveSampleError());
    return this.driver.save(survey, sample);
  }
}
