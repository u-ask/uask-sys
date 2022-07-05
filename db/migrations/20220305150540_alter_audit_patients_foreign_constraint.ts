import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.dropForeign(["interviewId", "pageItemId", "instance"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("audit_participants", t => {
    t.foreign(["interviewId", "pageItemId", "instance"])
      .references(["interviewId", "pageItemId", "instance"])
      .inTable("interviewItems");
  });
}
