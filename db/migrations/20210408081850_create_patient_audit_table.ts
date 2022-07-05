import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("audit_participants", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("participantId").notNullable();
    table.integer("interviewId");
    table.integer("interviewItemId");
    table.string("payload").notNullable();
    table.string("operation").notNullable();
    table.string("userId").notNullable();
    table.date("date").notNullable();
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("participantId").references("id").inTable("participants");
    table.foreign("interviewId").references("id").inTable("interviews");
    table.foreign("interviewItemId").references("id").inTable("interviewItems");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("audit_participants");
}
