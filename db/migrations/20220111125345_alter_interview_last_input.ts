import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviews", t => {
    t.timestamp("lastInput").alter();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviews", t => {
    t.date("lastInput").alter();
  });
}
