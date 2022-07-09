import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("surveys", t => {
    t.string("options", 1024).alter();
  });
}

export function down(): Promise<void> {
  return Promise.resolve();
}
