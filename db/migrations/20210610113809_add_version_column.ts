import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pageSets", t => {
    t.integer("version");
  });
  await knex.schema.alterTable("pageSetPages", t => {
    t.integer("version");
  });
  await knex.schema.alterTable("pages", t => {
    t.integer("version");
  });
  await knex.schema.alterTable("workflows", t => {
    t.integer("version");
  });
  await knex.schema.alterTable("workflowPageSets", t => {
    t.integer("version");
  });
  await knex.schema.alterTable("includes", t => {
    t.integer("version");
  });
  await knex.schema.alterTable("rulePageItems", t => {
    t.integer("version");
  });
  await knex
    .table("surveys")
    .then(r =>
      Promise.all(
        r.map(s =>
          Promise.all([
            knex
              .table("pageSets")
              .where("surveyId", s.id)
              .update("version", s.version),
            knex
              .table("pageSetPages")
              .where("surveyId", s.id)
              .update("version", s.version),
            knex
              .table("pages")
              .where("surveyId", s.id)
              .update("version", s.version),
            knex
              .table("workflows")
              .where("surveyId", s.id)
              .update("version", s.version),
            knex
              .table("workflowPageSets")
              .where("surveyId", s.id)
              .update("version", s.version),
            knex
              .table("includes")
              .where("surveyId", s.id)
              .update("version", s.version),
            knex
              .table("rulePageItems")
              .where("surveyId", s.id)
              .update("version", s.version),
          ])
        )
      )
    );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("pageSets", t => {
    t.dropColumn("version");
  });
  await knex.schema.alterTable("pageSetPages", t => {
    t.dropColumn("version");
  });
  await knex.schema.alterTable("pages", t => {
    t.dropColumn("version");
  });
  await knex.schema.alterTable("workflows", t => {
    t.dropColumn("version");
  });
  await knex.schema.alterTable("workflowPageSets", t => {
    t.dropColumn("version");
  });
  await knex.schema.alterTable("includes", t => {
    t.dropColumn("version");
  });
  await knex.schema.alterTable("rulePageItems", t => {
    t.dropColumn("version");
  });
}
