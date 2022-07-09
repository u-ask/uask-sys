import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("summaries", t => {
    t.integer("surveyId").references("id").inTable("surveys");
    t.integer("sampleId").references("id").inTable("samples");
    t.integer("participantId")
      .primary()
      .references("id")
      .inTable("participants");
    t.string("participantCode").notNullable();
    t.string("sampleCode").notNullable();
    t.integer("interviewCount").notNullable();
    t.integer("completedInterviewCount").notNullable();
    t.string("currentInterview", 100000).notNullable();
    t.string("pins", 100000).notNullable();
    t.string("currentItems", 100000).notNullable();
    t.string("alerts", 100000).notNullable();
    t.boolean("included").notNullable();
    t.date("inclusionDate");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("summaries");
}
