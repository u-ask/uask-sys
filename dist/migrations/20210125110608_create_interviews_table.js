function up(knex) {
    return knex.schema.createTable("interviews", table => {
        table.increments();
        table.integer("surveyId").notNullable();
        table.integer("participantId").notNullable();
        table.integer("pageSetId").notNullable();
        table.float("nonce").nullable();
        table.string("options").nullable();
        table.date("lastInput").nullable();
        table.integer("position");
        table.foreign("surveyId").references("id").inTable("surveys");
        table.foreign("participantId").references("id").inTable("participants");
        table.foreign("pageSetId").references("id").inTable("pageSets");
    });
}
function down(knex) {
    return knex.schema.dropTable("interviews");
}

export { down, up };
