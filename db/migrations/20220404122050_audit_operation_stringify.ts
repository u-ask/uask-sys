import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex
    .table("audit_participants")
    .where({ operation: "create" })
    .update({ operation: '"create"' });
  await knex
    .table("audit_participants")
    .where({ operation: "update" })
    .update({ operation: '"update"' });
}

export async function down(knex: Knex): Promise<void> {
  await knex
    .table("audit_participants")
    .where({ operation: '"create"' })
    .update({ operation: "create" });
  await knex
    .table("audit_participants")
    .where({ operation: '"update"' })
    .update({ operation: "update" });
}
