function up(knex) {
    return knex.schema.alterTable("pages", table => {
        table.string("exportConfig");
    });
}
function down(knex) {
    return knex.schema.alterTable("pages", table => {
        table.dropColumn("exportConfig");
    });
}

export { down, up };
