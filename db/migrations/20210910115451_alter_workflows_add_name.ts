import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflows", t => {
    t.string("name");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflows", t => {
    t.dropColumn("name");
  });
}
