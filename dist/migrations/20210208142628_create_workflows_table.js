import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable("workflowTypes", table => {
            table.increments();
            table.string("type").notNullable().unique();
        });
        const workflowTypesList = ["info", "one", "many", "startsWith", "endsWith"];
        for (const type of workflowTypesList) {
            yield knex("workflowTypes").insert([{ type: JSON.stringify(type) }]);
        }
        yield knex.schema.createTable("workflows", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("position").notNullable();
            table.unique(["surveyId", "position"]);
            table.foreign("surveyId").references("id").inTable("surveys");
        });
        yield knex.schema.createTable("workflowPageSets", table => {
            table.increments();
            table.integer("surveyId").notNullable();
            table.integer("workflowId").notNullable();
            table.integer("workflowTypeId").notNullable();
            table.integer("pageSetId").notNullable();
            table.unique(["surveyId", "workflowId", "workflowTypeId", "pageSetId"]);
            table.integer("position");
            table.foreign("surveyId").references("id").inTable("surveys");
            table.foreign("workflowId").references("id").inTable("workflows");
            table.foreign("pageSetId").references("id").inTable("pageSets");
            table.foreign("workflowTypeId").references("id").inTable("workflowTypes");
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("workflowPageSets");
        yield knex.schema.dropTable("workflows");
        yield knex.schema.dropTable("workflowTypes");
    });
}

export { down, up };
