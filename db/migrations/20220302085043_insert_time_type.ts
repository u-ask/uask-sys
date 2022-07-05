import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex("itemTypes").insert({ name: "time" });
}

export async function down(knex: Knex): Promise<void> {
  await knex("itemTypes").where({ name: "time" }).delete();
}
