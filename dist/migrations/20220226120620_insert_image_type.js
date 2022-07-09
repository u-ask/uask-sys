function up(knex) {
    return knex("itemTypes").insert({ name: "image" });
}
function down(knex) {
    return knex("itemTypes").where({ name: "image" }).delete();
}

export { down, up };
