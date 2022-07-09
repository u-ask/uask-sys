function up(knex) {
    return knex("itemTypes").insert({ name: "score" });
}
function down(knex) {
    return knex("itemTypes").where({ name: "score" }).delete();
}

export { down, up };
