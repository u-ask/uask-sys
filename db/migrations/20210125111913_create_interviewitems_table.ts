import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("interviewItems", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("interviewId").notNullable();
    table.integer("pageItemId").notNullable();
    table.unique(["surveyId", "interviewId", "pageItemId"]);
    table.string("value").nullable();
    table.string("context").nullable();
    table.string("unit").nullable();
    table.string("specialValue").nullable();
    table.string("messages").nullable();
    table.integer("position");
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("interviewId").references("id").inTable("interviews");
    table.foreign("pageItemId").references("id").inTable("pageItems");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("interviewItems");
}
