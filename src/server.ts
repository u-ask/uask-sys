import restana from "restana";
import { config } from "./knexclient.js";
import Knex from "knex";
import { app, startWorker, txDriverFactory } from "./server/index.js";

const client = Knex(config[process.env.APP_ENV ?? "development"]);
const port = parseInt(process.env.PORT || "3000");
app(restana(), txDriverFactory(client)).start(port);

startWorker();
