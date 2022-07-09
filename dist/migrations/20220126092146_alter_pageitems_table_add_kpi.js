function up(knex) {
    return knex.schema.alterTable("pageItems", table => {
        table.string("kpi").nullable();
    });
}
function down(knex) {
    return knex.schema.alterTable("pageItems", table => {
        table.dropColumn("kpi");
    });
}

export { down, up };
