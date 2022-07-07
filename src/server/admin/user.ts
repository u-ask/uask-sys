import { Knex } from "knex";
import { DomainCollection, Survey, User } from "uask-dom";
import { Account, AccountManager } from "uask-auth/server";
import { IUserDriver } from "../../drivers/index.js";
import {
  getAllAccountsForSurvey,
  saveAccount,
  getAccountByUserId,
} from "./account.js";

export class UserTruenorthDriver implements IUserDriver {
  constructor(private client: Knex) {}

  async getAll(survey: Survey): Promise<User[]> {
    const accounts = await getAllAccountsForSurvey(survey.name, this.client);
    return accounts.map(
      a =>
        new User(
          a.surname as string,
          a.given_name as string,
          a.title as string,
          a.surveys[survey.name].role,
          a.email as string,
          a.phone as string,
          DomainCollection(...(a.surveys[survey.name].samples ?? [])),
          DomainCollection(...(a.surveys[survey.name].participants ?? [])),
          {
            password: a.password,
            id: a.id,
            salt: a.salt,
            email_verified: a.email_verified,
            userid: a.userid,
            extra_infos: a.extra_infos,
          }
        )
    );
  }

  async getByUserId(survey: Survey, userid: string): Promise<User | undefined> {
    const account = await getAccountByUserId(userid, this.client);
    if (account && survey.name in account.surveys) {
      return new User(
        account.surname as string,
        account.given_name as string,
        account.title as string,
        account.surveys[survey.name].role,
        account.email as string,
        account.phone as string,
        DomainCollection(...(account.surveys[survey.name].samples ?? [])),
        DomainCollection(...(account.surveys[survey.name].participants ?? [])),
        {
          password: account.password,
          id: account.id,
          salt: account.salt,
          email_verified: account.email_verfied,
          userid: account.userid,
          extra_infos: account.extra_infos,
        }
      );
    }
    return undefined;
  }

  async save(survey: Survey, user: User): Promise<Partial<User>> {
    const manager = new AccountManager(this.client);
    const account = await manager.getByUserid(user.userid as string);
    const surveys = account?.surveys ?? {};
    surveys[survey.name] = {
      samples: (user.sampleCodes ?? []) as string[],
      role: user.workflow,
      participants: [...(user.participantCodes ?? [])],
    };
    const userid = (user.userid ?? user.email ?? user.phone) as string;
    const update = new Account(userid, surveys, {
      surname: user.name,
      given_name: user.firstName,
      phone: user.phone,
      password: user.password,
      id: user.id,
      email: user.email,
      email_verified: user.email_verified,
      title: user.title,
      salt: user.salt,
      userid: user.userid,
      extra_infos: user.extra_infos,
    });
    await saveAccount(update, this.client);
    return user.update({ magic: update.magic });
  }
}
