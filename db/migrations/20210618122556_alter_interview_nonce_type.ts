import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviews", t => {
    t.bigInteger("nonce").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviews", t => {
    t.integer("nonce").alter();
  });
}
