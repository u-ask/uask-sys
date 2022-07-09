import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.dropForeign(["interviewId", "pageItemId", "instance"]);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.foreign(["interviewId", "pageItemId", "instance"])
      .references(["interviewId", "pageItemId", "instance"])
      .inTable("interviewItems");
  });
}
