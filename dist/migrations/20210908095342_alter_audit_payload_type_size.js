function up(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.string("payload", 4000).alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.string("payload").alter();
    });
}

export { down, up };
