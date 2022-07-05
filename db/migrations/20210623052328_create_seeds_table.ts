import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("seeds", t => {
    t.integer("surveyId").primary();
    t.integer("timestamp").notNullable();
    t.foreign("surveyId").references("id").inTable("surveys");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("seeds");
}
