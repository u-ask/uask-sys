import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("itemTypes", table => {
    table.increments();
    table.string("name").notNullable().unique();
  });
  const itemTypesList = [
    "text",
    "real",
    "integer",
    "date",
    "yesno",
    "scale",
    "choice",
    "glossary",
    "info",
    "context",
    "acknowledge",
  ];
  for (const itemTypes of itemTypesList) {
    await knex("itemTypes").insert([{ name: itemTypes }]);
  }
  await knex.schema.createTable("pageItems", table => {
    table.increments();
    table.integer("surveyId");
    table.integer("version");
    table.string("wording", 4096).nullable();
    table.string("variableName").notNullable();
    table.integer("typeId").nullable();
    table.string("typeArgs", 4096).nullable();
    table.string("units").nullable();
    table.string("comment", 4096).nullable();
    table.string("section").nullable();
    table.string("pin").nullable();
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("typeId").references("id").inTable("itemTypes");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("pageItems");
  await knex.schema.dropTable("itemTypes");
}
