import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("workflowTypes", table => {
    table.increments();
    table.string("type").notNullable().unique();
  });
  const workflowTypesList = ["info", "one", "many", "startsWith", "endsWith"];
  for (const type of workflowTypesList) {
    await knex("workflowTypes").insert([{ type: JSON.stringify(type) }]);
  }
  await knex.schema.createTable("workflows", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("position").notNullable();
    table.unique(["surveyId", "position"]);
    table.foreign("surveyId").references("id").inTable("surveys");
  });
  await knex.schema.createTable("workflowPageSets", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("workflowId").notNullable();
    table.integer("workflowTypeId").notNullable(); // "info , one, startswith , many or endsWith "
    table.integer("pageSetId").notNullable();
    table.unique(["surveyId", "workflowId", "workflowTypeId", "pageSetId"]);
    table.integer("position");
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("workflowId").references("id").inTable("workflows");
    table.foreign("pageSetId").references("id").inTable("pageSets");
    table.foreign("workflowTypeId").references("id").inTable("workflowTypes");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("workflowPageSets");
  await knex.schema.dropTable("workflows");
  await knex.schema.dropTable("workflowTypes");
}
