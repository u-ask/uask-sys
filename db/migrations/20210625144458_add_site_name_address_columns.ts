import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("samples", t => {
    t.string("name");
    t.string("address");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("samples", t => {
    t.dropColumn("name");
    t.dropColumn("address");
  });
}
