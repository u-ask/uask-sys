import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("samples", table => {
    table.increments();
    table.string("sampleCode").notNullable();
    table.integer("surveyId").notNullable();
    table.foreign("surveyId").references("id").inTable("surveys");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("samples");
}
