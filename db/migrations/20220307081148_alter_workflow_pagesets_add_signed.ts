import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflowPageSets", t => {
    t.boolean("signed");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("workflowPageSets", t => {
    t.dropColumn("signed");
  });
}
