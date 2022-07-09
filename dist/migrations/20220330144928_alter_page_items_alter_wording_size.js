function up(knex) {
    return knex.schema.alterTable("pageItems", t => {
        t.text("wording").alter();
        t.text("comment").alter();
        t.text("typeArgs").alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("pageItems", t => {
        t.string("wording", 4096).alter();
        t.string("comment", 4096).alter();
        t.string("typeArgs", 4096).alter();
    });
}

export { down, up };
