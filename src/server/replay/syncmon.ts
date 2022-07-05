import knex, { Knex } from "knex";
import { config } from "../../knexclient.js";
import { SummaryDbDriver } from "../../system/server.js";
import { IReplayDrivers, ReplayDrivers } from "./replay.js";
import { ReplayWorker, WorkerResult } from "./worker.js";

const replaySliceSize = parseInt(process.env.REPLAY_SLICE_SIZE ?? "5");

const driverFactory = (function () {
  const client = knex(config[process.env.APP_ENV ?? "development"]);
  let tx: Knex.Transaction | undefined;

  async function* driverFactory(
    f: (drivers: IReplayDrivers) => WorkerResult
  ): WorkerResult {
    tx = await client.transaction();
    try {
      const drivers = new ReplayDrivers(tx);
      yield* f(drivers);
      await tx.commit();
    } catch (e) {
      await tx?.rollback();
      throw e;
    } finally {
      tx = undefined;
    }
  }

  driverFactory.destroy = async function () {
    await tx?.rollback();
    await client.destroy();
    tx = undefined;
  };

  const summaryDriver = new SummaryDbDriver(client);
  driverFactory.getOutOfSync = function () {
    return summaryDriver.getOutOfSync();
  };

  return driverFactory;
})();

const worker = new ReplayWorker(
  driverFactory,
  () => driverFactory.getOutOfSync(),
  replaySliceSize
);

process.once("message", async () => {
  await worker.loop.return();
});

const consume = async () => {
  const r = await worker.loop.next().catch(e => worker.loop.return(e));
  if (r.done) {
    if (typeof r.value != "undefined") {
      console.error("Replay worker error:");
      console.error(r.value);
    }
    await driverFactory.destroy();
    process.send?.("DONE");
  } else setTimeout(consume, 300);
};

consume();
