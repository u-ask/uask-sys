import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pages", table => {
    table.string("exportConfig");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pages", table => {
    table.dropColumn("exportConfig");
  });
}
