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
        yield knex.schema.createTable("summaries", t => {
            t.integer("surveyId").references("id").inTable("surveys");
            t.integer("sampleId").references("id").inTable("samples");
            t.integer("participantId").primary().references("id").inTable("participants");
            t.string("participantCode").notNullable();
            t.string("sampleCode").notNullable();
            t.integer("interviewCount").notNullable();
            t.integer("completedInterviewCount").notNullable();
            t.string("currentInterview", 100000).notNullable();
            t.string("pins", 100000).notNullable();
            t.string("currentItems", 100000).notNullable();
            t.string("alerts", 100000).notNullable();
            t.boolean("included").notNullable();
            t.date("inclusionDate");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("summaries");
    });
}
