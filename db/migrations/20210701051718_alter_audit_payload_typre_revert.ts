import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.string("payload").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.text("payload").alter();
  });
}
