function up(knex) {
    return knex.schema.createTable("participants", table => {
        table.increments();
        table.integer("surveyId").notNullable();
        table.integer("sampleId").notNullable();
        table.string("participantCode").notNullable();
        table.unique(["surveyId", "sampleId", "participantCode"]);
        table.foreign("surveyId").references("id").inTable("surveys");
        table.foreign("sampleId").references("id").inTable("samples");
    });
}
function down(knex) {
    return knex.schema.dropTable("participants");
}

export { down, up };
