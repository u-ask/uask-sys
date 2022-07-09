function up(knex) {
    return knex.schema.alterTable("samples", t => {
        t.string("name");
        t.string("address");
    });
}
function down(knex) {
    return knex.schema.alterTable("samples", t => {
        t.dropColumn("name");
        t.dropColumn("address");
    });
}

export { down, up };
