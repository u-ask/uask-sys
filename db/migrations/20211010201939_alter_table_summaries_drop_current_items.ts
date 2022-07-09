import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("summaries", t => {
    t.dropColumn("currentItems");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("summaries", t => {
    t.string("currentItems", 256000).notNullable();
  });
}
