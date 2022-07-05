import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workflows", t => {
    t.string("name");
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workflows", t => {
    t.dropColumn("name");
  });
}

