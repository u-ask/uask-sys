import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("summaries", t => {
    t.string("kpis", 256000);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("summaries", t => {
    t.dropColumn("kpis");
  });
}
