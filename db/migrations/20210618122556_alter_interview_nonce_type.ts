import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviews", t => {
    t.bigInteger("nonce").alter();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("interviews", t => {
    t.integer("nonce").alter();
  });
}
