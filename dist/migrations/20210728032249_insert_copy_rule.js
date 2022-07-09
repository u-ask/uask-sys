function up(knex) {
    return knex("ruleTypes").insert({ name: "copy", precedence: 110 });
}
function down(knex) {
    return knex("ruleTypes").where({ name: "copy" }).delete();
}

export { down, up };
