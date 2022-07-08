var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function up(knex) {
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
export function down(knex) {
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
