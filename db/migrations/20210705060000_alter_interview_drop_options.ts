import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviews", t => {
    t.dropColumn("options");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviews", t => {
    t.string("options");
  });
}
