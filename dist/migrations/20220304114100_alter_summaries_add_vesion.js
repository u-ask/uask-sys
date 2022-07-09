function up(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.integer("syncVersion");
    });
}
function down(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.dropColumn("syncVersion");
    });
}

export { down, up };
