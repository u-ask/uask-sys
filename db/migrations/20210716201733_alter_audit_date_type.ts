import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.timestamp("date").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.date("date").alter();
  });
}
