function up(knex) {
    return knex.schema.createTable("documents", table => {
        table.increments();
        table.integer("surveyId").notNullable();
        table.bigInteger("hash").notNullable();
        table.string("name").notNullable();
        table.string("title").notNullable();
        table.string("tags");
        table.binary("content");
        table.unique(["surveyId", "hash"]);
        table.foreign("surveyId").references("id").inTable("surveys");
    });
}
function down(knex) {
    return knex.schema.dropTable("documents");
}

export { down, up };
