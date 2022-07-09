function up(knex) {
    return knex.schema.alterTable("samples", t => {
        t.boolean("frozen").defaultTo(false);
    });
}
function down(knex) {
    return knex.schema.alterTable("samples", t => {
        t.dropColumn("frozen");
    });
}

export { down, up };
