import { Survey, User, Sample } from "uask-dom";
import { IUserDriver } from "../../../drivers/index.js";
import { SurveyAuthorizationManager } from "./autz.js";

export class UserAutzDriver implements IUserDriver {
  constructor(
    private readonly driver: IUserDriver,
    private readonly callerid: string
  ) {}

  getAll(survey: Survey, samples: Sample[]): Promise<User[]> {
    return this.driver.getAll(survey, samples);
  }

  getByUserId(
    survey: Survey,
    samples: Sample[],
    userid: string
  ): Promise<User | undefined> {
    return this.driver.getByUserId(survey, samples, userid);
  }

  async save(survey: Survey, user: User): Promise<Partial<User>> {
    const caller = await this.getByUserId(survey, [], this.callerid);
    const am = new SurveyAuthorizationManager(survey, caller);
    if (user.userid != this.callerid && !am.canSaveUser())
      return Promise.reject(am.canSaveUserError());
    return this.driver.save(survey, user);
  }
}
