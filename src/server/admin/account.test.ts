import test from "../../system/store/db/test-runner.js";
import {
  getAllAccountsForSurvey,
  saveAccount,
  getAccountByUserId,
} from "./account.js";
import { Account } from "uask-auth/server";
import { seed } from "./test-utils.js";

test("GET all users", async (store, t) => {
  await seed(store);
  const users = await getAllAccountsForSurvey("P11-05", store.client);
  t.equal(users.length, 8);
  t.end();
});

test("SAVE/UPDATE user", async (store, t) => {
  await seed(store);
  const users0 = await getAllAccountsForSurvey("P11-05", store.client);
  const targetAccount0 = users0.find(u => u.email == "writer@example.com");
  t.equal(targetAccount0?.given_name, "Henriette");
  t.equal(targetAccount0?.surname, "Monsseau");
  const surveys = {
    "P11-05": { samples: ["001"], role: "writer", participants: [] },
  };
  const update = new Account(targetAccount0?.userid as string, surveys, {
    given_name: "Henri",
    surname: "Pottier",
    id: targetAccount0?.id,
    email: targetAccount0?.email,
  });
  await saveAccount(update, store.client);
  const users1 = await getAllAccountsForSurvey("P11-05", store.client);
  const targetAccount1 = users1.find(u => u.email == "writer@example.com");
  t.equal(targetAccount1?.given_name, "Henri");
  t.equal(targetAccount1?.surname, "Pottier");
  t.equal(targetAccount1?.userid, targetAccount0?.userid);
  t.end();
});

test("GET UserById", async (store, t) => {
  await seed(store);
  const user = await getAccountByUserId("administrator", store.client);
  t.equal(user?.email, "administrator@example.com");
  t.end();
});
