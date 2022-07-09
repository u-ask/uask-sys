function up(knex) {
    return knex("itemTypes").insert({ name: "time" });
}
function down(knex) {
    return knex("itemTypes").where({ name: "time" }).delete();
}

export { down, up };
