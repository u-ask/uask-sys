import { Survey } from "uask-dom";
import { Stealer } from "stealer";
import { ISurveyDriver } from "../../../drivers/index.js";

export class SurveyCacheDriver implements ISurveyDriver {
  private static cache = new Stealer<string, Survey>({ ttl: 7200, unref: true });
  private static currentVersion: Map<string, number> = new Map();

  constructor(private readonly driver: ISurveyDriver) {}

  async getByName(name: string): Promise<Survey> {
    const cachedSurvey = SurveyCacheDriver.cache.get(name);
    if (this.isCurrentSurvey(cachedSurvey)) return cachedSurvey;
    const survey = await this.driver.getByName(name);
    SurveyCacheDriver.cache.set(name, survey);
    if (!SurveyCacheDriver.currentVersion.has(name))
      SurveyCacheDriver.currentVersion.set(name, survey.__keys__?.version ?? 0);
    return survey;
  }

  private isCurrentSurvey(survey: Survey | undefined): survey is Survey {
    if (typeof survey == "undefined") return false;
    if (SurveyCacheDriver.currentVersion.has(survey.name))
      return (
        SurveyCacheDriver.currentVersion.get(survey.name) ==
        survey.__keys__?.version
      );
    return true;
  }

  async save(survey: Survey): Promise<Partial<Survey>> {
    const keys = await this.driver.save(survey);
    SurveyCacheDriver.cache.delete(survey.name);
    SurveyCacheDriver.currentVersion.set(
      survey.name,
      keys.__keys__?.version ?? 0
    );
    return keys;
  }
}
