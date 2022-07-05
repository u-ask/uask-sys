import { Survey, Sample } from "uask-dom";
import {
  ISampleDriver,
  ISummaryDriver,
  IUserDriver,
  ParticipantGetOptions,
  ParticipantSummary,
} from "../../../drivers/index.js";
import { SurveyAuthorizationManager } from "./autz.js";

export class SummaryAutzDriver implements ISummaryDriver {
  constructor(
    readonly driver: ISummaryDriver,
    readonly sampleDriver: ISampleDriver,
    readonly uderDriver: IUserDriver,
    readonly userId: string
  ) {}

  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<ParticipantSummary[]>;
  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    select?: (keyof ParticipantSummary)[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Partial<ParticipantSummary>[]>;
  async getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    x?: (keyof ParticipantSummary)[] | Partial<ParticipantGetOptions>,
    y?: Partial<ParticipantGetOptions>
  ): Promise<Partial<ParticipantSummary>[]> {
    const am = await this.getAutz(survey);
    if (sample && !am.canReadSample(sample.sampleCode))
      return Promise.reject(am.canReadSampleError(sample.sampleCode));
    const select = Array.isArray(x) ? x : [];
    const options = Array.isArray(x) ? y : x;
    const summaries = await this.driver.getParticipantSummaries(
      survey,
      sample,
      select.length > 0 ? [...select, "sampleCode"] : [],
      options
    );
    return summaries
      .filter(s => am.canReadSample(s.sampleCode as string))
      .map(s => this.restoreSelect(s, select));
  }

  private async getAutz(survey: Survey) {
    const samples = await this.sampleDriver.getAll(survey);
    const user = await this.uderDriver.getByUserId(survey, samples, this.userId);
    return new SurveyAuthorizationManager(survey, user);
  }

  private restoreSelect(
    s: Partial<ParticipantSummary>,
    select: (keyof ParticipantSummary)[]
  ): Partial<ParticipantSummary> {
    if (select.length > 0 && !select.includes("sampleCode")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sampleCode, ...o } = s;
      return o;
    }
    return s;
  }
}
