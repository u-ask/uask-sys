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
        return knex.schema.createTable("interviewItems", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("interviewId").notNullable();
            table.integer("pageItemId").notNullable();
            table.unique(["surveyId", "interviewId", "pageItemId"]);
            table.string("value").nullable();
            table.string("context").nullable();
            table.string("unit").nullable();
            table.string("specialValue").nullable();
            table.string("messages").nullable();
            table.integer("position");
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("interviewId").references("id").inTable("interviews");
            table.foreign("pageItemId").references("id").inTable("pageItems");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("interviewItems");
    });
}
