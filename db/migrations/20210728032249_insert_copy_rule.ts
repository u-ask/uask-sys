import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex("ruleTypes").insert({ name: "copy", precedence: 110 });
}

export async function down(knex: Knex): Promise<void> {
  await knex("ruleTypes").where({ name: "copy" }).delete();
}
