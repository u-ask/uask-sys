function up(knex) {
    return knex("workflows")
        .whereNull("notifications")
        .update({ notifications: JSON.stringify([]) });
}
function down() {
    return Promise.resolve();
}

export { down, up };
