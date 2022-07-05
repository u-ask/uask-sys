import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("summaries", t => {
    t.integer("syncVersion");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("summaries", t => {
    t.dropColumn("syncVersion");
  });
}
