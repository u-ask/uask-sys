import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("seeds", t => {
    t.bigInteger("timestamp").notNullable().alter();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("seeds", t => {
    t.integer("timestamp").notNullable().alter();
  });
}
