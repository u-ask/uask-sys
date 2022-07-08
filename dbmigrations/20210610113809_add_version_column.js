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
        yield knex.schema.alterTable("pageSets", t => {
            t.integer("version");
        });
        yield knex.schema.alterTable("pageSetPages", t => {
            t.integer("version");
        });
        yield knex.schema.alterTable("pages", t => {
            t.integer("version");
        });
        yield knex.schema.alterTable("workflows", t => {
            t.integer("version");
        });
        yield knex.schema.alterTable("workflowPageSets", t => {
            t.integer("version");
        });
        yield knex.schema.alterTable("includes", t => {
            t.integer("version");
        });
        yield knex.schema.alterTable("rulePageItems", t => {
            t.integer("version");
        });
        yield knex
            .table("surveys")
            .then(r => Promise.all(r.map(s => Promise.all([
            knex
                .table("pageSets")
                .where("surveyId", s.id)
                .update("version", s.version),
            knex
                .table("pageSetPages")
                .where("surveyId", s.id)
                .update("version", s.version),
            knex
                .table("pages")
                .where("surveyId", s.id)
                .update("version", s.version),
            knex
                .table("workflows")
                .where("surveyId", s.id)
                .update("version", s.version),
            knex
                .table("workflowPageSets")
                .where("surveyId", s.id)
                .update("version", s.version),
            knex
                .table("includes")
                .where("surveyId", s.id)
                .update("version", s.version),
            knex
                .table("rulePageItems")
                .where("surveyId", s.id)
                .update("version", s.version),
        ]))));
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("pageSets", t => {
            t.dropColumn("version");
        });
        yield knex.schema.alterTable("pageSetPages", t => {
            t.dropColumn("version");
        });
        yield knex.schema.alterTable("pages", t => {
            t.dropColumn("version");
        });
        yield knex.schema.alterTable("workflows", t => {
            t.dropColumn("version");
        });
        yield knex.schema.alterTable("workflowPageSets", t => {
            t.dropColumn("version");
        });
        yield knex.schema.alterTable("includes", t => {
            t.dropColumn("version");
        });
        yield knex.schema.alterTable("rulePageItems", t => {
            t.dropColumn("version");
        });
    });
}
