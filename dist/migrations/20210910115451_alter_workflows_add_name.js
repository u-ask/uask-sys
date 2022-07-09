function up(knex) {
    return knex.schema.alterTable("workflows", t => {
        t.string("name");
    });
}
function down(knex) {
    return knex.schema.alterTable("workflows", t => {
        t.dropColumn("name");
    });
}

export { down, up };
