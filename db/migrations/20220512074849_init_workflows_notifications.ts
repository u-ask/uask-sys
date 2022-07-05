import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex("workflows")
    .whereNull("notifications")
    .update({ notifications: JSON.stringify([]) });
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function down(): Promise<void> {}
