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
        yield knex.schema.alterTable("summaries", t => {
            t.string("currentInterview", 256000).alter();
            t.string("pins", 256000).alter();
            t.string("currentItems", 256000).alter();
            t.string("alerts", 256000).alter();
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("summaries", t => {
            t.string("currentInterview", 100000).alter();
            t.string("pins", 100000).alter();
            t.string("currentItems", 100000).alter();
            t.string("alerts", 100000).alter();
        });
    });
}
