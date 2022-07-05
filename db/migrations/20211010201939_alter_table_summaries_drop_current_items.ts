import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("summaries", t => {
    t.dropColumn("currentItems");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("summaries", t => {
    t.string("currentItems", 256000).notNullable();
  });
}
