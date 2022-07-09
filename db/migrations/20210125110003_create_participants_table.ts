import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("participants", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("sampleId").notNullable();
    table.string("participantCode").notNullable();
    table.unique(["surveyId", "sampleId", "participantCode"]); // pour certaines études, le code participant est unique dans l'étude
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("sampleId").references("id").inTable("samples");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("participants");
}
