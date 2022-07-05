import { Knex } from "knex";
import { Replay, ReplayDrivers } from "../../src/server/replay/replay.js";
import debug from "debug";
const dlog = debug("uask:migrate");

export async function up(knex: Knex): Promise<void> {
  const surveyNames = await knex.table("surveys").select("name");
  for (const { name } of surveyNames) {
    const drivers = new ReplayDrivers(knex);
    const survey = await drivers.surveyDriver.getByName(name);
    const doReplay = Replay.replay(drivers, survey, { summaries: true });
    for await (const { participants } of doReplay) {
      const { sofar, count } = participants;
      dlog(`participant replayed: ${sofar} / ${count}`);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function down(): Promise<void> {}
