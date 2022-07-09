import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflows", t => {
    t.string("notifications", 1024);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflows", t => {
    t.dropColumn("notifications");
  });
}
