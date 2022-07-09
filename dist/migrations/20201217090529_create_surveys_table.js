function up(knex) {
    return knex.schema.createTable("surveys", table => {
        table.increments();
        table.string("name").notNullable().unique();
        table.integer("version");
        table.string("options").nullable();
    });
}
function down(knex) {
    return knex.schema.dropTable("surveys");
}

export { down, up };
