import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
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
function down(knex) {
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

export { down, up };
