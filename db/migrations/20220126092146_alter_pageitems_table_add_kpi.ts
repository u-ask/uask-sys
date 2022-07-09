import { Knex } from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pageItems", table => {
    table.string("kpi").nullable();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pageItems", table => {
    table.dropColumn("kpi");
  });
}
