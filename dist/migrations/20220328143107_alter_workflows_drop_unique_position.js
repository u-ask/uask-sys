function up(knex) {
    return knex.schema.alterTable("workflows", t => {
        t.dropUnique(["surveyId", "position"]);
    });
}
function down(knex) {
    return knex.schema.alterTable("workflows", t => {
        t.unique(["surveyId", "position"]);
    });
}

export { down, up };
