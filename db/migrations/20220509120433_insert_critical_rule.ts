import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex("ruleTypes").insert([{ name: "critical", precedence: 70 }]);
}

export function down(knex: Knex): Promise<void> {
  return knex("ruleTypes").where({ name: "critical" }).delete();
}
