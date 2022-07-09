function up(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.string("kpis", 256000);
    });
}
function down(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.dropColumn("kpis");
    });
}

export { down, up };
