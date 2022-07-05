import runner, { Test } from "tape";
import restana from "restana";
import got, { Got } from "got";
import { generateToken } from "../server/test-sandbox.js";
import { app, appClose } from "../server/app.js";
import { ExampleDrivers } from "../drivers/example/index.js";

export { Test };

const drivers = new ExampleDrivers();
const server = app(restana(), c => c(drivers, "me"));
const service = server.start(33433);
runner.onFinish(() => {
  server.close();
  appClose();
});

export default function (
  name: string,
  fn: (g: Got, t: Test) => Promise<void>
): void {
  runner(name, async t => {
    await service;
    const token = await generateToken();
    const client = got.extend({
      prefixUrl: "http://127.0.0.1:33433",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fn(client, t).catch(t.fail);
  });
}
