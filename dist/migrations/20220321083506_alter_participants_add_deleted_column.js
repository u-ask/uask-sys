function up(knex) {
    return knex.schema.alterTable("participants", t => {
        t.boolean("__deleted__").defaultTo(false);
    });
}
function down(knex) {
    return knex.schema.alterTable("participants", t => {
        t.dropColumn("__deleted__");
    });
}

export { down, up };
