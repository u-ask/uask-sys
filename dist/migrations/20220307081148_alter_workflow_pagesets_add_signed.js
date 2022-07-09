function up(knex) {
    return knex.schema.alterTable("workflowPageSets", t => {
        t.boolean("signed");
    });
}
function down(knex) {
    return knex.schema.alterTable("workflowPageSets", t => {
        t.dropColumn("signed");
    });
}

export { down, up };
