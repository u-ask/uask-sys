function up(knex) {
    return knex.schema.alterTable("pageItems", t => {
        t.boolean("array");
    });
}
function down(knex) {
    return knex.schema.alterTable("pageItems", t => {
        t.dropColumn("array");
    });
}

export { down, up };
