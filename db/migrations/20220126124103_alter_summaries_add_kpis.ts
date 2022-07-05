import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("summaries", t => {
    t.string("kpis", 256000);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("summaries", t => {
    t.dropColumn("kpis");
  });
}
