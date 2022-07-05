import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("surveys", table => {
    table.increments();
    table.string("name").notNullable().unique();
    table.integer("version");
    table.string("options").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("surveys");
}
