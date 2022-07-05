import { Survey, User } from "uask-dom";
import { ISurveyDriver, IUserDriver } from "../../../drivers/index.js";
import { SurveyAuthorizationManager } from "./autz.js";

export class SurveyAutzDriver implements ISurveyDriver {
  constructor(
    private readonly driver: ISurveyDriver,
    private readonly userDriver: IUserDriver,
    private readonly userid: string
  ) {}

  getByName(name: string): Promise<Survey> {
    return this.driver.getByName(name);
  }

  save(survey: Survey): Promise<Partial<Survey>> {
    return this.driver
      .getByName(survey.name)
      .then(() => this.update(survey))
      .catch(r =>
        r == "unknown survey" ||
        (r instanceof Error && r.message == "unknown survey")
          ? this.create(survey)
          : Promise.reject(r)
      );
  }

  private async update(survey: Survey): Promise<Partial<Survey>> {
    const caller = await this.userDriver.getByUserId(survey, [], this.userid);
    const am = new SurveyAuthorizationManager(survey, caller);
    if (!am.canSaveSurvey()) return Promise.reject(am.canSaveSurveyError());
    return this.driver.save(survey);
  }

  private async create(survey: Survey): Promise<Partial<Survey>> {
    const s = await this.driver.save(survey);
    await this.userDriver.save(
      survey,
      new User("developer").update({ userid: this.userid })
    );
    return s;
  }
}
