import { DomainCollection, Sample, execute, SurveyBuilder, ParticipantBuilder } from 'uask-dom';
import { _ as __awaiter, S as Store, a as SurveyReconciliationDriver, b as SurveyStoreDriver, c as SampleStoreDriver, P as ParticipantStoreDriver, s as surveySerialize, p as participantSerialize, d as ParticipantSummaryDriver, e as ParticipantAuditDriver, I as InterviewManagedDriver, f as InterviewAuditDriver, g as InterviewStoreDriver, h as surveyDeserialize, i as participantDeserialize } from './system.js';
import 'fast-deep-equal';
import '@sindresorhus/fnv1a';
import debug from 'debug';
import 'restana';
import 'stealer';
import 'body-parser';
import 'ejs';
import 'crypto';
import 'oidc-provider';
import 'assert';
import 'uuid-random';

function dump(client, name, setTimestamp = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = new Store(client);
        const survey = yield new SurveyReconciliationDriver(new SurveyStoreDriver(store)).getByName(name);
        const samples = yield new SampleStoreDriver(store).getAll(survey);
        const participants = yield new ParticipantStoreDriver(store).getAll(survey, samples);
        return dataStringify(survey, samples, participants, setTimestamp);
    });
}
function dataStringify(survey, samples, participants, setTimestamp = false) {
    const dump = toDump(survey, samples, participants);
    const str = JSON.stringify(Object.assign(Object.assign({}, dump), (setTimestamp ? { timestamp: Date.now() } : {})));
    const idPattern = jsonPropertyPattern('"__keys__":{[^}]*}');
    const changePattern = jsonPropertyPattern('"__changes__":{}');
    const re = new RegExp(`${idPattern}|${changePattern}`, "g");
    return str.replace(re, "");
}
function jsonPropertyPattern(pattern) {
    return `(,${pattern})|(${pattern},?)`;
}
function toDump(survey, samples, participants) {
    return {
        survey: surveySerialize(survey),
        samples,
        participants: participants.map(p => participantSerialize(p)),
    };
}

const dlog = debug("uask:loader");
function load(client, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataStruct = typeof data == "string" ? JSON.parse(data) : data;
        const survey = buildSurvey(dataStruct);
        const seed = yield getSeedInfo(client, survey.name);
        if (canSeed(seed, dataStruct)) {
            yield clearDatabase(client, seed === null || seed === void 0 ? void 0 : seed.id);
            const store = new Store(client);
            yield loadSurvey(store, survey);
            const samples = buildSamples(dataStruct);
            yield loadSamples(store, survey, samples);
            const ptotal = dataStruct.participants.length;
            const itotal = dataStruct.participants.reduce((c, p) => c + p.interviews.length, 0);
            const participants = buildParticipants(dataStruct, survey, samples);
            yield loadParticipants(store, survey, samples, participants, ptotal, itotal);
            const { id } = (yield getSeedInfo(client, survey.name));
            yield saveSeedInfo(client, id, dataStruct === null || dataStruct === void 0 ? void 0 : dataStruct.timestamp);
        }
    });
}
function canSeed(seed, data) {
    return ((seed === null || seed === void 0 ? void 0 : seed.timestamp) == undefined ||
        (data.timestamp != undefined && data.timestamp > seed.timestamp));
}
function buildSurvey(data) {
    const surveyBuilder = new SurveyBuilder();
    surveyDeserialize(surveyBuilder, data.survey);
    return surveyBuilder.build();
}
function loadSurvey(store, survey) {
    return __awaiter(this, void 0, void 0, function* () {
        dlog("starting survey...");
        const surveyKey = yield new SurveyReconciliationDriver(new SurveyStoreDriver(store)).save(survey);
        survey.update(surveyKey);
    });
}
function buildSamples(data) {
    return DomainCollection(...data.samples.map(s => new Sample(s.sampleCode, s)));
}
function loadSamples(store, survey, samples) {
    return __awaiter(this, void 0, void 0, function* () {
        dlog("starting samples...");
        for (const sample of samples) {
            yield loadSample(store, survey, sample);
        }
    });
}
function loadSample(store, survey, sample) {
    return __awaiter(this, void 0, void 0, function* () {
        const sampleKey = yield new SampleStoreDriver(store).save(survey, sample);
        sample.update(sampleKey);
    });
}
function* buildParticipants(data, survey, samples) {
    for (const participant of data.participants) {
        const participantBuilder = new ParticipantBuilder(survey, samples);
        participantDeserialize(participantBuilder, participant);
        yield participantBuilder.build();
    }
}
function loadParticipants(store, survey, samples, participants, ptotal, itotal) {
    return __awaiter(this, void 0, void 0, function* () {
        dlog("starting participants...");
        let pcount = 0;
        let icount = 0;
        for (const participant of participants) {
            pcount += 1;
            icount += participant.interviews.length;
            yield loadParticipant(store, survey, participant);
            dlog(`loaded: ${pcount}/${ptotal} participants, ${icount}/${itotal} interviews`);
        }
    });
}
function loadParticipant(store, survey, participant) {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = new ParticipantSummaryDriver(new ParticipantAuditDriver(new ParticipantStoreDriver(store), store.client, "system"), store.client);
        const participantKey = yield driver.save(survey, participant);
        participant.update(participantKey);
        const synchronized = execute(survey.rules, participant);
        for (let i = 0; i < synchronized.interviews.length; i++) {
            const interview = synchronized.interviews[i];
            const interviewKey = yield new InterviewManagedDriver(new InterviewAuditDriver(new InterviewStoreDriver(store), store.client, "system")).save(survey, synchronized, interview);
            interview.update(interviewKey);
        }
    });
}
function clearDatabase(client, surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof surveyId != "undefined") {
            yield client.table("seeds").where("surveyId", surveyId).delete();
            yield clearParticipants(client, surveyId);
            yield clearSamples(client, surveyId);
            yield clearSurvey(client, surveyId);
        }
    });
}
function clearSurvey(client, surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.table("documents").where({ surveyId }).del();
        yield client.table("workflowPageSets").where({ surveyId }).del();
        yield client.table("workflows").where({ surveyId }).del();
        yield client.table("rulePageItems").where({ surveyId }).del();
        yield client.table("rules").where({ surveyId }).del();
        yield client.table("includes").where({ surveyId }).del();
        yield client.table("pageItems").where({ surveyId }).del();
        yield client.table("pageSetPages").where({ surveyId }).del();
        yield client.table("pageSets").where({ surveyId }).del();
        yield client.table("pages").where({ surveyId }).del();
        yield client.table("surveys").where({ id: surveyId }).del();
    });
}
function clearSamples(client, surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.table("samples").where({ surveyId }).del();
    });
}
function clearParticipants(client, surveyId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.table("audit_participants").where({ surveyId }).del();
        yield client.table("summaries").where({ surveyId }).del();
        yield client.table("interviewItems").where({ surveyId }).del();
        yield client.table("interviews").where({ surveyId }).del();
        yield client.table("participants").where({ surveyId }).del();
    });
}
function getSeedInfo(client, name) {
    return client
        .table("surveys")
        .where({ name })
        .leftJoin("seeds", "seeds.surveyId", "surveys.id")
        .select("id", "timestamp")
        .first();
}
function saveSeedInfo(client, id, timestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        if (timestamp)
            yield client.table("seeds").insert({ timestamp: timestamp, surveyId: id });
    });
}

export { dataStringify, dump, load };
