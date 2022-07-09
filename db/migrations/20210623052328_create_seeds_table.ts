import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("seeds", t => {
    t.integer("surveyId").primary();
    t.integer("timestamp").notNullable();
    t.foreign("surveyId").references("id").inTable("surveys");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("seeds");
}
