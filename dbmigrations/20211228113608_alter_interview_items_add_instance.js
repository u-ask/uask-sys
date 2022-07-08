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
        yield knex.schema.alterTable("audit_participants", t => {
            t.dropForeign(["interviewId", "pageItemId"]);
        });
        if (knex.client.config.client == "sqlite3")
            yield tweakSQLite(knex);
        else {
            yield knex.schema.alterTable("interviewItems", t => {
                t.dropPrimary();
                t.dropUnique(["interviewId", "pageItemId"]);
                t.integer("instance").defaultTo(1).notNullable();
                t.primary(["interviewId", "pageItemId", "instance"]);
            });
        }
        yield knex.schema.alterTable("audit_participants", t => {
            t.integer("instance").defaultTo(1).notNullable();
            t.foreign(["interviewId", "pageItemId", "instance"])
                .references(["interviewId", "pageItemId", "instance"])
                .inTable("interviewItems");
        });
    });
}
function tweakSQLite(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.raw("CREATE TABLE _interviewItems_temp (`surveyId` integer NOT NULL, `interviewId` integer NOT NULL, `pageItemId` integer NOT NULL, `value` varchar(255) NULL, `context` varchar(255) NULL, `unit` varchar(255) NULL, `specialValue` varchar(255) NULL, `messages` varchar(255) NULL, `position` integer, `participantId` integer NOT NULL, `instance` integer not null default '0', FOREIGN KEY (`surveyId`) REFERENCES `surveys` (`id`), FOREIGN KEY (`interviewId`) REFERENCES `interviews` (`id`), FOREIGN KEY (`pageItemId`) REFERENCES `pageItems` (`id`), primary key(`interviewId`, `pageItemId`, `instance`))");
        yield knex
            .table("_interviewItems_temp")
            .insert(knex.table("interviewItems").select("*", knex.raw(1)));
        yield knex.schema.dropTable("interviewItems");
        yield knex.schema.renameTable("_interviewItems_temp", "interviewItems");
        yield knex.schema.alterTable("interviewItems", t => {
            t.index(["participantId"]);
            t.index(["pageItemId"]);
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("audit_participants", t => {
            t.dropForeign(["interviewId", "pageItemId", "instance"]);
        });
        yield knex.schema.alterTable("interviewItems", t => {
            t.dropPrimary();
            t.primary(["interviewId", "pageItemId"]);
            t.dropColumn("instance");
        });
        yield knex.schema.alterTable("audit_participants", t => {
            t.foreign(["interviewId", "pageItemId"])
                .references(["interviewId", "pageItemId"])
                .inTable("interviewItems");
            t.dropColumn("instance");
        });
    });
}
