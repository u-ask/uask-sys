import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex("itemTypes").insert({ name: "image" });
}

export function down(knex: Knex): Promise<void> {
  return knex("itemTypes").where({ name: "image" }).delete();
}
