function up(knex) {
    return knex.schema.alterTable("interviewItems", t => {
        t.index("surveyId");
    });
}
function down(knex) {
    return knex.schema.alterTable("interviewItems", t => {
        t.dropIndex("surveyId");
    });
}

export { down, up };
