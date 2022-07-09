function up(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.timestamp("date").alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.date("date").alter();
    });
}

export { down, up };
