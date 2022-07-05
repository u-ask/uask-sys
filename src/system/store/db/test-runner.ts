import runner, { Test } from "tape";
import Knex from "knex";
import { config } from "../../../knexclient.js";
import { Store } from "./store.js";

const client = Knex(config[process.env.APP_ENV ?? "development"]);
runner.onFinish(async () => await client.destroy());

type TestFn = (store: Store, t: Test) => Promise<void>;

const test = function (name: string, f: false | TestFn, g?: TestFn): void {
  runner(name, async t => {
    if (process.env.NOTX == "True" || f === false) {
      await ((f || g) as TestFn)(new Store(client), t).catch(t.fail);
    } else {
      await client.transaction(tx => f(new Store(tx), t)).catch(t.fail);
    }
  });
};

test.notx = test;

test.tape = runner;

export default test;
