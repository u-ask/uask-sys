export function up(knex) {
    return knex.schema.createTable("samples", table => {
        table.increments();
        table.string("sampleCode").notNullable();
        table.integer("surveyId").notNullable();
        table.foreign("surveyId").references("id").inTable("surveys");
    });
}
export function down(knex) {
    return knex.schema.dropTable("samples");
}
