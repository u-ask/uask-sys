import restana from 'restana';
import { _ as __awaiter, I as InterviewSaveOptions, i as interviewItemDeserialize, p as participantSerialize, s as surveySerialize, a as surveyDeserialize, P as ParticipantSummary, c as config, b as __rest, D as Document, d as adminRouter, e as errorMessage, f as isManaged, g as assertNoSubset, S as Store, B as Builder, h as SampleStoreDriver, j as SampleCacheDriver, U as UserTruenorthDriver, k as UserManagedDriver, l as SurveyStoreDriver, m as SurveyReconciliationDriver, n as SurveyCacheDriver, o as ParticipantStoreDriver, q as ParticipantReconciliationDriver, r as ParticipantMixinDriver, t as ParticipantCacheDriver, u as ParticipantAuditDriver, v as ParticipantSummaryDriver, w as InterviewStoreDriver, x as InterviewAuditDriver, y as InterviewManagedDriver, z as InterviewMixinDriver, A as InterviewRuleDriver, C as SummaryDbDriver, E as AuditDbDriver, K as KpiGenericDriver } from './system.js';
import Knex from 'knex';
import { graphqlHTTP } from 'express-graphql';
import helmet from 'helmet';
import { stringify } from 'csv-stringify';
import archiver from 'archiver';
import { SurveyTableSet, getTranslation, InterviewBuilder, undefinedTag, Participant, Sample, SurveyBuilder, Metadata, formatCode, getItem, InterviewItem, parseLayout, isMLstring, getItemWording, isVariableHidden, Interview, getItemContext, hasFixedLabels, InfoType, DateType, TimeType, ChoiceType, DomainCollection, User } from 'uask-dom';
import { Readable } from 'stream';
import debug from 'debug';
import SchemaBuilder from '@pothos/core';
import 'fast-deep-equal';
import { AccountManager, provider, service } from 'uask-auth';
import fnv from '@sindresorhus/fnv1a';
import { knexAdapter } from 'oidc-provider-knex-adapter';
import sgMail from '@sendgrid/mail';
import twilio from 'twilio';
import bodyParser from 'body-parser';
import { Issuer } from 'openid-client';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { Stealer } from 'stealer';
import crypto from 'crypto';
import serveStatic from 'serve-static';
import ejs from 'ejs';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

function addAuditProps(adaptee, survey, driver) {
    const creatorMap = new Map();
    return new Promise(res => {
        getTables(adaptee).then(tables => {
            const tableSet = {
                name: adaptee.name,
                locale: adaptee.locale,
                tables,
            };
            res(tableSet);
        });
    });
    function getTables(adaptee) {
        return __awaiter(this, void 0, void 0, function* () {
            const tables = [];
            for (const table of adaptee.tables)
                tables.push(yield addCreators(table));
            return tables;
        });
    }
    function addCreators(table) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = [...table.header, "CREATOR"];
            const rows = [];
            for (const row of table.rows)
                rows.push(yield addCreator(row));
            return Object.assign(Object.assign({}, table), { header, rows });
        });
    }
    function addCreator(r) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, r), { elements: [...r.elements, yield getCreator(r.participantCode, r.nonce)] });
        });
    }
    function getCreator(participantCode, nonce) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield getRecords(participantCode);
            const record = records.find(r => r.target.nonce == nonce);
            if (typeof record == "undefined")
                return "";
            return (_b = (_a = record.user.email) !== null && _a !== void 0 ? _a : record.user.name) !== null && _b !== void 0 ? _b : record.user;
        });
    }
    function getRecords(participantCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const cached = creatorMap.get(participantCode);
            if (typeof cached != "undefined")
                return cached;
            const records = yield driver.get(survey, {
                participantCode,
                variableName: null,
                instance: null,
            });
            creatorMap.set(participantCode, records);
            return records;
        });
    }
}

function toCSV(table, locale) {
    const options = csvOptions(locale);
    const stream = stringify(Object.assign({ columns: [...table.header] }, options));
    const elements = table.rows.map(r => r.elements);
    return Readable.from(elements).pipe(stream);
}
function csvOptions(locale) {
    return {
        header: true,
        cast: {
            date: d => (locale ? d.toLocaleDateString(locale) : d.toISOString()),
            number: n => (locale ? n.toLocaleString(locale) : n.toString()),
            boolean: b => (b ? "1" : "0"),
        },
        delimiter: (1.2).toLocaleString(locale) == "1,2" ? ";" : ",",
    };
}
function toArchive(tableSet, locale = tableSet.locale) {
    const archive = archiver("zip");
    const zip = tableSet.tables.reduce((zip, t, i) => {
        var _a;
        return zip.append(toCSV(t, locale), {
            name: ((_a = t.name) !== null && _a !== void 0 ? _a : `${tableSet.name}_${i}`) + ".csv",
        });
    }, archive);
    zip.finalize();
    return zip;
}
function getArchiveByName(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers, userid) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.name);
            const allsamples = yield drivers.sampleDriver.getAll(survey);
            const user = yield drivers.userDriver.getByUserId(survey, userid);
            const participants = req.params.sampleCode
                ? yield drivers.participantDriver.getBySample(survey, allsamples.find(s => s.sampleCode == req.params.sampleCode))
                : yield drivers.participantDriver
                    .getAll(survey, allsamples)
                    .then(r => r.filter(p => { var _a; return (_a = user === null || user === void 0 ? void 0 : user.sampleCodes) === null || _a === void 0 ? void 0 : _a.includes(p.sample.sampleCode); }));
            const surveyDataset = new SurveyTableSet(survey, participants);
            const auditDataset = yield addAuditProps(surveyDataset, survey, drivers.auditDriver);
            const stream = toArchive(auditDataset);
            res.writeHead(200, {
                "Content-Type": "zip",
                "Content-disposition": `attachment;filename=${survey.name}.zip`,
            });
            stream.pipe(res);
        }), { req, res });
    });
}
function exportRouter(driverFactory) {
    return restana()
        .newRouter()
        .get("/:name/:sampleCode?", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getArchiveByName(driverFactory, req, res);
    }));
}

const dlog$7 = debug("uask:server");
function buildAuditSupport(schemaBuilder, drivers) {
    return {
        queryFields: g => query(g, drivers),
    };
    function query(g, drivers) {
        return { auditRecords: auditRecords(g, drivers) };
    }
    function auditRecords(g, driverFactory) {
        const args = {
            survey: g.arg.string({ required: true }),
            participantCode: g.arg.string({ required: true }),
            nonce: g.arg({ type: "BigInt" }),
            variableName: g.arg.string({}),
            instance: g.arg({ type: "Int" }),
            operations: g.arg({ type: ["Json"], required: false }),
        };
        const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
            return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
                dlog$7("Graphql audit", "start");
                const survey = yield drivers.surveyDriver.getByName(a.survey);
                const root = Object.assign(Object.assign(Object.assign({ participantCode: a.participantCode }, (a.nonce !== undefined ? { nonce: a.nonce } : {})), (a.variableName !== undefined
                    ? { variableName: a.variableName }
                    : {})), (a.instance !== undefined ? { instance: a.instance } : {}));
                const records = yield drivers.auditDriver.get(survey, root, a.operations);
                const result = records.map(r => (Object.assign({}, r)));
                dlog$7("Graphql audit", "end");
                return result;
            }), ctx);
        });
        return g.field({ args, type: ["Json"], resolve });
    }
}

function buildSupport() {
    const schemaBuilder = new SchemaBuilder({});
    schemaBuilder.scalarType("MLString", {
        serialize: d => d,
    });
    schemaBuilder.scalarType("BigInt", {
        serialize: d => Number(d),
        parseValue: d => Number(d),
    });
    schemaBuilder.scalarType("Date", {
        serialize: d => d,
    });
    schemaBuilder.scalarType("Value", {
        serialize: d => d,
    });
    schemaBuilder.scalarType("Json", {
        serialize: d => d,
    });
    return schemaBuilder;
}

const dlog$6 = debug("uask:server");
function buildInterviewSupport(schemaBuilder, drivers) {
    return {
        mutationFields: g => mutation$3(g, drivers),
    };
}
function mutation$3(g, drivers) {
    return {
        createInterview: createInterview(g, drivers),
        saveInterview: saveInterview(g, drivers),
        deleteInterview: deleteInterview(g, drivers),
    };
}
function createInterview(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        participant: g.arg.string({ required: true }),
        pageSet: g.arg.string({ required: true }),
        items: g.arg({ type: ["Json"], required: false }),
        strict: g.arg.boolean({ required: false }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$6("GraphQL interview", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const pageSet = survey.pageSets.find(p => getTranslation(p.type, "__code__", survey.options.defaultLang) ==
                a.pageSet);
            if (!pageSet)
                throw `unknown page set ${a.pageSet}`;
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, a.participant);
            const builder = new InterviewBuilder(survey, pageSet);
            addItems(builder, a.items);
            const interview = builder.build([...participant.interviews]);
            const result = yield drivers.interviewDriver.save(survey, participant, interview, undefined, { strict: a.strict || new InterviewSaveOptions().strict });
            dlog$6("GraphQL interview", "end");
            return result;
        }), ctx);
    });
    return g.field({ args, type: ["Json"], resolve });
}
function deleteInterview(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        participant: g.arg.string({ required: true }),
        nonce: g.arg({ type: "BigInt", required: true }),
        reason: g.arg({ type: "Json", required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$6("GraphQL interview items", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, a.participant);
            const interview = participant.interviews.find(i => i.nonce == a.nonce);
            if (!interview)
                throw `unknown interview with nonce ${a.nonce}`;
            const deleted = interview.update({ __delete__: a.reason });
            yield drivers.interviewDriver.delete(survey, participant, deleted);
            dlog$6("GraphQL interview items", "end");
            return [{ nonce: interview.nonce }];
        }), ctx);
    });
    return g.field({ args, type: ["Json"], resolve });
}
function saveInterview(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        participant: g.arg.string({ required: true }),
        nonce: g.arg({ type: "BigInt", required: true }),
        items: g.arg({ type: ["Json"], required: true }),
        strict: g.arg.boolean({ required: false }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            dlog$6("GraphQL interview items", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, a.participant);
            const interview = participant.interviews.find(i => i.nonce == a.nonce);
            if (!interview)
                throw `unknown interview with nonce ${a.nonce}`;
            const builder = new InterviewBuilder(survey, interview);
            const { itemIndexes, newItemIndex } = mergeItems(builder, interview, a.items);
            const updated = builder.build([]);
            const result = yield drivers.interviewDriver.save(survey, participant, updated, undefined, { strict: (_a = a.strict) !== null && _a !== void 0 ? _a : new InterviewSaveOptions().strict });
            dlog$6("GraphQL interview items", "end");
            return buildResult(result, getItemIndex(result, itemIndexes, newItemIndex));
        }), ctx);
    });
    return g.field({ args, type: ["Json"], resolve });
}
function addItems(builder, items) {
    items === null || items === void 0 ? void 0 : items.forEach(p => {
        interviewItemDeserialize(builder, p);
    });
}
function mergeItems(builder, interview, items) {
    const itemIndexes = [];
    let newItemIndex = interview.items.length;
    items.forEach(i => {
        const index = interview.items.findIndex(t => t.pageItem.variableName == i.variableName &&
            t.pageItem.instance == (i.instance || 1));
        if (index > -1)
            itemIndexes.push(index);
        else {
            itemIndexes.push(newItemIndex);
            newItemIndex++;
        }
        deserializeWithChanges(builder, i);
    });
    return { itemIndexes, newItemIndex };
}
function deserializeWithChanges(builder, i) {
    for (const k in i.__changes__)
        if (typeof i[k] == "undefined" || i[k] === "")
            i[k] = undefinedTag;
    for (const k in i)
        if (typeof i[k] == "object" && i[k] === null)
            i[k] = undefinedTag;
    interviewItemDeserialize(builder, i);
}
function getItemIndex(result, itemIndexes, newItemIndex) {
    for (let i = newItemIndex; i < result[1].items.length; i++) {
        itemIndexes.push(i);
    }
    return itemIndexes;
}
function buildResult(result, itemIndexes) {
    return [
        result[0],
        {
            items: itemIndexes.map(x => result[1].items[x]),
        },
    ];
}

const dlog$5 = debug("uask:server");
function buildParticipantSupport(_schemaBuilder, drivers) {
    return {
        queryFields: g => query(g, drivers),
        mutationFields: g => mutation$2(g, drivers),
    };
}
function query(g, drivers) {
    return { participant: participant$1(g, drivers), participants: participants(g, drivers) };
}
function participant$1(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        code: g.arg.string({ required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$5("Graphql participant", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, a.code);
            const result = participantSerialize(participant);
            dlog$5("Graphql participant", "end");
            return result;
        }), ctx);
    });
    return g.field({ args, type: "Json", resolve });
}
function participants(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        sample: g.arg.string(),
        offset: g.arg.int({}),
        limit: g.arg.int({}),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$5("Graphql participant", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const options = Object.assign(Object.assign({}, (typeof a.offset == "number" ? { offset: a.offset } : {})), (typeof a.limit == "number" ? { limit: a.limit } : {}));
            const participants = yield (a.sample
                ? drivers.participantDriver.getBySample(survey, samples.find(s => s.sampleCode == a.sample), options)
                : drivers.participantDriver.getAll(survey, samples, options));
            const result = participants.map(p => participantSerialize(p));
            dlog$5("Graphql participant", "end");
            return result;
        }), ctx);
    });
    return g.field({ args, type: ["Json"], resolve });
}
function mutation$2(g, drivers) {
    return {
        createParticipant: createParticipant(g, drivers),
        saveParticipant: saveParticipant(g, drivers),
        deleteParticipant: deleteParticipant(g, drivers),
    };
}
function createParticipant(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        sample: g.arg.string({ required: true }),
        kwargs: g.arg({ type: "Json" }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const sample = yield drivers.sampleDriver.getBySampleCode(survey, a.sample);
            const participant = new Participant("", sample, a.kwargs);
            return drivers.participantDriver.save(survey, participant);
        }), ctx, { atomic: true });
    });
    return g.field({ args, type: "Json", resolve });
}
function saveParticipant(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        code: g.arg.string({ required: true }),
        sample: g.arg.string({}),
        kwargs: g.arg({ type: "Json" }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, a.code);
            let kwargs = Object.assign({}, a.kwargs);
            if (a.sample) {
                kwargs = Object.assign(Object.assign({}, kwargs), { sample: yield drivers.sampleDriver.getBySampleCode(survey, a.sample) });
            }
            const updated = participant.update(kwargs);
            return drivers.participantDriver.save(survey, updated);
        }), ctx);
    });
    return g.field({ args, type: "Json", resolve });
}
function deleteParticipant(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        code: g.arg.string({ required: true }),
        reason: g.arg({ type: "Json", required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, a.code);
            const deleted = participant.update({ __delete__: a.reason });
            yield drivers.participantDriver.delete(survey, deleted);
            return { participantCode: participant.participantCode };
        }), ctx);
    });
    return g.field({ args, type: "Json", resolve });
}

const dlog$4 = debug("uask:server");
function buildSampleSupport(schemaBuilder, drivers) {
    return {
        queryFields: g => queryFields$2(g, drivers),
        mutationFields: g => mutation$1(g, drivers),
    };
}
function queryFields$2(g, drivers) {
    return {
        samples: samples(g, drivers),
    };
}
function samples(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$4("GraphQL samples", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const result = samples.map(s => (Object.assign({}, s)));
            dlog$4("GraphQL samples", "end");
            return result;
        }), ctx);
    });
    return g.field({ args, type: ["Json"], resolve });
}
function mutation$1(g, drivers) {
    return {
        saveSample: saveSample(g, drivers),
    };
}
function saveSample(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        sample: g.arg({ type: "Json", required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const sample = new Sample(a.sample.sampleCode, Object.assign({}, a.sample));
            const keys = yield drivers.sampleDriver.save(survey, sample);
            return Object.assign({}, sample.update(keys));
        }), ctx);
    });
    return g.field({ args, type: "Json", resolve });
}

const dlog$3 = debug("uask:server");
function buildSurveySupport(builder, drivers) {
    return {
        queryFields: g => queryFields$1(g, drivers),
        mutationFields: g => mutation(g, drivers),
    };
}
function queryFields$1(g, drivers) {
    return {
        survey: survey(g, drivers),
    };
}
function survey(g, driverFactory) {
    const args = {
        name: g.arg.string({ required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$3("GraphQL survey", "start");
            const survey = yield drivers.surveyDriver.getByName(a.name);
            const result = surveySerialize(survey);
            dlog$3("GraphQL survey", "end");
            return result;
        }), ctx);
    });
    return g.field({ args, type: "Json", resolve });
}
function mutation(g, drivers) {
    return {
        saveSurvey: saveSurvey(g, drivers),
    };
}
function saveSurvey(g, driverFactory) {
    const args = {
        name: g.arg.string({ required: true }),
        survey: g.arg({ type: "Json", required: true }),
    };
    const resolve = (_r, a, ctx) => __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const b = new SurveyBuilder();
            surveyDeserialize(b, a.survey);
            const survey = b.get();
            const keys = yield drivers.surveyDriver.save(survey);
            return surveySerialize(survey.update(keys));
        }), ctx);
    });
    return g.field({ args, type: "Json", resolve });
}

const dlog$2 = debug("uask:server");
function buildSummarySupport(builder, drivers) {
    builder.objectType(ParticipantSummary, {
        name: "ParticipantSummary",
        fields: g => ({
            participantCode: g.exposeString("participantCode", {}),
            sampleCode: g.exposeString("sampleCode", {}),
            interviewCount: g.exposeInt("interviewCount", {}),
            currentInterview: g.expose("currentInterview", {
                nullable: true,
                type: "Json",
            }),
            pins: g.expose("pins", { nullable: true, type: "Json" }),
            kpis: g.expose("kpis", { nullable: true, type: "Json" }),
            alerts: g.field({
                nullable: true,
                type: ["Json"],
                resolve: r => [...r.alerts],
            }),
            included: g.exposeBoolean("included", {}),
            inclusionDate: g.expose("inclusionDate", {
                nullable: true,
                type: "Date",
            }),
        }),
    });
    return {
        queryFields: g => queryFields(g, drivers),
    };
}
function queryFields(g, drivers) {
    return {
        summary: summary(g, drivers),
    };
}
function summary(g, driverFactory) {
    const args = {
        survey: g.arg.string({ required: true }),
        sample: g.arg.string({}),
        offset: g.arg.int({}),
        limit: g.arg.int({}),
    };
    const resolve = (_r, a, ctx, ast) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const select = (_a = ast.fieldNodes[0].selectionSet) === null || _a === void 0 ? void 0 : _a.selections.map(n => n.name.value);
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            dlog$2("Graphql summary", "start");
            const survey = yield drivers.surveyDriver.getByName(a.survey);
            const sample = a.sample
                ? yield drivers.sampleDriver.getBySampleCode(survey, a.sample)
                : undefined;
            const options = Object.assign(Object.assign({}, (a.offset ? { offset: a.offset } : {})), (a.limit ? { limit: a.limit } : {}));
            const result = yield drivers.summaryDriver.getParticipantSummaries(survey, sample, select, options);
            dlog$2("Graphql summary", "end");
            return result;
        }), ctx);
    });
    return g.field({ args, type: [ParticipantSummary], resolve });
}

function buildSchema(driverFactory) {
    const schemaBuilder = buildSupport();
    const surveySupport = buildSurveySupport(schemaBuilder, driverFactory);
    const summarySupport = buildSummarySupport(schemaBuilder, driverFactory);
    const participantSupport = buildParticipantSupport(schemaBuilder, driverFactory);
    const interviewSupport = buildInterviewSupport(schemaBuilder, driverFactory);
    const sampleSupport = buildSampleSupport(schemaBuilder, driverFactory);
    const auditSupport = buildAuditSupport(schemaBuilder, driverFactory);
    schemaBuilder.queryType({
        fields: g => (Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, surveySupport.queryFields(g)), sampleSupport.queryFields(g)), participantSupport.queryFields(g)), summarySupport.queryFields(g)), auditSupport.queryFields(g))),
    });
    schemaBuilder.mutationType({
        fields: g => (Object.assign(Object.assign(Object.assign(Object.assign({}, surveySupport.mutationFields(g)), sampleSupport.mutationFields(g)), participantSupport.mutationFields(g)), interviewSupport.mutationFields(g))),
    });
    return schemaBuilder.toSchema({});
}

function isContactable(obj) {
    return (typeof obj == "object" && obj != null && ("email" in obj || "phone" in obj));
}

class Notifier {
    constructor(userDriver, fromUser) {
        var _a, _b;
        this.userDriver = userDriver;
        this.fromUser = fromUser;
        this.webHook = "https://chat.googleapis.com/v1/spaces/AAAAJuIG6SA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=U16boBwK9pa0igVFrHvDb0yGxacRuhGHVHU_D7hELfI%3D";
        this.origin =
            (_b = (_a = process.env.CALLBACK_ROOT_URL) === null || _a === void 0 ? void 0 : _a.replace(/\/callback/, "")) !== null && _b !== void 0 ? _b : "/";
    }
    notifyAuthentCode(user, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = typeof x == "string" ? x : y;
            user =
                typeof user == "string"
                    ? yield this.getUser(x, user)
                    : user;
            const message = `Please use the code ${code} to authenticate.`;
            yield this.notifyUser(user, message);
        });
    }
    notifyParticipantAccount(user, survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            user = yield this.getUser(survey, user);
            const root = this.participantUrl(survey, participant, true);
            const message = `Please use ${root} to connect to your account in survey ${survey.name}`;
            yield this.notifyUser(user, message);
        });
    }
    notifyEvent(user, survey, participant, interview, item) {
        return __awaiter(this, void 0, void 0, function* () {
            user = yield this.getUser(survey, user);
            const interviewIndex = participant.interviews.findIndex(i => i.nonce == interview.nonce) + 1;
            const pageIndex = interview.pageSet.pages.indexOf(interview.pageSet.getPagesForItem(item.pageItem)[0]) + 1;
            const root = this.participantUrl(survey, participant, false);
            const params = `visit=${interviewIndex}&page=${pageIndex}#${item.pageItem.variableName}`;
            const url = `${root}?${params}`;
            const notifPattern = new Metadata(item.pageItem, survey.rules)
                .notification;
            const notifMessage = notifPattern
                .replace(/@SAMPLE/g, participant.sample.sampleCode)
                .replace(/@PARTICIPANT/g, formatCode(participant, survey.options));
            const message = `${notifMessage}\nPlease check the following url : ${url}`;
            yield this.notifyUser(user, message);
        });
    }
    participantUrl(survey, participant, epro) {
        return `${this.origin}/${encodeURIComponent(survey.name)}${epro ? "/epro" : ""}/participant/${encodeURIComponent(participant.participantCode)}/form`;
    }
    getUser(survey, user) {
        var _a;
        if (isContactable(user))
            return Promise.resolve(user);
        return (_a = this.userDriver) === null || _a === void 0 ? void 0 : _a.getByUserId(survey, user);
    }
    notifyUser(user, message) {
        var _a, _b;
        if (((_a = user.email) === null || _a === void 0 ? void 0 : _a.includes("@")) && !!process.env.SENDGRID_API_KEY)
            return this.notifyByEmail(user, message);
        else if (/[+0-9 ]+/.test((_b = user.phone) !== null && _b !== void 0 ? _b : "") &&
            !process.env.TWILIO_API_KEY_SECRET)
            return this.notifyBySms(user, message);
        return Promise.resolve();
    }
    notifyBySms(user, message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const client = twilio(process.env.TWILIO_API_KEY_SID, process.env.TWILIO_API_KEY_SECRET, { accountSid: process.env.TWILIO_ACCOUNT_SID });
            const phone = (_a = user.phone) === null || _a === void 0 ? void 0 : _a.replace(/^0/, "+33").replace(/ /g, "");
            yield client.messages
                .create({
                body: message,
                messagingServiceSid: "MGe841482d8948cd0424b519c7576e5805",
                from: "ARONE",
                to: phone,
            })
                .catch(e => console.error(e));
        });
    }
    notifyByEmail(user, message) {
        return __awaiter(this, void 0, void 0, function* () {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: user.email,
                from: process.env.SENDGRID_SENDER,
                subject: "U-ASK notification",
                text: message,
            };
            yield sgMail.send(msg);
        });
    }
}

var _a$1;
const client$1 = Knex(config[(_a$1 = process.env.APP_ENV) !== null && _a$1 !== void 0 ? _a$1 : "development"]);
const DbAdapter = knexAdapter(client$1);
const manager = new AccountManager(client$1);
const findAccount = (ctx, id) => manager.findOIDCAccount(ctx, id);
const oidc = provider(DbAdapter, findAccount);
const oidcService = service(oidc, manager, (account, { code }) => __awaiter(void 0, void 0, void 0, function* () {
    const notifier = new Notifier();
    yield notifier.notifyAuthentCode(account, code);
}));

const dlog$1 = debug("uask:auth");
const jwks_uri = `${process.env.AUTH_URL}/jwks`;
class TokenVerifier {
    constructor() {
        this.JWKS = TokenVerifier.createRemoteJWKSet();
        this.tokens = new Stealer({ ttl: 60, unref: true });
        this.processedTokens = new Stealer({
            ttl: 180,
            unref: true,
        });
    }
    static createRemoteJWKSet() {
        return createRemoteJWKSet(new URL(jwks_uri));
    }
    generate(req, res) {
        const shortToken = crypto.randomInt(Math.pow(2, 47));
        const token = getToken(req);
        this.tokens.set(shortToken, token);
        res.send({ shortToken }, 200, {
            "Content-Type": "text/json",
        });
    }
    verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const shortToken = Number(req.query.shortToken);
            const { token, fromShortToken } = this.getRealToken(req, res, shortToken);
            if (fromShortToken) {
                this.handleTokenLifeCycle(res, shortToken);
            }
            yield this.verifyToken(req, res, token)
                .then(userinfo => {
                this.setUserInfo(res, userinfo);
                next();
            })
                .catch(e => {
                res.send(e, 400);
            });
        });
    }
    getRealToken(req, res, shortToken) {
        const fromShortToken = this.fromShortToken(shortToken);
        const token = fromShortToken !== null && fromShortToken !== void 0 ? fromShortToken : getToken(req);
        return { token, fromShortToken };
    }
    verifyToken(req, res, token) {
        return token.type == "jwt"
            ? this.verifyJWT(req, res, token.value)
            : this.verifyOpaque(req, res, token.value);
    }
    setUserInfo(res, userinfo) {
        const { locals } = res;
        Object.assign(res, Object.assign(Object.assign({}, locals), { locals: { userinfo } }));
    }
    handleTokenLifeCycle(res, shortToken) {
        this.tokens.delete(shortToken);
        if (res.statusCode == 200) {
            this.setProcessed(res, shortToken);
        }
    }
    setProcessed(res, shortToken) {
        this.processedTokens.set(shortToken, false);
        const listener = this.getTokenListener(res, shortToken);
        res.on("close", listener);
    }
    getTokenListener(res, shortToken) {
        const setProcessed = () => {
            this.processedTokens.set(shortToken, true);
            res.removeListener("close", setProcessed);
        };
        return setProcessed;
    }
    processed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.retryProcessed(req, res);
        });
    }
    retryProcessed(req, res, retryCount = 0) {
        const shortToken = Number(req.query.shortToken);
        const processed = this.isProcessedToken(shortToken);
        if (processed || retryCount == 20) {
            res.send({ processed }, 200, {
                Content_Type: "application/json",
            });
        }
        else
            setTimeout(() => {
                this.retryProcessed(req, res, retryCount + 1);
            }, 3000);
    }
    verifyJWT(req, res, token) {
        return jwtVerify(token, this.JWKS).then(({ payload }) => payload);
    }
    verifyOpaque(req, res, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.oidc == "undefined") {
                this.oidc = yield getOidc();
            }
            return this.oidc.userinfo(token);
        });
    }
    fromShortToken(shortToken) {
        if (!shortToken)
            return undefined;
        return this.tokens.get(shortToken);
    }
    isProcessedToken(shortToken) {
        var _a;
        if (!shortToken)
            return false;
        return (_a = this.processedTokens.get(shortToken)) !== null && _a !== void 0 ? _a : true;
    }
}
function getOidc(retries = 5) {
    dlog$1(`discovering ${process.env.AUTH_URL}, retries : ${retries}`);
    return Issuer.discover(process.env.AUTH_URL)
        .then(iss => new iss.Client({
        client_id: "nextmove",
        response_types: ["code"],
        token_endpoint_auth_method: "none",
    }))
        .catch(r => (retries > 0 ? getOidc(retries - 1) : Promise.reject(r)));
}
function getToken(req) {
    var _a;
    const value = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.substring(7);
    const type = /^[\w-]*\.[\w-]*\.[\w-]*$/.test(value) ? "jwt" : "opaque";
    return { value, type };
}

const surveyHeaderTemplate = '<h1 class="survey-header"><%=survey.name%> - Sample: <%=sampleCode%> - Participant: <%=participantCode%></h1>';
const interviewHeaderTemplate = `
<div class="interview-header">
  <div class="interview-label">
    <%=(typeof interview.date == "string" ? interview.date : interview.date?.toISOString())?.substr(0, 10)%> - <%=type%>
  </div>
  <div class="participant-label">
    Sample: <%=sampleCode%> - Participant: <%=participantCode%>
  </div>
</div>`;
const sectionHeaderTemplate = `<h2 class="section-header"><%=title%></h2>`;
const itemPartTemplate = `<div class="item-part <%=part?.name%>"><%-part.content%></div>`;
const itemTemplate = `<div class="item"><div class="item-header"></div><div class="item-content"><%-content%></div></div>`;
const itemTableTemplate = `
<div class="item-table">
 <div class="item-table-header"><%-header%></div>
 <div class="item-table-body"><%-body%></div>
</div>`;
const sectionTemplate = `
<div class="section">
 <%-title%><div class="section-content"><%-content%></div>
</div>`;
const interviewTemplate = `
<div class="interview"><%-header%>
  <div class="interview-content"><%-content%></div>
</div>
`;
const participantTemplate = `
<div class="participant <%=name%>">
  <div class="interviews"><%-content%></div>
</div>
`;
const pageTemplate = `
<div class="page">
  <%-title%><div class="page-content"><%-content%></div>
</div>
`;
const pageHeaderTemplate = `<h2 class="page-header"><%=title%></h2>`;
const surveyTemplate = `
<!DOCTYPE html>
<html lang="<%=lang%>">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><%=survey.name%> - Sample: <%=sampleCode%> - Participant: <%=participantCode%></title>
  </head>
  <body>
    <div class="survey"><%-header%>
      <div class="participants"><%-content%></div>
    </div>
  </body>
</html>`;
const specialValues = {
    notDone: "ND",
    notApplicable: "NA",
    unknown: "UK",
};
function showItem(survey, item) {
    if (isVariableHidden(item.pageItem.variableName, survey.options.inclusionVar))
        return true;
    if (item.pageItem.variableName.slice(0, 2) == "__")
        return false;
    const metadata = new Metadata(item.pageItem, survey.rules);
    return !(metadata.showable && item.specialValue == "notApplicable");
}
function surveyHeader(survey, participant) {
    return ejs.render(surveyHeaderTemplate, {
        survey,
        sampleCode: participant.sample.sampleCode,
        participantCode: formatCode(participant, survey.options),
    });
}
function interviewHeader(survey, participant, interview, lang = "en") {
    return ejs.render(interviewHeaderTemplate, {
        sampleCode: participant.sample.sampleCode,
        participantCode: formatCode(participant, survey.options),
        interview,
        type: getTranslation(interview.pageSet.type, lang),
    });
}
function sectionHeader(section, lang = "en") {
    var _a;
    if (typeof section.title == "undefined")
        return "";
    const title = (_a = getTranslation(section.title, lang)) !== null && _a !== void 0 ? _a : "";
    if (!title)
        return "";
    return ejs.render(sectionHeaderTemplate, {
        section,
        title: title,
    });
}
function pageHeader(page, interview, lang = "en") {
    var _a, _b, _c, _d, _e;
    const title = `[ ${(_c = (_b = (typeof interview.date == "string"
        ? interview.date
        : (_a = interview.date) === null || _a === void 0 ? void 0 : _a.toISOString())) === null || _b === void 0 ? void 0 : _b.substr(0, 10)) !== null && _c !== void 0 ? _c : ""} - ${(_d = getTranslation(interview.pageSet.type, lang)) !== null && _d !== void 0 ? _d : ""} ] - ${(_e = getTranslation(page.name, lang)) !== null && _e !== void 0 ? _e : ""}`;
    return ejs.render(pageHeaderTemplate, {
        page,
        title: title,
    });
}
function page(survey, page, interview, lang = "en") {
    const pageItems = page.items
        .flatMap(i => {
        const prototype = getItem(i);
        const all = interview.getItemsForPrototype(prototype);
        if (all.length == 0 || all[0].pageItem != prototype)
            return [new InterviewItem(i, undefined)];
        return all;
    })
        .filter(ii => showItem(survey, ii));
    const data = {
        title: pageHeader(page, interview, lang),
        content: [...parseLayout(pageItems).map(c => section(c, lang))].join(""),
    };
    return ejs.render(pageTemplate, data);
}
function itemPart(part) {
    return ejs.render(itemPartTemplate, { part });
}
function item(content, lang = "en") {
    var _a;
    const item = content.item;
    return ejs.render(itemTemplate, {
        content: [
            itemPart({
                content: wordingContent((_a = content.labels.wording) !== null && _a !== void 0 ? _a : item, lang),
                name: "wording simple",
            }),
            itemPart({
                content: valueContent(item, lang),
                name: "value simple",
            }),
        ].join(""),
    });
}
function wordingContent(item, lang) {
    var _a;
    return ((_a = getTranslation(isMLstring(item) ? item : getItemWording(item), lang)) !== null && _a !== void 0 ? _a : "");
}
function headersContent(headers, lang) {
    return [
        ...headers.map((c, i) => itemPart({
            content: wordingContent(isMLstring(c) ? c : c.wording, lang),
            name: i == 0 ? "wording" : "header",
        })),
    ].join("");
}
function valueContent(item, lang) {
    var _a, _b;
    return `${(item === null || item === void 0 ? void 0 : item.specialValue)
        ? specialValues[item.specialValue]
        : (_b = (_a = item === null || item === void 0 ? void 0 : item.label(lang)) !== null && _a !== void 0 ? _a : item === null || item === void 0 ? void 0 : item.value) !== null && _b !== void 0 ? _b : ""}`.trim();
}
function table(content, lang = "en") {
    const header = ejs.render(itemTemplate, {
        content: headersContent(["", ...content.columns], lang),
    });
    const body = content.items
        .map(item => ejs.render(itemTemplate, {
        content: [
            itemPart({
                content: wordingContent(item.wording, lang),
                name: "wording row",
            }),
            ...item.row.map(c => itemPart({
                content: valueContent(c === null || c === void 0 ? void 0 : c.item, lang),
                name: "value row",
            })),
        ].join(""),
    }))
        .join("");
    return ejs.render(itemTableTemplate, { header, body });
}
function recordset(content, lang = "en") {
    const data = content.items
        .map((record, x) => {
        const c = record.filter((i, x) => record.indexOf(i) == x);
        return section({ title: `${x + 1}.`, content: c }, lang);
    })
        .join("");
    return ejs.render(sectionTemplate, { title: "", content: data });
}
function richItem(content, lang = "en") {
    var _a, _b, _c, _d, _e;
    return ejs.render(itemTemplate, {
        content: [
            itemPart({
                content: content.labels.wording
                    ? (_a = getTranslation(content.labels.wording, lang)) !== null && _a !== void 0 ? _a : ""
                    : `${(_b = getTranslation(content.labels.leftWording, lang)) !== null && _b !== void 0 ? _b : ""} / ${(_c = getTranslation(content.labels.rightWording, lang)) !== null && _c !== void 0 ? _c : ""}`,
                name: "wording rich",
            }),
            itemPart({
                content: `${(_e = (_d = content.item.label(lang)) !== null && _d !== void 0 ? _d : content.item.value) !== null && _e !== void 0 ? _e : ""}${content.item.specialValue
                    ? specialValues[content.item.specialValue]
                    : ""}`.trim(),
                name: "value rich",
            }),
        ].join(""),
    });
}
function section(section, lang = "en") {
    const data = {
        title: sectionHeader(section, lang),
        content: section.content
            .map(c => {
            switch (c === null || c === void 0 ? void 0 : c.behavior) {
                case "item":
                    return item(c, lang);
                case "table":
                    return table(c, lang);
                case "recordset":
                    return recordset(c, lang);
                case "richItem":
                    return richItem(c, lang);
                default:
                    return "";
            }
        })
            .join(""),
    };
    return ejs.render(sectionTemplate, data);
}
function interview(survey, participant, interview, lang = "en") {
    const data = {
        participant,
        interview,
        header: interviewHeader(survey, participant, interview, lang),
        items: interview.items,
        content: [
            ...interview.pageSet.pages.map(p => page(survey, p, interview, lang)),
        ].join(""),
    };
    return ejs.render(interviewTemplate, data);
}
function participant(survey, participant, lang = "en") {
    const data = {
        participant,
        content: [
            ...participant.interviews
                .filter(i => i.items.length != 0)
                .map(i => interview(survey, participant, i, lang)),
        ].join(""),
        name: participant.participantCode.startsWith("annotated")
            ? "annotated"
            : participant.participantCode.startsWith("blank")
                ? "blank"
                : "",
    };
    return ejs.render(participantTemplate, data);
}
function print(survey, p, lang = "en") {
    const data = {
        survey,
        header: surveyHeader(survey, p),
        content: participant(survey, p, lang),
        sampleCode: p.sample.sampleCode,
        participantCode: formatCode(p, survey.options),
        lang,
    };
    return ejs.render(surveyTemplate, data);
}

const annotationTemplate = `<div class="annotation">
  <span class="annotation variable"><%=variableName%></span>
  <span class="annotation type"><%=annotation%></span>
</div>
<div class="mask"><%-mask%></div>`;
const rawValueTemplate = `<span class="annotation raw-value">(<%=raw%>)</span>`;
const labelTemplate = `<span class="label box"><%=box%></span> <%-label%>`;
function blank(survey) {
    const modifiedSurvey = special(survey, pi => pi.update({
        type: new WrappedType(pi.type),
    }));
    return makeParticipant(modifiedSurvey, "blank0000000000");
}
function annotated(survey) {
    const modifiedSurvey = special(survey, pi => pi.update({
        type: new WrappedAnnotatedType(pi, new Metadata(pi, survey.rules)),
    }));
    return makeParticipant(modifiedSurvey, "annotated0000000000");
}
function makeParticipant(survey, participantCode) {
    return new Participant(participantCode, new Sample(""), {
        interviews: survey.pageSets.map(pageSet => makeInterview(survey, pageSet)),
    });
}
function makeInterview(survey, pageSet) {
    return new Interview(pageSet, survey.options, {
        items: pageSet.items.map(item => new InterviewItem(getItem(item), undefined, {
            context: getItemContext(item),
        })),
    });
}
function reword(wording, annotation, rewordOptions = { newline: true }) {
    if (typeof wording == "string")
        return formatWording(wording);
    if (!Array.isArray(wording))
        return Object.entries(wording).reduce((result, [lang, w]) => {
            return Object.assign(Object.assign({}, result), { [lang]: formatWording(w) });
        }, {});
    return wording.map(w => reword(w, annotation));
    function formatWording(w) {
        return `${w}${rewordOptions.newline ? "<br>" : " "}${annotation}`;
    }
}
function special(survey, transform) {
    const json = surveySerialize(survey);
    const builder = new WrappedSurveyBuilder(transform);
    surveyDeserialize(builder, json);
    return builder.build();
}
class WrappedType {
    constructor(type) {
        this.type = type;
        this.name = type.name;
        this.nature = type.nature;
        if (hasFixedLabels(type))
            this.labels = type.labels;
    }
    label(value, lang) {
        return mask(this.type, lang);
    }
    rawValue(value) {
        return this.type.rawValue(value);
    }
    typedValue(value, ctx) {
        return this.type.typedValue(value, ctx);
    }
}
class WrappedAnnotatedType {
    constructor(pageItem, metadata) {
        this.pageItem = pageItem;
        this.metadata = metadata;
        this.name = pageItem.type.name;
        this.nature = pageItem.type.nature;
        if (hasFixedLabels(pageItem.type))
            this.labels = pageItem.type.labels;
    }
    label(value, lang) {
        const data = {
            variableName: this.pageItem.variableName,
            annotation: this.annotation,
            mask: mask(this.pageItem.type, lang, { displayRaw: true }),
        };
        return ejs.render(annotationTemplate, data);
    }
    get annotation() {
        const annotations = [...this.metadata.properties];
        if (this.metadata.required)
            annotations.push(`required`);
        if (this.metadata.maxLength != undefined)
            annotations.push(`max length=${this.metadata.maxLength}`);
        if (this.metadata.fixedLength != undefined)
            annotations.push(`length=${this.metadata.fixedLength}`);
        if (this.metadata.range != undefined)
            annotations.push(`${this.metadata.range}`);
        if (this.metadata.precision != undefined)
            annotations.push(`precision=${this.metadata.precision}`);
        if (this.metadata.letterCase != undefined)
            annotations.push(`${this.metadata.letterCase} case`);
        return annotations.join(" ");
    }
    rawValue(value) {
        return this.pageItem.type.rawValue(value);
    }
    typedValue(value, ctx) {
        return this.pageItem.type.typedValue(value, ctx);
    }
}
function mask(type, lang, maskOptions = { displayRaw: false }) {
    if (type instanceof InfoType)
        return "";
    if (hasFixedLabels(type))
        return maskForLabels(type, lang, maskOptions);
    if (type instanceof DateType || type instanceof TimeType)
        return maskForDateTime(type);
    return "______________";
}
function maskForDateTime(type) {
    const b = "__";
    const s = String.fromCharCode(0x2012);
    const bb = `${b} ${b}`;
    const box = type instanceof TimeType
        ? `${bb}:${bb}`
        : type.month
            ? `${bb} ${bb}${s}${bb}`
            : `${bb} ${bb}${s}${bb}${s}${bb}`;
    return ejs.render(labelTemplate, { box, label: "" });
}
function maskForLabels(type, lang, maskOptions) {
    return type.labels
        .map((l, i) => {
        const value = getTranslation(l, lang);
        const raw = ejs.render(rawValueTemplate, { raw: type.rawValues[i] });
        return maskForLabel(type, value, raw, maskOptions);
    })
        .join("<br>");
}
function maskForLabel(type, value, raw, maskOptions) {
    const label = maskOptions.displayRaw
        ? reword(value, raw, { newline: false })
        : value;
    const box = type instanceof ChoiceType && type.multiplicity == "many"
        ? String.fromCharCode(0x25a2)
        : String.fromCharCode(0x25cb);
    return ejs.render(labelTemplate, {
        box,
        label,
    });
}
class WrappedSurveyBuilder {
    constructor(transform) {
        return new Proxy(new SurveyBuilder(), {
            get: (target, p, receiver) => {
                if (p == "page")
                    return (name) => {
                        const pageBuilder = target.page(name);
                        const proxy = new WrappedPageBuilder(pageBuilder, transform);
                        target.pages[target.pages.length - 1] = proxy;
                        return proxy;
                    };
                return Reflect.get(target, p, receiver);
            },
        });
    }
}
class WrappedPageBuilder {
    constructor(pageBuilder, transform) {
        return new Proxy(pageBuilder, {
            get: (target, p, receiver) => {
                if (p == "question")
                    return (...args) => {
                        const itemBuilder = target.question(...args);
                        const proxy = new WrappedPageItemBuilder(itemBuilder, transform);
                        target.includes[target.includes.length - 1] = proxy;
                        return proxy;
                    };
                return Reflect.get(target, p, receiver);
            },
        });
    }
}
class WrappedPageItemBuilder {
    constructor(itemBuilder, transform) {
        return new Proxy(itemBuilder, {
            get: (target, p, receiver) => {
                if (p == "build")
                    return (ib) => transform(target.build(ib));
                return Reflect.get(target, p, receiver);
            },
        });
    }
}

function getDomain(drivers, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const survey = yield drivers.surveyDriver.getByName(req.params.name);
        const samples = yield drivers.sampleDriver.getAll(survey);
        const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, req.params.participantCode);
        return { survey, participant };
    });
}
function getPrintSpecial(driverFactory, special, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.name);
            const html = req.params.lang
                ? print(survey, special(survey), req.params.lang)
                : print(survey, special(survey));
            res.send(html.toString(), 200, {
                "Content-Type": "text/html",
            });
            res.end();
        }), { req, res });
    });
}
function getPrintByCode(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const { survey, participant } = yield getDomain(drivers, req);
            const html = req.params.lang
                ? print(survey, participant, req.params.lang)
                : print(survey, participant);
            res.send(html.toString(), 200, {
                "Content-Type": "text/html",
            });
            res.end();
        }), { req, res });
    });
}
function htmlRouter(driverFactory) {
    return restana()
        .newRouter()
        .get("/:name/blank/:lang?", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getPrintSpecial(driverFactory, blank, req, res);
    }))
        .get("/:name/annotated/:lang?", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getPrintSpecial(driverFactory, annotated, req, res);
    }))
        .get("/:name/:participantCode/:lang?", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getPrintByCode(driverFactory, req, res);
    }));
}

function getDocumentByHash(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const hash = Number(req.params.hash);
            const document = yield drivers.documentDriver.getByHash(survey, hash);
            res.send(document, 200, { "Content-Type": "application/json" });
        }), { req, res });
    });
}
function saveDocumentContent(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const hash = Number(req.params.hash);
            const content = new Uint8Array(req.body);
            yield drivers.documentDriver.saveContent(survey, hash, content);
            res.send({}, 200, { "Content-Type": "application/json" });
        }), { req, res });
    });
}
function getDocumentContent(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const hash = Number(req.params.hash);
            const { content, name } = yield drivers.documentDriver.getContent(survey, hash);
            res.send(content, 200, {
                "Content-Type": "application/octet-stream",
                "Content-disposition": `attachment;filename=${name}`,
            });
        }), { req, res });
    });
}
function getAllDocuments(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const documents = yield drivers.documentDriver.getAll(survey);
            res.send(documents, 200, { "Content-Type": "application/json" });
        }), { req, res });
    });
}
function saveDocument(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const hash = Number(req.params.hash);
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            const data = req.body;
            const { name, title, tags } = data, kwargs = __rest(data, ["name", "title", "tags"]);
            const document = new Document(name, title, tags, Object.assign({}, kwargs));
            if (!isNaN(hash) && hash != document.hash) {
                res.send({ error: "Wrong hash" }, 400, {
                    "Content-Type": "application/json",
                });
            }
            else {
                const { hash: newHash } = yield drivers.documentDriver.save(survey, document);
                const code = isNaN(hash) ? 201 : 200;
                res.send({ hash: newHash }, code, {
                    "Content-Type": "application/json",
                });
            }
        }), { req, res });
    });
}
function deleteDocument(driverFactory, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers) => __awaiter(this, void 0, void 0, function* () {
            const hash = Number(req.params.hash);
            const survey = yield drivers.surveyDriver.getByName(req.params.survey);
            yield drivers.documentDriver.delete(survey, hash);
            res.send({}, 200);
        }), { req, res });
    });
}
function documentRouter(driverFactory) {
    return restana()
        .newRouter()
        .get("/:survey/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getAllDocuments(driverFactory, req, res);
    }))
        .get("/:survey/:hash", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getDocumentByHash(driverFactory, req, res);
    }))
        .post("/:survey/:hash/content", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield saveDocumentContent(driverFactory, req, res);
    }))
        .post("/:survey/:hash", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield saveDocument(driverFactory, req, res);
    }))
        .post("/:survey/create", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield saveDocument(driverFactory, req, res);
    }))
        .delete("/:survey/:hash", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield deleteDocument(driverFactory, req, res);
    }))
        .get("/:survey/:hash/content", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield getDocumentContent(driverFactory, req, res);
    }));
}

function notificationRouter(driverFactory, notifier) {
    return restana()
        .newRouter()
        .post("/:name/participant/create/:participantCode", (req, res) => __awaiter(this, void 0, void 0, function* () {
        yield notifyParticipantCreation(driverFactory, notifier, req, res);
    }));
}
function notifyParticipantCreation(driverFactory, notifier, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return driverFactory((drivers, fromUser) => __awaiter(this, void 0, void 0, function* () {
            const survey = yield drivers.surveyDriver.getByName(req.params.name);
            const samples = yield drivers.sampleDriver.getAll(survey);
            const participant = yield drivers.participantDriver.getByParticipantCode(survey, samples, req.params.participantCode);
            const toUser = `${survey.name}_${participant.participantCode}`;
            const notif = yield notifier(drivers, fromUser);
            yield notif.notifyParticipantAccount(toUser, survey, participant);
            res.send(200);
        }), { req, res });
    });
}

const dlog = debug("uask:http");
function app(service, driverFactory) {
    service = service.use((req, res, next) => {
        res.on("finish", () => {
            dlog(req.socket.remoteAddress, req.method, req.originalUrl, res.statusCode);
        });
        next();
    });
    service = setCors(service);
    service = setFacade(service);
    service = setTokenVerifier(service);
    service = service
        .use(bodyParser.json({ limit: "10mb" }))
        .use(bodyParser.raw({ limit: "10mb" }));
    service = setRest(service, driverFactory);
    service = setGraphql(service, driverFactory);
    return service;
}
function setCors(service) {
    return service
        .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    })
        .options("*", (req, res) => {
        res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
        res.send();
    });
}
function setFacade(service) {
    var _a;
    return service
        .use(helmet({
        contentSecurityPolicy: {
            directives: {
                "form-action": [
                    "'self'",
                    new URL(process.env.CALLBACK_ROOT_URL).host,
                ],
            },
        },
    }))
        .use(serveStatic((_a = process.env.AUTH_APP_PATH) !== null && _a !== void 0 ? _a : "node_modules/uask-auth/dist/app"))
        .use("/oidc", oidcService);
}
function setTokenVerifier(service) {
    const verifier = new TokenVerifier();
    return service
        .use((req, res, next) => verifier.verify(req, res, next))
        .use("/shorttoken/processed", (req, res) => verifier.processed(req, res))
        .use("/shorttoken/generate", (req, res) => verifier.generate(req, res));
}
function setRest(service, driverFactory) {
    const notifier = (d, u) => __awaiter(this, void 0, void 0, function* () { return new Notifier(d.userDriver, u); });
    return service
        .use("/notification", notificationRouter(driverFactory, notifier))
        .use("/document", documentRouter(driverFactory))
        .use("/export", exportRouter(driverFactory))
        .use("/print", htmlRouter(driverFactory))
        .use("/admin", adminRouter(driverFactory));
}
function setGraphql(service, driverFactory) {
    const schema = buildSchema(driverFactory);
    service = service.use("/graphql", (req, res) => {
        const graphqlService = graphqlHTTP({
            schema,
            customFormatErrorFn,
            context: { req, res },
        });
        const request = req;
        graphqlService(request, res);
    });
    return service;
}
function customFormatErrorFn(error) {
    var _a;
    return errorMessage(error.message, ((_a = error.originalError) === null || _a === void 0 ? void 0 : _a.name) != "UaskError" ? 500 : undefined);
}

class DocumentStoreDriver {
    constructor(store) {
        this.store = store;
    }
    save(survey, document) {
        const hash = this.h(survey, document);
        return this.store
            .saveDocument(survey, document.update({ hash }))
            .then(k => (Object.assign(Object.assign({}, k), { hash })));
    }
    delete(survey, hash) {
        return this.store.deleteDocument(hash, survey.__keys__);
    }
    getByHash(survey, hash) {
        return this.store
            .getDocumentNode(hash, survey.__keys__)
            .then(node => createDocument(node));
    }
    getAll(survey) {
        return this.store
            .getDocumentNodes(survey.__keys__)
            .then(nodes => nodes.map(node => createDocument(node)));
    }
    saveContent(survey, hash, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.getByHash(survey, hash);
            this.store.saveDocument(survey, document.update({ content }));
        });
    }
    getContent(survey, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.getDocumentContent(survey.__keys__, hash);
        });
    }
    h(survey, document) {
        var _a;
        return fnv([(_a = survey.__keys__) === null || _a === void 0 ? void 0 : _a.id, document.name, document.title].join(","));
    }
}
function createDocument(node) {
    const { name, title, tags } = node, other = __rest(node, ["name", "title", "tags"]);
    return new Document(name, title, tags
        ? DomainCollection(...tags)
        : undefined, Object.assign({}, other));
}

const superUsers = ["developer", "superadministrator"];
const administrators = ["administrator", ...superUsers];
const writers = ["writer", ...superUsers];
class ParticipantAuthorizationManager {
    constructor(survey, participant, user) {
        this.survey = survey;
        this.participant = participant;
        this.user = user;
    }
    get workflow() {
        var _a;
        return this.user
            ? (_a = this.survey.workflow(this.user.workflow)) !== null && _a !== void 0 ? _a : this.survey.mainWorkflow
            : this.survey.mainWorkflow;
    }
    canDelete() {
        return !this.canDeleteError();
    }
    canDeleteError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to delete";
        if (this.isFrozen())
            return "sample is frozen";
        return "";
    }
    canCreate() {
        return !this.canCreateError();
    }
    canCreateError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...writers))
            return "role is not authorized to create items";
        if (this.isFrozen())
            return "sample is frozen";
        return "";
    }
    canWriteItems(interview) {
        return !this.canWriteItemsError(interview);
    }
    canWriteItemsError(interview) {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...writers))
            return "role is not authorized to write items";
        if (this.isInWorkflow(interview))
            return "workflow is not authorized to write items for interview";
        if (this.isFrozen())
            return "sample is frozen";
        return "";
    }
    isFrozen() {
        return this.participant.sample.frozen;
    }
    isInRole(...roles) {
        return this.user ? roles.includes(this.user.role) : false;
    }
    isInWorkflow(interview) {
        return !this.workflow.pageSets.includes(interview.pageSet);
    }
}
class SurveyAuthorizationManager {
    constructor(survey, user) {
        this.survey = survey;
        this.user = user;
    }
    canReadSample(sampleCode) {
        return !this.canReadSampleError(sampleCode);
    }
    canReadSampleError(sampleCode) {
        if (!this.user)
            return "unknown user";
        if (this.user.sampleCodes &&
            this.user.sampleCodes.length > 0 &&
            !this.user.sampleCodes.includes(sampleCode))
            return "not authorized to read participants from sample";
        return "";
    }
    canReadParticipant(participantCode) {
        return !this.canReadParticipantError(participantCode);
    }
    canReadParticipantError(participantCode) {
        if (!this.user)
            return "unknown user";
        if (this.user.participantCodes &&
            this.user.participantCodes.length > 0 &&
            !this.user.participantCodes.includes(participantCode))
            return "not authorized to read participant";
        return "";
    }
    canSaveUser() {
        return !this.canSaveUserError();
    }
    canSaveUserError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to save user";
        return "";
    }
    canSaveSurvey() {
        return !this.canSaveSurveyError();
    }
    canSaveSurveyError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to save survey";
        return "";
    }
    canSaveSample() {
        return !this.canSaveSampleError();
    }
    canSaveSampleError() {
        if (!this.user)
            return "unknown user";
        if (!this.isInRole(...administrators))
            return "role is not authorized to save sample";
        return "";
    }
    canSaveDocument(document) {
        return !this.canSaveDocumentError(document);
    }
    canSaveDocumentError(document) {
        if (!this.user)
            return "unknown user";
        if (document.visibility == "survey" && !this.isInRole(...administrators))
            return "role is not authorized to save survey document";
        if (document.visibility == "participant" && !this.isInRole(...writers))
            return "role is not authorized to save participant document";
        return "";
    }
    isInRole(...roles) {
        return this.user ? roles.includes(this.user.role) : false;
    }
}

class UserAutzDriver {
    constructor(driver, callerid) {
        this.driver = driver;
        this.callerid = callerid;
    }
    getAll(survey) {
        return this.driver.getAll(survey);
    }
    getByUserId(survey, userid) {
        return this.driver.getByUserId(survey, userid);
    }
    save(survey, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = yield this.getByUserId(survey, this.callerid);
            const am = new SurveyAuthorizationManager(survey, caller);
            if (user.userid != this.callerid && !am.canSaveUser())
                return Promise.reject(am.canSaveUserError());
            return this.driver.save(survey, user);
        });
    }
}

class ParticipantBoxDriver {
    constructor(driver, box) {
        this.driver = driver;
        this.box = box;
    }
    getAll(survey, samples, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const participants = yield this.driver.getAll(survey, samples, options);
            const secure = yield this.box.needBox(survey);
            if (secure)
                return participants.map(participant => secure.box(survey, participant));
            return participants;
        });
    }
    getByParticipantCode(survey, samples, participantCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const participant = yield this.driver.getByParticipantCode(survey, samples, participantCode);
            const secure = yield this.box.needBox(survey);
            if (secure)
                return secure.box(survey, participant, { memoize: true });
            return participant;
        });
    }
    getBySample(survey, sample, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const participants = yield this.driver.getBySample(survey, sample, options);
            const secure = yield this.box.needBox(survey);
            if (secure)
                return participants.map(participant => secure.box(survey, participant));
            return participants;
        });
    }
    save(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const boxInstance = participant.participantCode
                ? yield this.box.needBox(survey)
                : false;
            if (boxInstance) {
                const restored = yield boxInstance.unbox(survey, participant);
                return yield this.driver.save(survey, restored);
            }
            return yield this.driver.save(survey, participant);
        });
    }
}

class InterviewBoxDriver {
    constructor(driver, box) {
        this.driver = driver;
        this.box = box;
    }
    save(survey, participant, interview, items = interview.items, options = new InterviewSaveOptions()) {
        return __awaiter(this, void 0, void 0, function* () {
            const secure = yield this.box.needBox(survey);
            if (secure) {
                if (!secure.workflow.pageSets.includes(interview.pageSet))
                    return [{}, { items: [] }];
                const restored = yield secure.unbox(survey, participant);
                return yield this.driver.save(survey, restored, interview, items, options);
            }
            return yield this.driver.save(survey, participant, interview, items, options);
        });
    }
}

class ParticipantBox {
    constructor(participantDriver, userDriver, userid) {
        this.participantDriver = participantDriver;
        this.userDriver = userDriver;
        this.userid = userid;
    }
    unbox(survey, participant, workflow) {
        return __awaiter(this, void 0, void 0, function* () {
            const cached = ParticipantBox.cache.get(this.getKey(survey, participant));
            if (cached)
                return this.get(workflow, participant, cached);
            const fetched = yield this.participantDriver.getByParticipantCode(survey, [participant.sample], participant.participantCode);
            yield this.put(survey, fetched);
            return fetched;
        });
    }
    put(survey, participant) {
        ParticipantBox.cache.set(this.getKey(survey, participant), participant);
    }
    getKey(survey, participant) {
        return fnv(`${survey.name}_${this.userid}_${participant.participantCode}`);
    }
    get(workflow, participant, realParticipant) {
        return participant.update({
            interviews: participant.interviews.update(i => {
                var _a;
                return !workflow.pageSets.includes(i.pageSet)
                    ? (_a = realParticipant.interviews.find(ii => ii.nonce == i.nonce)) !== null && _a !== void 0 ? _a : i
                    : i;
            }),
        });
    }
    box(survey, participant, workflow, { memoize } = { memoize: false }) {
        if (memoize)
            this.put(survey, participant);
        return participant.update({
            interviews: participant.interviews.update(i => workflow.pageSets.includes(i.pageSet)
                ? i
                : i.update({ items: DomainCollection() })),
        });
    }
    needBox(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDriver.getByUserId(survey, this.userid);
            if (!user)
                throw "unknown user";
            const workflow = survey.workflow(user.workflow);
            if (!workflow)
                return false;
            return new BoxInstance(this, workflow);
        });
    }
}
ParticipantBox.cache = new Stealer({
    ttl: 30,
    unref: true,
});
class BoxInstance {
    constructor(participantBox, workflow) {
        this.participantBox = participantBox;
        this.workflow = workflow;
    }
    box(survey, participant, options = { memoize: false }) {
        return this.participantBox.box(survey, participant, this.workflow, options);
    }
    unbox(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.participantBox.unbox(survey, participant, this.workflow);
        });
    }
}

class InterviewAutzDriver {
    constructor(driver, userDriver, userid) {
        this.driver = driver;
        this.userDriver = userDriver;
        this.userid = userid;
    }
    save(survey, participant, interview, items, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const am = yield this.getAutz(survey, participant);
            if (this.itemChanged(interview) && !am.canWriteItems(interview))
                return Promise.reject(am.canWriteItemsError(interview));
            return yield this.driver.save(survey, participant, interview, items, options);
        });
    }
    delete(survey, participant, interview) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDriver.getByUserId(survey, this.userid);
            const am = new ParticipantAuthorizationManager(survey, participant, user);
            if (!am.canDelete())
                return Promise.reject(am.canDeleteError());
            return this.driver.delete(survey, participant, interview);
        });
    }
    getAutz(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDriver.getByUserId(survey, this.userid);
            return new ParticipantAuthorizationManager(survey, participant, user);
        });
    }
    itemChanged(interview) {
        return interview.nonce == 0 || interview.items.some(i => isManaged(i));
    }
}

class InterviewNotificationDriver {
    constructor(driver, userDriver, notifier) {
        this.driver = driver;
        this.userDriver = userDriver;
        this.notifier = notifier;
    }
    save(survey, participant, interview, items = interview.items, options) {
        return __awaiter(this, void 0, void 0, function* () {
            assertNoSubset(interview, items);
            const notifyIndex = [];
            const acknowledged = this.getNotifications(notifyIndex, interview);
            yield this.notify(notifyIndex, survey, participant, interview);
            const infoKeys = yield this.driver.save(survey, participant, acknowledged, undefined, options);
            return this.buidResult(infoKeys, acknowledged, interview);
        });
    }
    getNotifications(notifyIndex, interview) {
        return interview.update({
            items: interview.items.map((i, x) => {
                var _a, _b;
                if (typeof i.event == "undefined")
                    return i;
                const prev = (_b = (_a = i.__changes__) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : i.value;
                if (prev != i.value)
                    notifyIndex.push(x);
                return i.acknowledgeEvent();
            }),
        });
    }
    notify(notifyIndex, survey, participant, interview) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const x of notifyIndex) {
                const item = interview.items[x];
                const notifyUsers = yield this.getRecipients(survey, item, participant);
                for (const user of notifyUsers)
                    this.notifier.notifyEvent(user, survey, participant, interview, item);
            }
        });
    }
    getRecipients(survey, item, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const workflows = survey.workflows.filter(w => { var _a; return w.notifications.includes((_a = item.event) === null || _a === void 0 ? void 0 : _a.event); });
            return yield this.getWorkflowUsers(survey, participant.sample, workflows);
        });
    }
    getWorkflowUsers(survey, sample, workflows) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userDriver.getAll(survey);
            return users.filter(u => {
                var _a;
                return workflows.some(w => w.name == u.workflow) &&
                    ((_a = u.sampleCodes) === null || _a === void 0 ? void 0 : _a.includes(sample.sampleCode));
            });
        });
    }
    buidResult(infoKeys, acknowledged, interview) {
        return [
            infoKeys[0],
            {
                items: infoKeys[1].items.map((k, x) => acknowledged.items[x] == interview.items[x]
                    ? k
                    : Object.assign(Object.assign({}, k), { messages: acknowledged.items[x].messages })),
            },
        ];
    }
}

class UserRoleDriver {
    constructor(driver, sampleDriver) {
        this.driver = driver;
        this.sampleDriver = sampleDriver;
        this.allSamplesRoles = [
            "administrator",
            "developer",
            "superadministrator",
        ];
    }
    getAll(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.driver.getAll(survey);
            const samples = yield this.sampleDriver.getAll(survey);
            return users.map(u => {
                if (this.allSamplesRoles.includes(u.role)) {
                    return u.update({
                        sampleCodes: DomainCollection(...samples.map(s => s.sampleCode)),
                    });
                }
                return u;
            });
        });
    }
    getByUserId(survey, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.driver.getByUserId(survey, userid);
            if (typeof user == "undefined")
                return undefined;
            const samples = yield this.sampleDriver.getAll(survey);
            if (this.allSamplesRoles.includes(user.role)) {
                return user.update({
                    sampleCodes: DomainCollection(...samples.map(s => s.sampleCode)),
                });
            }
            return user;
        });
    }
    save(survey, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = this.allSamplesRoles.includes(user.role)
                ? user.update({ sampleCodes: DomainCollection("__all__") })
                : user;
            return this.driver.save(survey, updatedUser);
        });
    }
}

class SurveyAutzDriver {
    constructor(driver, userDriver, userid) {
        this.driver = driver;
        this.userDriver = userDriver;
        this.userid = userid;
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield this.driver.getByName(name);
            const caller = yield this.userDriver.getByUserId(survey, this.userid);
            if (typeof caller == "undefined")
                return Promise.reject("not authorized to read survey");
            return survey;
        });
    }
    save(survey) {
        return this.driver
            .getByName(survey.name)
            .then(() => this.update(survey))
            .catch(r => r == "unknown survey" ||
            (r instanceof Error && r.message == "unknown survey")
            ? this.create(survey)
            : Promise.reject(r));
    }
    update(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = yield this.userDriver.getByUserId(survey, this.userid);
            const am = new SurveyAuthorizationManager(survey, caller);
            if (!am.canSaveSurvey())
                return Promise.reject(am.canSaveSurveyError());
            return this.driver.save(survey);
        });
    }
    create(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = yield this.driver.save(survey);
            yield this.userDriver.save(survey, new User("superadministrator").update({ userid: this.userid }));
            return s;
        });
    }
}

class SampleAutzDriver {
    constructor(driver, userDriver, userid) {
        this.driver = driver;
        this.userDriver = userDriver;
        this.userid = userid;
    }
    getAll(survey) {
        return this.driver.getAll(survey);
    }
    getBySampleCode(survey, sampleCode) {
        return this.driver.getBySampleCode(survey, sampleCode);
    }
    save(survey, sample) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = yield this.userDriver.getByUserId(survey, this.userid);
            const am = new SurveyAuthorizationManager(survey, caller);
            if (!am.canSaveSample())
                return Promise.reject(am.canSaveSampleError());
            return this.driver.save(survey, sample);
        });
    }
}

class ParticipantAutzDriver {
    constructor(driver, userDriver, userId) {
        this.driver = driver;
        this.userDriver = userDriver;
        this.userId = userId;
    }
    getAll(survey, samples, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const am = yield this.getAutz(survey, samples);
            const participants = yield this.driver.getAll(survey, samples, options);
            return participants.filter(p => am.canReadParticipant(p.participantCode) &&
                am.canReadSample(p.sample.sampleCode));
        });
    }
    getBySample(survey, sample, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const am = yield this.getAutz(survey, [sample]);
            if (!am.canReadSample(sample.sampleCode))
                return Promise.reject(am.canReadSampleError(sample.sampleCode));
            const participants = yield this.driver.getBySample(survey, sample, options);
            return participants.filter(p => am.canReadParticipant(p.participantCode));
        });
    }
    getByParticipantCode(survey, samples, participantCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const am = yield this.getAutz(survey, samples);
            if (!am.canReadParticipant(participantCode))
                return Promise.reject(am.canReadParticipantError(participantCode));
            const participant = yield this.driver.getByParticipantCode(survey, samples, participantCode);
            if (!am.canReadSample(participant.sample.sampleCode))
                return Promise.reject(am.canReadSampleError(participant.sample.sampleCode));
            return participant;
        });
    }
    save(survey, participant) {
        return this.driver.save(survey, participant);
    }
    delete(survey, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            const am = yield this.getAutz(survey, participant);
            if (!am.canDelete())
                return Promise.reject(am.canDeleteError());
            return this.driver.delete(survey, participant);
        });
    }
    getAutz(survey, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDriver.getByUserId(survey, this.userId);
            return y instanceof Participant
                ? new ParticipantAuthorizationManager(survey, y, user)
                : new SurveyAuthorizationManager(survey, user);
        });
    }
}

class SummaryAutzDriver {
    constructor(driver, sampleDriver, uderDriver, userId) {
        this.driver = driver;
        this.sampleDriver = sampleDriver;
        this.uderDriver = uderDriver;
        this.userId = userId;
    }
    getParticipantSummaries(survey, sample, x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            const am = yield this.getAutz(survey);
            if (sample && !am.canReadSample(sample.sampleCode))
                return Promise.reject(am.canReadSampleError(sample.sampleCode));
            const select = Array.isArray(x) ? x : [];
            const options = Array.isArray(x) ? y : x;
            const summaries = yield this.driver.getParticipantSummaries(survey, sample, select.length > 0 ? [...select, "sampleCode"] : [], options);
            return summaries
                .filter(s => am.canReadSample(s.sampleCode))
                .map(s => this.restoreSelect(s, select));
        });
    }
    getAutz(survey) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.uderDriver.getByUserId(survey, this.userId);
            return new SurveyAuthorizationManager(survey, user);
        });
    }
    restoreSelect(s, select) {
        if (select.length > 0 && !select.includes("sampleCode")) {
            const o = __rest(s, ["sampleCode"]);
            return o;
        }
        return s;
    }
}

class AuditAutzDriver {
    constructor(driver, sampleDriver, userDriver, userid) {
        this.driver = driver;
        this.sampleDriver = sampleDriver;
        this.userDriver = userDriver;
        this.userid = userid;
    }
    get(survey, target, operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.driver.get(survey, target, operations);
            if (records.length > 0) {
                const user = yield this.userDriver.getByUserId(survey, this.userid);
                const am = new SurveyAuthorizationManager(survey, user);
                if (!am.canReadSample(records[0].sampleCode))
                    return Promise.reject(am.canReadSampleError(records[0].sampleCode));
            }
            return records;
        });
    }
}

class DocumentAutzDriver {
    constructor(driver, userDriver, userid) {
        this.driver = driver;
        this.userDriver = userDriver;
        this.userid = userid;
    }
    getByHash(survey, hash) {
        return this.driver.getByHash(survey, hash);
    }
    getAll(survey) {
        return this.driver.getAll(survey);
    }
    getContent(survey, hash) {
        return this.driver.getContent(survey, hash);
    }
    saveContent(survey, hash, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = yield this.userDriver.getByUserId(survey, this.userid);
            const document = yield this.driver.getByHash(survey, hash);
            const am = new SurveyAuthorizationManager(survey, caller);
            if (!am.canSaveDocument(document))
                return Promise.reject(am.canSaveDocumentError(document));
            return this.driver.saveContent(survey, hash, content);
        });
    }
    delete(survey, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = yield this.userDriver.getByUserId(survey, this.userid);
            const document = yield this.driver.getByHash(survey, hash);
            const am = new SurveyAuthorizationManager(survey, caller);
            if (!am.canSaveDocument(document))
                return Promise.reject(am.canSaveDocumentError(document));
            return this.driver.delete(survey, hash);
        });
    }
    save(survey, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = yield this.userDriver.getByUserId(survey, this.userid);
            const am = new SurveyAuthorizationManager(survey, caller);
            if (!am.canSaveDocument(document))
                return Promise.reject(am.canSaveDocumentError(document));
            return this.driver.save(survey, document);
        });
    }
}

class ServerDrivers {
    constructor(client, userid) {
        const store = new Store(client);
        const sampleCache = Builder.decorate(SampleStoreDriver, store)
            .withLogging()
            .with(SampleCacheDriver)
            .withLogging();
        const userDriver = Builder.decorate(UserTruenorthDriver, client)
            .withLogging()
            .with(UserRoleDriver, sampleCache.get())
            .withLogging()
            .with(UserManagedDriver, client);
        this.userDriver = userDriver.with(UserAutzDriver, userid).get();
        const notifier = new Notifier(userDriver.get(), userid);
        this.sampleDriver = sampleCache
            .with(SampleAutzDriver, userDriver.get(), userid)
            .withLogging()
            .get();
        this.surveyDriver = Builder.decorate(SurveyStoreDriver, store)
            .withLogging()
            .with(SurveyReconciliationDriver)
            .withLogging()
            .with(SurveyCacheDriver)
            .withLogging()
            .with(SurveyAutzDriver, userDriver.get(), userid)
            .withLogging()
            .get();
        const participantStore = Builder.decorate(ParticipantStoreDriver, store);
        const participantReconcil = participantStore
            .withLogging()
            .with(ParticipantReconciliationDriver);
        const participantSummary = participantReconcil
            .withLogging()
            .with(ParticipantMixinDriver, participantStore.get())
            .withLogging()
            .with(ParticipantCacheDriver, this.sampleDriver)
            .withLogging()
            .with(ParticipantAuditDriver, client, userid)
            .withLogging()
            .with(ParticipantSummaryDriver, client);
        const box = new ParticipantBox(participantReconcil.get(), userDriver.get(), userid);
        this.participantDriver = participantSummary
            .withLogging()
            .with(ParticipantBoxDriver, box)
            .withLogging()
            .with(ParticipantMixinDriver, participantSummary.get())
            .withLogging()
            .with(ParticipantAutzDriver, userDriver.get(), userid)
            .withLogging()
            .get();
        const interviewStore = Builder.decorate(InterviewStoreDriver, store)
            .withLogging()
            .with(InterviewAuditDriver, client, userid);
        const interviewRule = interviewStore
            .withLogging()
            .with(InterviewManagedDriver)
            .withLogging()
            .with(InterviewMixinDriver, interviewStore.get())
            .withLogging()
            .with(InterviewRuleDriver, this.participantDriver, ParticipantCacheDriver);
        this.interviewDriver = interviewRule
            .withLogging()
            .with(InterviewNotificationDriver, userDriver.get(), notifier)
            .withLogging()
            .with(InterviewBoxDriver, box)
            .withLogging()
            .with(InterviewMixinDriver, interviewRule.get())
            .withLogging()
            .with(InterviewAutzDriver, userDriver.get(), userid)
            .withLogging()
            .get();
        this.summaryDriver = Builder.decorate(SummaryDbDriver, client)
            .withLogging()
            .with(SummaryAutzDriver, this.sampleDriver, userDriver.get(), userid)
            .withLogging()
            .get();
        this.auditDriver = Builder.decorate(AuditDbDriver, client)
            .withLogging()
            .with(AuditAutzDriver, this.sampleDriver, userDriver.get(), userid)
            .withLogging()
            .get();
        this.documentDriver = Builder.decorate(DocumentStoreDriver, store)
            .withLogging()
            .with(DocumentAutzDriver, userDriver.get(), userid)
            .get();
        this.kpiDriver = Builder.decorate(KpiGenericDriver, this.sampleDriver, this.summaryDriver)
            .withLogging()
            .get();
    }
}

function txDriverFactory(client) {
    return (consumer, ctx, opt = { atomic: false }) => {
        const userid = getUserid(ctx);
        const { atomic } = opt;
        return client.transaction(tx => {
            const drivers = new ServerDrivers(tx, userid);
            const tryConsumer = () => consumer(drivers, userid);
            const firstTry = tryConsumer();
            return atomic ? firstTry.catch(tryConsumer) : firstTry;
        }, {
            isolationLevel: atomic ? "serializable" : "read committed",
        });
    };
}
function getUserid(ctx) {
    var _a, _b;
    const { res: { locals }, } = ctx;
    return (_b = (_a = locals === null || locals === void 0 ? void 0 : locals.userinfo) === null || _a === void 0 ? void 0 : _a.userid) !== null && _b !== void 0 ? _b : "system";
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tsNode = process.argv.some(a => a.startsWith("ts-node/register"));
const execArgv = [
    ...process.execArgv,
    ...(tsNode ? ["-r", "ts-node/register"] : []),
];
function startWorker() {
    const workerRelative = path.relative(path.resolve("."), __dirname);
    fork(path.join(workerRelative, "syncmon"), {
        execArgv,
    });
}

var _a;
const client = Knex(config[(_a = process.env.APP_ENV) !== null && _a !== void 0 ? _a : "development"]);
const port = parseInt(process.env.PORT || "3000");
app(restana(), txDriverFactory(client)).start(port);
startWorker();
