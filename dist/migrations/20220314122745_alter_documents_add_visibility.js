import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("documents", t => {
            t.boolean("visibility").defaultTo(true);
            t.dropPrimary();
            t.dropColumn("id");
            t.primary(["surveyId", "hash"]);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("documents", t => {
            t.dropColumn("visibility");
            t.dropPrimary();
        });
        yield knex.schema.alterTable("documents", t => {
            t.increments("id").primary();
        });
    });
}

export { down, up };
