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
        return knex.schema.createTable("participants", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("sampleId").notNullable();
            table.string("participantCode").notNullable();
            table.unique(["surveyId", "sampleId", "participantCode"]); // pour certaines études, le code participant est unique dans l'étude
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("sampleId").references("id").inTable("samples");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("participants");
    });
}
