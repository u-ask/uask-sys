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
        return knex.schema.createTable("interviews", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("participantId").notNullable();
            table.integer("pageSetId").notNullable();
            table.float("nonce").nullable();
            table.string("options").nullable();
            table.date("lastInput").nullable();
            table.integer("position");
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("participantId").references("id").inTable("participants");
            table.foreign("pageSetId").references("id").inTable("pageSets");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("interviews");
    });
}
