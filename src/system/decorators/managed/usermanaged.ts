import { Knex } from "knex";
import { Survey, User } from "uask-dom";
import { Account } from "uask-auth/server";
import { IUserDriver } from "../../../drivers/index.js";
import { getAccountByUserId } from "../../../server/admin/index.js";

export class UserManagedDriver implements IUserDriver {
  constructor(private readonly driver: IUserDriver, private client: Knex) {}

  getAll(survey: Survey): Promise<User[]> {
    return this.driver.getAll(survey);
  }

  getByUserId(survey: Survey, userid: string): Promise<User | undefined> {
    return this.driver.getByUserId(survey, userid);
  }

  async save(survey: Survey, user: User): Promise<Partial<User>> {
    const a = (await getAccountByUserId(
      (user.userid ?? user.email ?? user.phone) as string,
      this.client
    )) as Account;
    const updatedUser =
      a && !user.id
        ? user.update({
            name: a.surname as string,
            firstName: a.given_name as string,
            title: a.title as string,
            email: (user.email ?? a.email) as string,
            phone: (user.phone ?? a.phone) as string,
            password: a.password,
            id: a.id,
            salt: a.salt,
            email_verified: a.email_verified,
            userid: a.userid,
            extra_infos: a.extra_infos,
          })
        : user;
    return this.driver.save(survey, updatedUser);
  }
}
