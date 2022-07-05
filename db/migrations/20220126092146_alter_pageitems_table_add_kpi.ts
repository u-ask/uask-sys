import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pageItems", table => {
    table.string("kpi").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pageItems", table => {
    table.dropColumn("kpi");
  });
}
