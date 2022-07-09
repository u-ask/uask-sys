import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex
            .table("audit_participants")
            .where({ operation: "create" })
            .update({ operation: '"create"' });
        yield knex
            .table("audit_participants")
            .where({ operation: "update" })
            .update({ operation: '"update"' });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex
            .table("audit_participants")
            .where({ operation: '"create"' })
            .update({ operation: "create" });
        yield knex
            .table("audit_participants")
            .where({ operation: '"update"' })
            .update({ operation: "update" });
    });
}

export { down, up };
