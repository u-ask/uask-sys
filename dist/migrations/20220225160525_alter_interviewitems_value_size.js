function up(knex) {
    return knex.schema.alterTable("interviewItems", t => {
        t.text("value").alter();
    });
}
function down() {
    return Promise.resolve();
}

export { down, up };
