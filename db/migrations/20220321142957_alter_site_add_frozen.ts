import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("samples", t => {
    t.boolean("frozen").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("samples", t => {
    t.dropColumn("frozen");
  });
}
