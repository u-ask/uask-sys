function up(knex) {
    return knex.schema.alterTable("interviews", t => {
        t.timestamp("lastInput").alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("interviews", t => {
        t.date("lastInput").alter();
    });
}

export { down, up };
