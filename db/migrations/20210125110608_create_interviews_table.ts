import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("interviews", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("participantId").notNullable();
    table.integer("pageSetId").notNullable();
    table.float("nonce").nullable();
    table.string("options").nullable();
    table.date("lastInput").nullable();
    table.integer("position");
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("participantId").references("id").inTable("participants");
    table.foreign("pageSetId").references("id").inTable("pageSets");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("interviews");
}
