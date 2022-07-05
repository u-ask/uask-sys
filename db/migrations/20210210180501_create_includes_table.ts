import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("includes", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("pageId");
    table.integer("includedPageId");
    table.integer("pageItemId");
    table.string("context").nullable();
    table.integer("position").notNullable();
    table.unique(["surveyId", "pageId", "includedPageId", "pageItemId"]);
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("pageId").references("id").inTable("pages");
    table.foreign("includedPageId").references("id").inTable("pages");
    table.foreign("pageItemId").references("id").inTable("pageItems");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("includes");
}
