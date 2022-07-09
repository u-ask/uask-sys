import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflows", t => {
    t.dropUnique(["surveyId", "position"]);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflows", t => {
    t.unique(["surveyId", "position"]);
  });
}
