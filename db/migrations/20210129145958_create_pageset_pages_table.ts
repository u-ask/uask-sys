import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pageSetPages", table => {
    table.integer("surveyId").notNullable();
    table.integer("pageSetId").notNullable();
    table.integer("pageId").notNullable();
    table.boolean("mandatory").notNullable();
    table.integer("position");
    table.unique(["surveyId", "pageSetId", "pageId"]);
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("pageSetId").references("id").inTable("pageSets");
    table.foreign("pageId").references("id").inTable("pages");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pageSetPages");
}
