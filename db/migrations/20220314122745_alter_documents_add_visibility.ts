import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("documents", t => {
    t.boolean("visibility").defaultTo(true);
    t.dropPrimary();
    t.dropColumn("id");
    t.primary(["surveyId", "hash"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("documents", t => {
    t.dropColumn("visibility");
    t.dropPrimary();
  });
  await knex.schema.alterTable("documents", t => {
    t.increments("id").primary();
  });
}
