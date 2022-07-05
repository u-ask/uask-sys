import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.index(["participantId"]);
    t.index(["interviewId", "pageItemId", "instance"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.dropIndex(["participantId"]);
    t.dropIndex(["interviewId", "pageItemId", "instance"]);
  });
}
