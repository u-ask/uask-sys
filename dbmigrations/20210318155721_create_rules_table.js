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
        yield knex.schema.createTable("ruleTypes", table => {
            table.increments();
            table.string("name").notNullable().unique();
            table.integer("precedence").notNullable();
        });
        const ruleTypesList = [
            ["constant", 100],
            ["computed", 100],
            ["required", 70],
            ["activation", 50],
            ["inRange", 10],
            ["maxLength", 10],
            ["decimalPrecision", 10],
            ["fixedLength", 10],
            ["letterCase", 10],
            ["dynamic", 0],
        ];
        for (const ruleType of ruleTypesList) {
            yield knex("ruleTypes").insert([
                { name: ruleType[0], precedence: ruleType[1] },
            ]);
        }
        yield knex.schema.createTable("rules", table => {
            table.increments();
            table.bigInteger("hash");
            table.integer("surveyId").notNullable();
            table.integer("ruleTypeId").notNullable();
            table.integer("version");
            table.string("args");
            table.string("when");
            table.integer("position");
            table.integer("itemCount");
            table.unique(["surveyId", "hash"]);
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("ruleTypeId").references("id").inTable("ruleTypes");
        });
        yield knex.schema.createTable("scopes", table => {
            table.increments();
            table.string("level").notNullable().unique();
        });
        const scopeLevelsList = ["global", "outer", "local"];
        for (const scopeLevel of scopeLevelsList) {
            yield knex("scopes").insert([{ level: scopeLevel }]);
        }
        yield knex.schema.createTable("rulePageItems", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("pageItemId").notNullable();
            table.integer("scopeId").notNullable();
            table.bigInteger("ruleHash").notNullable();
            table.integer("position");
            table.unique(["surveyId", "pageItemId", "scopeId", "ruleHash"]);
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("pageItemId").references("id").inTable("pageItems");
            table
                .foreign(["surveyId", "ruleHash"])
                .references(["surveyId", "hash"])
                .inTable("rules");
            table.foreign("scopeId").references("id").inTable("scopes");
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("rulePageItems");
        yield knex.schema.dropTable("scopes");
        yield knex.schema.dropTable("rules");
        yield knex.schema.dropTable("ruleTypes");
    });
}
