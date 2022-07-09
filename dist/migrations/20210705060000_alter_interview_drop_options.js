function up(knex) {
    return knex.schema.alterTable("interviews", t => {
        t.dropColumn("options");
    });
}
function down(knex) {
    return knex.schema.alterTable("interviews", t => {
        t.string("options");
    });
}

export { down, up };
