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
        yield knex.schema.createTable("documents", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.bigInteger("hash").notNullable();
            table.string("name").notNullable();
            table.string("title").notNullable();
            table.string("tags");
            table.binary("content");
            table.unique(["surveyId", "hash"]);
            table.foreign("surveyId").references("id").inTable("surveys");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("documents");
    });
}
