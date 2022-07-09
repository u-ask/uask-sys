function up(knex) {
    return knex.schema.createTable("pages", table => {
        table.increments();
        table.integer("surveyId").notNullable();
        table.string("name").notNullable();
        table.integer("position");
        table.unique(["surveyId", "name"]);
        table.foreign("surveyId").references("id").inTable("surveys");
    });
}
function down(knex) {
    return knex.schema.dropTable("pages");
}

export { down, up };
