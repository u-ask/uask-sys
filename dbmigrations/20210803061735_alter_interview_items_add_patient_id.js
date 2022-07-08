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
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("interviewItems", t => {
            t.dropColumn("participantId");
        });
    });
}
