import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("samples", t => {
    t.string("name");
    t.string("address");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("samples", t => {
    t.dropColumn("name");
    t.dropColumn("address");
  });
}
