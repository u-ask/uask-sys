function up(knex) {
    return knex.schema.createTable("samples", table => {
        table.increments();
        table.string("sampleCode").notNullable();
        table.integer("surveyId").notNullable();
        table.foreign("surveyId").references("id").inTable("surveys");
    });
}
function down(knex) {
    return knex.schema.dropTable("samples");
}

export { down, up };
