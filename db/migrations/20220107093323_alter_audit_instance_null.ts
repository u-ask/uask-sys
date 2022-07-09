import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.integer("instance").nullable().alter();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("audit_participants", t => {
    t.integer("instance").notNullable().alter();
  });
}
