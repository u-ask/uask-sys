import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex("ruleTypes").insert({ name: "copy", precedence: 110 });
}

export function down(knex: Knex): Promise<void> {
  return knex("ruleTypes").where({ name: "copy" }).delete();
}
