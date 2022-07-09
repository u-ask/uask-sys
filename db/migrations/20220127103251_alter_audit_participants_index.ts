import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.index(["participantId"]);
    t.index(["interviewId", "pageItemId", "instance"]);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.dropIndex(["participantId"]);
    t.dropIndex(["interviewId", "pageItemId", "instance"]);
  });
}
