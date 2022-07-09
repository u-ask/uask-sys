function up(knex) {
    return knex.schema.createTable("seeds", t => {
        t.integer("surveyId").primary();
        t.integer("timestamp").notNullable();
        t.foreign("surveyId").references("id").inTable("surveys");
    });
}
function down(knex) {
    return knex.schema.dropTable("seeds");
}

export { down, up };
