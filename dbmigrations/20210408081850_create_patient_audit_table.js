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
        yield knex.schema.createTable("audit_participants", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("participantId").notNullable();
            table.integer("interviewId");
            table.integer("interviewItemId");
            table.string("payload").notNullable();
            table.string("operation").notNullable();
            table.string("userId").notNullable();
            table.date("date").notNullable();
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("participantId").references("id").inTable("participants");
            table.foreign("interviewId").references("id").inTable("interviews");
            table.foreign("interviewItemId").references("id").inTable("interviewItems");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("audit_participants");
    });
}
