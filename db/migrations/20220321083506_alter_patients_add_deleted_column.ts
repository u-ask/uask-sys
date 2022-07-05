import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("participants", t => {
    t.boolean("__deleted__").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("participants", t => {
    t.dropColumn("__deleted__");
  });
}
