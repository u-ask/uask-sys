import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("participants", t => {
    t.boolean("__deleted__").defaultTo(false);
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("participants", t => {
    t.dropColumn("__deleted__");
  });
}
