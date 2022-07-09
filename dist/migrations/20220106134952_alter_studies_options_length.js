function up(knex) {
    return knex.schema.alterTable("surveys", t => {
        t.string("options", 1024).alter();
    });
}
function down() {
    return Promise.resolve();
}

export { down, up };
