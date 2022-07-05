import Knex from "knex";
import { config } from "../knexclient.js";
import { AccountManager, service } from "uask-auth";
import { provider } from "uask-auth";
import { knexAdapter } from "oidc-provider-knex-adapter";
import { Notifier } from "./utils/notifier.js";

const client = Knex(config[process.env.APP_ENV ?? "development"]);
const DbAdapter = knexAdapter(client);
const manager = new AccountManager(client);
const findAccount = (ctx: unknown, id: string) =>
  manager.findOIDCAccount(ctx, id);
const oidc = provider(DbAdapter, findAccount);

export const oidcService = service(oidc, client, async (account, { code }) => {
  const notifier = new Notifier();
  await notifier.notifyAuthentCode(account, code);
});

export async function oidcClose(): Promise<void> {
  await client.destroy();
  await DbAdapter.destroy();
}
