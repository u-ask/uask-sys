import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex
            .table("workflowTypes")
            .where({ type: '"one"' })
            .update({ type: '"single"' });
        yield knex
            .table("workflowTypes")
            .where({ type: '"startsWith"' })
            .update({ type: '"sequence"' });
        yield knex
            .table("workflowTypes")
            .where({ type: '"endsWith"' })
            .update({ type: '"stop"' });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex
            .table("workflowTypes")
            .update({ type: '"one"' })
            .where({ type: '"single"' });
        yield knex
            .table("workflowTypes")
            .update({ type: '"startsWith"' })
            .where({ type: '"sequence"' });
        yield knex
            .table("workflowTypes")
            .update({ type: '"endsWith"' })
            .where({ type: '"stop"' });
    });
}

export { down, up };
