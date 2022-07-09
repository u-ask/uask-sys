function up(knex) {
    return knex.schema.createTable("pageSets", table => {
        table.increments();
        table.integer("surveyId").notNullable();
        table.string("type").notNullable();
        table.string("datevar");
        table.integer("position");
        table.unique(["surveyId", "type"]);
        table.foreign("surveyId").references("id").inTable("surveys");
    });
}
function down(knex) {
    return knex.schema.dropTable("pageSets");
}

export { down, up };
