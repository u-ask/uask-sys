import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pages", table => {
    table.string("exportConfig");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pages", table => {
    table.dropColumn("exportConfig");
  });
}
