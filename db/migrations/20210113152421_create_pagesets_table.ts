import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pageSets", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.string("type").notNullable();
    table.string("datevar");
    table.integer("position");
    table.unique(["surveyId", "type"]);
    table.foreign("surveyId").references("id").inTable("surveys");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pageSets");
}
