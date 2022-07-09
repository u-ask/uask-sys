function up(knex) {
    return knex("ruleTypes").insert([{ name: "critical", precedence: 70 }]);
}
function down(knex) {
    return knex("ruleTypes").where({ name: "critical" }).delete();
}

export { down, up };
