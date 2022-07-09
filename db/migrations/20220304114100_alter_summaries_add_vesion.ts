import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("summaries", t => {
    t.integer("syncVersion");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("summaries", t => {
    t.dropColumn("syncVersion");
  });
}
