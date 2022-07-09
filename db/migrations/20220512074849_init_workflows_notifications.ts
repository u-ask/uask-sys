import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex("workflows")
    .whereNull("notifications")
    .update({ notifications: JSON.stringify([]) });
}

export function down(): Promise<void> {
  return Promise.resolve();
}
