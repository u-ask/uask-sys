function up(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.text("payload").alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.string("payload").alter();
    });
}

export { down, up };
