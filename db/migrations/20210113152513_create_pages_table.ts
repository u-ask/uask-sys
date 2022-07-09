import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pages", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.string("name").notNullable();
    table.integer("position");
    table.unique(["surveyId", "name"]);
    table.foreign("surveyId").references("id").inTable("surveys");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pages");
}
