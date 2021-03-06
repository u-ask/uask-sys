import { Account, AccountManager } from "uask-auth/server";
import { Knex } from "knex";

function getAllAccountsForSurvey(
  surveyName: string,
  client: Knex
): Promise<Account[]> {
  const manager = new AccountManager(client);
  return manager.getBySurvey(surveyName);
}

function getAccountByUserId(
  userid: string,
  client: Knex
): Promise<Account | undefined> {
  const manager = new AccountManager(client);
  return manager.getByUserid(userid);
}

function saveAccount(account: Account, client: Knex): Promise<void> {
  const manager = new AccountManager(client);
  return manager.save(account);
}

export { getAllAccountsForSurvey, saveAccount, getAccountByUserId };
