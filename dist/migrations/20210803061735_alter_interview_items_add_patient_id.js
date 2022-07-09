import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("interviewItems", t => {
            t.integer("participantId");
        });
        yield knex.table("interviewItems").update({
            participantId: knex
                .table("interviews")
                .where({ id: knex.ref("interviewItems.interviewId") })
                .select("participantId"),
        });
        yield knex.schema.alterTable("interviewItems", t => {
            t.integer("participantId").notNullable().alter();
        });
        yield knex.schema.table("interviewItems", t => {
            t.index(["participantId"]);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("interviewItems", t => {
            t.dropColumn("participantId");
        });
    });
}

export { down, up };
