function up(knex) {
    return knex.schema.createTable("interviewItems", table => {
        table.increments();
        table.integer("surveyId").notNullable();
        table.integer("interviewId").notNullable();
        table.integer("pageItemId").notNullable();
        table.unique(["surveyId", "interviewId", "pageItemId"]);
        table.string("value").nullable();
        table.string("context").nullable();
        table.string("unit").nullable();
        table.string("specialValue").nullable();
        table.string("messages").nullable();
        table.integer("position");
        table.foreign("surveyId").references("id").inTable("surveys");
        table.foreign("interviewId").references("id").inTable("interviews");
        table.foreign("pageItemId").references("id").inTable("pageItems");
    });
}
function down(knex) {
    return knex.schema.dropTable("interviewItems");
}

export { down, up };
