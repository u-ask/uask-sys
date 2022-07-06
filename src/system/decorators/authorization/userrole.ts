import { Survey, User, DomainCollection } from "uask-dom";
import { ISampleDriver, IUserDriver } from "../../../drivers/index.js";

export class UserRoleDriver implements IUserDriver {
  private allSamplesRoles = [
    "administrator",
    "developer",
    "superadministrator",
  ];

  constructor(
    private readonly driver: IUserDriver,
    private readonly sampleDriver: ISampleDriver
  ) {}

  async getAll(survey: Survey): Promise<User[]> {
    const users = await this.driver.getAll(survey);

    const samples = await this.sampleDriver.getAll(survey);
    return users.map(u => {
      if (this.allSamplesRoles.includes(u.role as string)) {
        return u.update({
          sampleCodes: DomainCollection(...samples.map(s => s.sampleCode)),
        });
      }
      return u;
    });
  }

  async getByUserId(survey: Survey, userid: string): Promise<User | undefined> {
    const user = await this.driver.getByUserId(survey, userid);
    if (typeof user == "undefined") return undefined;
    const samples = await this.sampleDriver.getAll(survey);
    if (this.allSamplesRoles.includes(user.role as string)) {
      return user.update({
        sampleCodes: DomainCollection(...samples.map(s => s.sampleCode)),
      });
    }
    return user;
  }

  async save(survey: Survey, user: User): Promise<Partial<User>> {
    const updatedUser = this.allSamplesRoles.includes(user.role as string)
      ? user.update({ sampleCodes: DomainCollection("__all__") })
      : user;
    return this.driver.save(survey, updatedUser);
  }
}
