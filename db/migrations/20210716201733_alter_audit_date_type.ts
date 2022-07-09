import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.timestamp("date").alter();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.date("date").alter();
  });
}
