import { _ as __awaiter } from './tslib.es6.js';

function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.table("samples", t => {
            t.unique(["surveyId", "sampleCode"]);
        });
        yield knex.schema.table("pageSets", t => {
            t.index(["surveyId"]);
        });
        yield knex.schema.table("pages", t => {
            t.index(["surveyId"]);
        });
        yield knex.schema.table("pageSetPages", t => {
            t.index(["pageId"]);
            t.index(["pageSetId"]);
        });
        yield knex.schema.table("pageItems", t => {
            t.unique(["surveyId", "variableName"]);
        });
        yield knex.schema.table("includes", t => {
            t.index(["pageId"]);
            t.index(["pageItemId"]);
            t.index(["includedPageId"]);
        });
        yield knex.schema.table("rules", t => {
            t.index(["surveyId"]);
        });
        yield knex.schema.table("rulePageItems", t => {
            t.index(["surveyId", "ruleHash"]);
            t.index(["pageItemId"]);
        });
        yield knex.schema.table("workflows", t => {
            t.index(["surveyId"]);
        });
        yield knex.schema.table("workflowPageSets", t => {
            t.index(["workflowId"]);
            t.index(["pageSetId"]);
        });
        yield knex.schema.table("participants", t => {
            t.index(["surveyId"]);
        });
        yield knex.schema.table("interviews", t => {
            t.index(["participantId"]);
            t.index(["pageSetId"]);
        });
        yield knex.schema.table("interviewItems", t => {
            t.index(["pageItemId"]);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.table("interviewItems", t => {
            t.dropIndex(["pageItemId"]);
        });
        yield knex.schema.table("interviews", t => {
            t.dropIndex(["participantId"]);
            t.dropIndex(["pageSetId"]);
        });
        yield knex.schema.table("participants", t => {
            t.dropIndex(["surveyId"]);
        });
        yield knex.schema.table("workflowPageSets", t => {
            t.dropIndex(["workflowId"]);
            t.dropIndex(["pageSetId"]);
        });
        yield knex.schema.table("workflows", t => {
            t.dropIndex(["surveyId"]);
        });
        yield knex.schema.table("rulePageItems", t => {
            t.dropIndex(["surveyId", "ruleHash"]);
            t.dropIndex(["pageItemId"]);
        });
        yield knex.schema.table("rules", t => {
            t.dropIndex(["surveyId"]);
        });
        yield knex.schema.table("includes", t => {
            t.dropIndex(["pageId"]);
            t.dropIndex(["pageItemId"]);
            t.dropIndex(["includedPageId"]);
        });
        yield knex.schema.table("pageItems", t => {
            t.dropUnique(["surveyId", "variableName"]);
        });
        yield knex.schema.table("pageSetPages", t => {
            t.dropIndex(["pageId"]);
            t.dropIndex(["pageSetId"]);
        });
        yield knex.schema.table("pages", t => {
            t.dropIndex(["surveyId"]);
        });
        yield knex.schema.table("pageSets", t => {
            t.dropIndex(["surveyId"]);
        });
        yield knex.schema.table("samples", t => {
            t.dropUnique(["surveyId", "sampleCode"]);
        });
    });
}

export { down, up };
