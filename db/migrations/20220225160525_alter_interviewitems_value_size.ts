import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviewItems", t => {
    t.text("value").alter();
  });
}

export async function down(): Promise<void> {
  //
}
