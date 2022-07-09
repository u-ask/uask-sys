import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("documents", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.bigInteger("hash").notNullable();
    table.string("name").notNullable();
    table.string("title").notNullable();
    table.string("tags");
    table.binary("content");
    table.unique(["surveyId", "hash"]);
    table.foreign("surveyId").references("id").inTable("surveys");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("documents");
}
