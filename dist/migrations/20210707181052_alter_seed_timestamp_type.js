function up(knex) {
    return knex.schema.alterTable("seeds", t => {
        t.bigInteger("timestamp").notNullable().alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("seeds", t => {
        t.integer("timestamp").notNullable().alter();
    });
}

export { down, up };
