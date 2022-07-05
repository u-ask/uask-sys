import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workflows", t => {
    t.dropUnique(["surveyId", "position"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workflows", t => {
    t.unique(["surveyId", "position"]);
  });
}
