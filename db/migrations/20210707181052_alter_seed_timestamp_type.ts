import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("seeds", t => {
    t.bigInteger("timestamp").notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("seeds", t => {
    t.integer("timestamp").notNullable().alter();
  });
}
