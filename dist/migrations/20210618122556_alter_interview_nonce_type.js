function up(knex) {
    return knex.schema.alterTable("interviews", t => {
        t.bigInteger("nonce").alter();
    });
}
function down(knex) {
    return knex.schema.alterTable("interviews", t => {
        t.integer("nonce").alter();
    });
}

export { down, up };
