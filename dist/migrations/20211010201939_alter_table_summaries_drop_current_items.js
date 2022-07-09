function up(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.dropColumn("currentItems");
    });
}
function down(knex) {
    return knex.schema.alterTable("summaries", t => {
        t.string("currentItems", 256000).notNullable();
    });
}

export { down, up };
