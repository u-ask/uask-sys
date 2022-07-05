import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("surveys", t => {
    t.string("options", 1024).alter();
  });
}

export async function down(): Promise<void> {
  //
}
