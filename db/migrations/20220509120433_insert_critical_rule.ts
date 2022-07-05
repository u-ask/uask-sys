import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex("ruleTypes").insert([{ name: "critical", precedence: 70 }]);
}

export async function down(knex: Knex): Promise<void> {
  await knex("ruleTypes").where({ name: "critical" }).delete();
}
