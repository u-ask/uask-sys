import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("samples", t => {
    t.boolean("frozen").defaultTo(false);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("samples", t => {
    t.dropColumn("frozen");
  });
}
