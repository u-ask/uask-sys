import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.alterTable("rules", t => {
            t.string("args", 2048).alter();
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.alterTable("rules", t => {
            t.string("args", 255).alter();
        });
    });
}

export { down, up };
