import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviewItems", t => {
    t.index("surveyId");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviewItems", t => {
    t.dropIndex("surveyId");
  });
}
