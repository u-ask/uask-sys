import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("samples", t => {
    t.unique(["surveyId", "sampleCode"]);
  });
  await knex.schema.table("pageSets", t => {
    t.index(["surveyId"]);
  });
  await knex.schema.table("pages", t => {
    t.index(["surveyId"]);
  });
  await knex.schema.table("pageSetPages", t => {
    t.index(["pageId"]);
    t.index(["pageSetId"]);
  });
  await knex.schema.table("pageItems", t => {
    t.unique(["surveyId", "variableName"]);
  });
  await knex.schema.table("includes", t => {
    t.index(["pageId"]);
    t.index(["pageItemId"]);
    t.index(["includedPageId"]);
  });
  await knex.schema.table("rules", t => {
    t.index(["surveyId"]);
  });
  await knex.schema.table("rulePageItems", t => {
    t.index(["surveyId", "ruleHash"]);
    t.index(["pageItemId"]);
  });
  await knex.schema.table("workflows", t => {
    t.index(["surveyId"]);
  });
  await knex.schema.table("workflowPageSets", t => {
    t.index(["workflowId"]);
    t.index(["pageSetId"]);
  });
  await knex.schema.table("participants", t => {
    t.index(["surveyId"]);
  });
  await knex.schema.table("interviews", t => {
    t.index(["participantId"]);
    t.index(["pageSetId"]);
  });
  await knex.schema.table("interviewItems", t => {
    t.index(["pageItemId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("interviewItems", t => {
    t.dropIndex(["pageItemId"]);
  });
  await knex.schema.table("interviews", t => {
    t.dropIndex(["participantId"]);
    t.dropIndex(["pageSetId"]);
  });
  await knex.schema.table("participants", t => {
    t.dropIndex(["surveyId"]);
  });
  await knex.schema.table("workflowPageSets", t => {
    t.dropIndex(["workflowId"]);
    t.dropIndex(["pageSetId"]);
  });
  await knex.schema.table("workflows", t => {
    t.dropIndex(["surveyId"]);
  });
  await knex.schema.table("rulePageItems", t => {
    t.dropIndex(["surveyId", "ruleHash"]);
    t.dropIndex(["pageItemId"]);
  });
  await knex.schema.table("rules", t => {
    t.dropIndex(["surveyId"]);
  });
  await knex.schema.table("includes", t => {
    t.dropIndex(["pageId"]);
    t.dropIndex(["pageItemId"]);
    t.dropIndex(["includedPageId"]);
  });
  await knex.schema.table("pageItems", t => {
    t.dropUnique(["surveyId", "variableName"]);
  });
  await knex.schema.table("pageSetPages", t => {
    t.dropIndex(["pageId"]);
    t.dropIndex(["pageSetId"]);
  });
  await knex.schema.table("pages", t => {
    t.dropIndex(["surveyId"]);
  });
  await knex.schema.table("pageSets", t => {
    t.dropIndex(["surveyId"]);
  });
  await knex.schema.table("samples", t => {
    t.dropUnique(["surveyId", "sampleCode"]);
  });
}
