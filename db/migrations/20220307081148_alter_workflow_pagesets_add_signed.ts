import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workflowPageSets", t => {
    t.boolean("signed");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workflowPageSets", t => {
    t.dropColumn("signed");
  });
}
