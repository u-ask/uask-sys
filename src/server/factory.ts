import { Knex } from "knex";
import { IDrivers } from "../drivers/index.js";
import { ServerDrivers } from "./driver.js";

export type Consumer<T> = (drivers: IDrivers, userid: string) => Promise<T>;

export type DriverFactory = <T>(
  consumer: Consumer<T>,
  ...args: unknown[]
) => Promise<T>;

export function txDriverFactory(client: Knex): DriverFactory {
  return <T>(
    consumer: Consumer<T>,
    ctx: unknown,
    opt: unknown = { atomic: false }
  ): Promise<T> => {
    const userid = getUserid(ctx);
    const { atomic } = opt as { atomic: boolean };

    return client.transaction(
      tx => {
        const drivers = new ServerDrivers(tx, userid);
        const tryConsumer = () => consumer(drivers, userid);
        const firstTry = tryConsumer();
        return atomic ? firstTry.catch(tryConsumer) : firstTry;
      },
      {
        isolationLevel: atomic ? "serializable" : "read committed",
      }
    );
  };
}

function getUserid(ctx: unknown) {
  const {
    res: { locals },
  } = ctx as { res: { locals?: { userinfo?: { userid: string } } } };
  return locals?.userinfo?.userid ?? "system";
}
