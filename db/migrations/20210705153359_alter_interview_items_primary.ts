import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.table("audit_participants").delete();
  await knex.schema.alterTable("interviewItems", t => {
    t.unique(["interviewId", "pageItemId"]);
  });
  await knex.schema.alterTable("audit_participants", t => {
    t.integer("pageItemId");
    t.dropForeign(["surveyId"]);
    t.dropForeign(["interviewId"]);
    t.dropForeign(["interviewItemId"]);
    t.dropColumn("interviewItemId");
    t.foreign(["interviewId", "pageItemId"])
      .references(["interviewId", "pageItemId"])
      .inTable("interviewItems");
  });
  await knex.schema.alterTable("interviewItems", t => {
    t.dropPrimary();
    t.dropColumn("id");
    t.dropUnique(["surveyId", "interviewId", "pageItemId"]);
    t.primary(["interviewId", "pageItemId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.table("audit_participants").delete();
  await knex.schema.alterTable("interviewItems", t => {
    t.dropPrimary();
    t.integer("id");
    t.primary(["id"]);
    t.unique(["surveyId", "interviewId", "pageItemId"]);
  });
  await knex.schema.alterTable("audit_participants", t => {
    t.dropForeign(["interviewId", "pageItemId"]);
    t.dropColumn("pageItemId");
    t.integer("interviewItemId");
    t.foreign("surveyId").references("id").inTable("surveys");
    t.foreign("interviewId").references("id").inTable("interviews");
    t.foreign("interviewItemId").references("id").inTable("interviewItems");
  });
  await knex.schema.alterTable("interviewItems", t => {
    t.dropUnique(["interviewId", "pageItemId"]);
  });
}
