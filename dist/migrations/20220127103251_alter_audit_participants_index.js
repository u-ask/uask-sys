function up(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.index(["participantId"]);
        t.index(["interviewId", "pageItemId", "instance"]);
    });
}
function down(knex) {
    return knex.schema.alterTable("audit_participants", t => {
        t.dropIndex(["participantId"]);
        t.dropIndex(["interviewId", "pageItemId", "instance"]);
    });
}

export { down, up };
