function up(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.dropForeign(["interviewId", "pageItemId", "instance"]);
    });
}
function down(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.foreign(["interviewId", "pageItemId", "instance"])
            .references(["interviewId", "pageItemId", "instance"])
            .inTable("interviewItems");
    });
}

export { down, up };
