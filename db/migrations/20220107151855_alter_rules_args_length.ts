import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("rules", t => {
    t.string("args", 2048).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("rules", t => {
    t.string("args", 255).alter();
  });
}
