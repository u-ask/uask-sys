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
        yield knex.table("audit_participants").delete();
        yield knex.schema.alterTable("interviewItems", t => {
            t.unique(["interviewId", "pageItemId"]);
        });
        yield knex.schema.alterTable("audit_participants", t => {
            t.integer("pageItemId");
            t.dropForeign(["surveyId"]);
            t.dropForeign(["interviewId"]);
            t.dropForeign(["interviewItemId"]);
            t.dropColumn("interviewItemId");
            t.foreign(["interviewId", "pageItemId"])
                .references(["interviewId", "pageItemId"])
                .inTable("interviewItems");
        });
        yield knex.schema.alterTable("interviewItems", t => {
            t.dropPrimary();
            t.dropColumn("id");
            t.dropUnique(["surveyId", "interviewId", "pageItemId"]);
            t.primary(["interviewId", "pageItemId"]);
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.table("audit_participants").delete();
        yield knex.schema.alterTable("interviewItems", t => {
            t.dropPrimary();
            t.integer("id");
            t.primary(["id"]);
            t.unique(["surveyId", "interviewId", "pageItemId"]);
        });
        yield knex.schema.alterTable("audit_participants", t => {
            t.dropForeign(["interviewId", "pageItemId"]);
            t.dropColumn("pageItemId");
            t.integer("interviewItemId");
            t.foreign("surveyId").references("id").inTable("surveys");
            t.foreign("interviewId").references("id").inTable("interviews");
            t.foreign("interviewItemId").references("id").inTable("interviewItems");
        });
        yield knex.schema.alterTable("interviewItems", t => {
            t.dropUnique(["interviewId", "pageItemId"]);
        });
    });
}
