function up(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.string("currentInterview", 256000).alter();
        t.string("pins", 256000).alter();
        t.string("currentItems", 256000).alter();
        t.string("alerts", 256000).alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.string("currentInterview", 100000).alter();
        t.string("pins", 100000).alter();
        t.string("currentItems", 100000).alter();
        t.string("alerts", 100000).alter();
    });
}

export { down, up };
