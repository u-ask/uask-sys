function up(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.integer("instance").nullable().alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.integer("instance").notNullable().alter();
    });
}

export { down, up };
