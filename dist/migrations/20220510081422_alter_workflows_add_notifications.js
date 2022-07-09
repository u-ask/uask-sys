function up(knex) {
    return knex.schema.alterTable("workflows", t => {
        t.string("notifications", 1024);
    });
}
function down(knex) {
    return knex.schema.alterTable("workflows", t => {
        t.dropColumn("notifications");
    });
}

export { down, up };
