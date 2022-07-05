import test from "./test-runner.js";
import { ClientDrivers } from "./driver.js";
import {
  testInterviewCreateWithItems as testInterviewCreationWithItems,
  testInterviewCreation,
  testInterviewDelete,
  testInterviewItemSubsetUpdate,
  testInterviewItemUpdate,
} from "../drivers/tests/interviewtests.js";
import { seedExample } from "../drivers/example/index.js";
import { HTTPError } from "got/dist/source";

test("Interview creation graphql driver", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewCreation(drivers, t).catch((e: HTTPError) =>
    t.fail(`${e.message} - ${e.response?.body}`)
  );
  t.end();
});

test("Interview update graphql driver", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewItemUpdate(drivers, t).catch((e: HTTPError) =>
    t.fail(`${e.message} - ${e.response?.body}`)
  );
  t.end();
});

test("Interview item subset update graphql driver", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewItemSubsetUpdate(drivers, t).catch((e: HTTPError) =>
    t.fail(`${e.message} - ${e.response?.body}`)
  );
  t.end();
});

test("Interview create with items graphql driver", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewCreationWithItems(drivers, t).catch((e: HTTPError) =>
    t.fail(`${e.message} - ${e.response?.body}`)
  );
  t.end();
});

test("Interview delete graphql driver", async (client, t) => {
  seedExample();
  const drivers = new ClientDrivers(client);
  await testInterviewDelete(drivers, t).catch((e: HTTPError) =>
    t.fail(`${e.message} - ${e.response?.body}`)
  );
  t.end();
});
