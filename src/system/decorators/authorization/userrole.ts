import { Survey, User, Sample, DomainCollection } from "uask-dom";
import { IUserDriver } from "../../../drivers/index.js";

export class UserRoleDriver implements IUserDriver {
  private allSamplesRoles = [
    "administrator",
    "developer",
    "superadministrator",
  ];

  constructor(private readonly driver: IUserDriver) {}

  async getAll(survey: Survey, samples: Sample[]): Promise<User[]> {
    const users = await this.driver.getAll(survey, samples);

    return users.map(u =>
      this.allSamplesRoles.includes(u.role as string)
        ? u.update({
            sampleCodes: DomainCollection(...samples.map(s => s.sampleCode)),
          })
        : u
    );
  }

  async getByUserId(
    survey: Survey,
    samples: Sample[],
    userid: string
  ): Promise<User | undefined> {
    const user = await this.driver.getByUserId(survey, samples, userid);
    return this.allSamplesRoles.includes(user?.role as string)
      ? user?.update({
          sampleCodes: DomainCollection(...samples.map(s => s.sampleCode)),
        })
      : user;
  }

  async save(survey: Survey, user: User): Promise<Partial<User>> {
    const updatedUser = this.allSamplesRoles.includes(user.role as string)
      ? user.update({ sampleCodes: DomainCollection("__all__") })
      : user;
    return this.driver.save(survey, updatedUser);
  }
}
