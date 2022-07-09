import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex("itemTypes").insert({ name: "time" });
}

export function down(knex: Knex): Promise<void> {
  return knex("itemTypes").where({ name: "time" }).delete();
}
