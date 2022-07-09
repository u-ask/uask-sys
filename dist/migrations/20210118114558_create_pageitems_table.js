import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable("itemTypes", table => {
            table.increments();
            table.string("name").notNullable().unique();
        });
        const itemTypesList = [
            "text",
            "real",
            "integer",
            "date",
            "yesno",
            "scale",
            "choice",
            "glossary",
            "info",
            "context",
            "acknowledge",
        ];
        for (const itemTypes of itemTypesList) {
            yield knex("itemTypes").insert([{ name: itemTypes }]);
        }
        yield knex.schema.createTable("pageItems", table => {
            table.increments();
            table.integer("surveyId");
            table.integer("version");
            table.string("wording", 4096).nullable();
            table.string("variableName").notNullable();
            table.integer("typeId").nullable();
            table.string("typeArgs", 4096).nullable();
            table.string("units").nullable();
            table.string("comment", 4096).nullable();
            table.string("section").nullable();
            table.string("pin").nullable();
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("typeId").references("id").inTable("itemTypes");
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("pageItems");
        yield knex.schema.dropTable("itemTypes");
    });
}

export { down, up };
