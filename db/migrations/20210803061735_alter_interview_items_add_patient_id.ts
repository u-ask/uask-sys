import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviewItems", t => {
    t.integer("participantId");
  });
  await knex.table("interviewItems").update({
    participantId: knex
      .table("interviews")
      .where({ id: knex.ref("interviewItems.interviewId") })
      .select("participantId"),
  });
  await knex.schema.alterTable("interviewItems", t => {
    t.integer("participantId").notNullable().alter();
  });
  await knex.schema.table("interviewItems", t => {
    t.index(["participantId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("interviewItems", t => {
    t.dropColumn("participantId");
  });
}
