import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviewItems", t => {
    t.text("value").alter();
  });
}

export function down(): Promise<void> {
  return Promise.resolve();
}
