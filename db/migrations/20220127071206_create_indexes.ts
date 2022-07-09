import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviewItems", t => {
    t.index("surveyId");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviewItems", t => {
    t.dropIndex("surveyId");
  });
}
