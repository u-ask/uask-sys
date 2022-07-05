import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex
    .table("workflowTypes")
    .where({ type: '"one"' })
    .update({ type: '"single"' });
  await knex
    .table("workflowTypes")
    .where({ type: '"startsWith"' })
    .update({ type: '"sequence"' });
  await knex
    .table("workflowTypes")
    .where({ type: '"endsWith"' })
    .update({ type: '"stop"' });
}

export async function down(knex: Knex): Promise<void> {
  await knex
    .table("workflowTypes")
    .update({ type: '"one"' })
    .where({ type: '"single"' });
  await knex
    .table("workflowTypes")
    .update({ type: '"startsWith"' })
    .where({ type: '"sequence"' });
  await knex
    .table("workflowTypes")
    .update({ type: '"endsWith"' })
    .where({ type: '"stop"' });
}
