import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pageItems", t => {
    t.boolean("array");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pageItems", t => {
    t.dropColumn("array");
  });
}
