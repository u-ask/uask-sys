import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pageItems", t => {
    t.boolean("array");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pageItems", t => {
    t.dropColumn("array");
  });
}
