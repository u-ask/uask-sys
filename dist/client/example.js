import { _ as __awaiter, O as isInterviewItemTarget, Q as isInterviewTarget, A as AuditRecord, R as isParticipantTarget, a as surveySerialize, z as participantSerialize, p as participantDeserialize, s as surveyDeserialize, D as Document, M as UaskError, P as ParticipantGetOptions, e as errorMessage, c as SummaryGenericDriver, K as KpiGenericDriver } from './system.js';
import { User, DomainCollection, Sample, ParticipantBuilder, SurveyBuilder, Participant, Interview } from 'uask-dom';
import 'fast-deep-equal';
import 'got';
import 'uask-auth';
import { exampleParticipants, exampleSamples, exampleSurvey } from 'uask-dom/example';
import { exampleAccounts } from 'uask-auth/example';
import { Mutex } from 'await-semaphore';
import 'debug';
import 'stealer';

const henriette = new User("Monseau", "Henriette", "Dr", "writer", "hmonceau@example.com", "0606060606");
class AuditExampleDriver {
    constructor(drivers) {
        this.drivers = drivers;
    }
    get(survey, target, operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date().getTime();
            const samples = yield this.drivers.sampleDriver.getAll(survey);
            const participant = yield this.drivers.participantDriver.getByParticipantCode(survey, samples, target.participantCode);
            const interview = participant.interviews.find(i => i.nonce == target.nonce);
            if (isInterviewItemTarget(target)) {
                const item = interview.items.find(i => i.pageItem.variableName == target.variableName);
                return yield buildItemRecords(participant.sample, item, target, date);
            }
            if (isInterviewTarget(target)) {
                if (operations)
                    return yield buildInterviewSignedRecords(participant.sample, target, date, operations);
                return yield buildInterviewRecords(participant.sample, interview, target, date);
            }
            if (isParticipantTarget(target)) {
                const participant = yield this.drivers.participantDriver.getByParticipantCode(survey, samples, target.participantCode);
                const records = yield buildParticipantRecords(participant.sample, participant, target, date);
                return records
                    .filter(r => target.variableName === null ? r.target.variableName == null : true)
                    .filter(r => { var _a; return (_a = operations === null || operations === void 0 ? void 0 : operations.includes(r.operation)) !== null && _a !== void 0 ? _a : true; });
            }
            throw "invalid target";
        });
    }
}
function buildParticipantRecords(sample, participant, target, date) {
    const headRecords = [
        new AuditRecord({ participantCode: target.participantCode }, sample.sampleCode, new Date(date - 5 * 3600 * 1000), "create", { email: "me@me.me" }, henriette),
        new AuditRecord({ participantCode: target.participantCode }, sample.sampleCode, new Date(date - 4 * 3600 * 1000), "update", { phone: "0101010101" }, henriette),
    ];
    const tailRecords = participant.interviews
        .filter(i => i.items.find(isWeightVariable))
        .flatMap((i, x) => buildInterviewRecords(sample, i, {
        participantCode: participant.participantCode,
        nonce: i.nonce,
    }, date - (1 - x) * 3600 * 1000 + 60000));
    return [...headRecords, ...tailRecords];
}
function buildInterviewRecords(sample, interview, target, date) {
    const headRecord = new AuditRecord(target, sample.sampleCode, new Date(date - 4 * 3600 * 1000), "create", { nonce: target.nonce }, henriette);
    const tailRecords = interview.items.filter(isWeightVariable).flatMap(i => buildItemRecords(sample, i, {
        participantCode: target.participantCode,
        nonce: interview.nonce,
        variableName: i.pageItem.variableName,
    }, date + 60000));
    return [headRecord, ...tailRecords];
}
function buildInterviewSignedRecords(sample, target, date, operations) {
    return [
        ...operations.map((operation, index) => new AuditRecord(target, sample.sampleCode, new Date(date - 4 * 3600 * 1500 * index), operation, { nonce: target.nonce }, henriette)),
    ];
}
function buildItemRecords(sample, item, target, date) {
    if ((item.pageItem.variableName != "WEIGHT" &&
        item.pageItem.variableName != "POIDS") ||
        !item.value)
        return [];
    return [
        new AuditRecord(target, sample.sampleCode, new Date(date - 4 * 3600 * 1000), "create", { value: item.value - 1 }, henriette),
        new AuditRecord(target, sample.sampleCode, new Date(date - 3 * 3600 * 1000), "update", { value: undefined, specialValue: "unknown" }, henriette),
        new AuditRecord(target, sample.sampleCode, new Date(date - 2 * 3600 * 1000), "update", { value: item.value }, henriette),
    ];
}
function isWeightVariable(i) {
    return ["WEIGHT", "POIDS"].includes(i.pageItem.variableName);
}

let P11_05;
let P11_05_Samples;
let P11_05_Participants;
let P11_05_Users;
let P11_05_Documents;
const surveyObj = JSON.stringify(surveySerialize(exampleSurvey));
const participantsObj = exampleParticipants.map(p => JSON.stringify(participantSerialize(p)));
const samplesObj = exampleSamples.map(s => JSON.stringify(s));
const userObj = exampleAccounts
    .filter(u => Object.keys(u.surveys).includes("P11-05"))
    .map(user => {
    var _a;
    return JSON.stringify(Object.assign(Object.assign({}, new User(user.surname, user.given_name, user.title, (_a = user.surveys["P11-05"]) === null || _a === void 0 ? void 0 : _a.role, user.email, user.phone, DomainCollection(), DomainCollection(), {
        id: user.id,
        userid: user.userid,
    })), { sampleCodes: user.surveys["P11-05"].samples, participantCodes: user.surveys["P11-05"].participants }));
});
function seedExample() {
    P11_05 = seedExampleSurvey();
    P11_05_Samples = seedExampleSamples();
    P11_05_Participants = seedExampleParticipants();
    P11_05_Users = seedExampleUsers();
    P11_05_Documents = seedExampleDocuments();
}
function seedExampleSurvey() {
    const surveyBuilder = new SurveyBuilder();
    surveyDeserialize(surveyBuilder, JSON.parse(surveyObj));
    return surveyBuilder.build();
}
function seedExampleParticipants() {
    return participantsObj.map(p => {
        const participantBuilder = new ParticipantBuilder(P11_05, DomainCollection(...P11_05_Samples));
        participantDeserialize(participantBuilder, JSON.parse(p));
        return participantBuilder.build();
    });
}
function seedExampleSamples() {
    return samplesObj.map(s => Object.assign(Object.create(Sample.prototype), JSON.parse(s)));
}
function seedExampleUsers() {
    return userObj.map(u => {
        const uu = JSON.parse(u);
        return Object.assign(Object.create(User.prototype), Object.assign(Object.assign({}, uu), { sampleCodes: uu.sampleCodes[0] == "__all__"
                ? P11_05_Samples.map(s => s.sampleCode)
                : uu.sampleCodes }));
    });
}
function seedExampleDocuments() {
    const userGuide = new Document("UGES", "User Guide eCFR uask", DomainCollection("user", "guide", "uask"), { hash: 201 });
    const CRFinitial = new Document("CRFIP", "CRF intial P11-05", DomainCollection("CRF"), { hash: 202 });
    const CRFsuivi = new Document("CRFSP", "CRF de suivi P11-05", DomainCollection("CRF"), { hash: 203, content: new Uint8Array([21, 31]) });
    return [userGuide, CRFinitial, CRFsuivi];
}
seedExample();

class SurveyExampleDriver {
    constructor() {
        SurveyExampleDriver.P11_06 = undefined;
    }
    getByName(name) {
        return doImport(name).then(i => i.survey);
    }
    save(survey) {
        if (survey.name == "P11-06")
            SurveyExampleDriver.P11_06 = survey.update({ __untrack__: true });
        else
            throw "cannot save non example survey";
        return Promise.resolve(SurveyExampleDriver.P11_06);
    }
}
SurveyExampleDriver.P11_06 = undefined;
function doImport(name) {
    switch (name) {
        case "P11-05":
            return Promise.resolve({
                survey: P11_05,
                participants: P11_05_Participants,
                samples: P11_05_Samples,
                users: P11_05_Users,
                documents: P11_05_Documents,
            });
        case "P11-06":
            if (SurveyExampleDriver.P11_06)
                return Promise.resolve({
                    survey: SurveyExampleDriver.P11_06,
                    participants: [],
                    samples: [],
                    documents: [],
                    users: [],
                });
            return Promise.reject(new UaskError({ code: "NOT_FOUND", message: "unknown survey" }));
        default:
            return Promise.reject(new UaskError({ code: "NOT_FOUND", message: "unknown survey" }));
    }
}

class ParticipantExampleDriver {
    getAll(survey, samples, options = {}) {
        const opt = Object.assign(Object.assign({}, new ParticipantGetOptions()), options);
        return doImport(survey.name).then(i => i.participants
            .filter(p => !p.__delete__)
            .slice(options.offset, opt.offset + opt.limit)
            .map(p => p.update({ sample: samples.find(s => s.sampleCode == p.sample.sampleCode) })));
    }
    getBySample(survey, sample, options = {}) {
        const opt = Object.assign(Object.assign({}, new ParticipantGetOptions()), options);
        return doImport(survey.name).then(i => i.participants
            .filter(p => p.sample.sampleCode == sample.sampleCode && !p.__delete__)
            .slice(options.offset, opt.offset + opt.limit)
            .map(p => p.update({ sample: sample })));
    }
    getByParticipantCode(survey, samples, participantCode) {
        return doImport(survey.name)
            .then(i => i.participants
            .map(p => p.update({ sample: samples.find(s => s.sampleCode == p.sample.sampleCode) }))
            .find(p => p.participantCode == participantCode && !p.__delete__))
            .then(p => p !== null && p !== void 0 ? p : Promise.reject(new UaskError({ code: "NOT_FOUND", message: "unknown participant" })));
    }
    save(survey, participant) {
        const p = new Participant(participant.participantCode, participant.sample, participant.update({ __untrack__: true }));
        if (participant.participantCode) {
            return doImport(survey.name).then(i => this.update(i.participants, p));
        }
        return doImport(survey.name).then(i => this.create(i.participants, p));
    }
    create(participants, participant) {
        const participantCode = `0000000${participants.length + 1}`.slice(-5);
        const newParticipant = new Participant("", participant.sample, Object.assign(Object.assign({}, participant), { participantCode, interviews: participant.interviews.filter(i => i.nonce > 0) }));
        participants.push(newParticipant);
        return { participantCode };
    }
    update(participants, participant) {
        const i = participants.findIndex(p => p.participantCode == participant.participantCode);
        const newParticipant = new Participant("", participant.sample, Object.assign(Object.assign({}, participant), { interviews: participant.interviews.filter(i => i.nonce > 0) }));
        participants[i] = newParticipant;
        return Promise.resolve({
            participantCode: participant.participantCode,
        });
    }
    delete(survey, participant) {
        const p = new Participant(participant.participantCode, participant.sample, participant.update({ __delete__: true }));
        return doImport(survey.name)
            .then(i => this.update(i.participants, p))
            .then();
    }
}

class SampleExampleDriver {
    getAll(survey) {
        return doImport(survey.name).then(i => [...i.samples]);
    }
    getBySampleCode(survey, sampleCode) {
        return doImport(survey.name)
            .then(i => i.samples.find(s => s.sampleCode == sampleCode))
            .then(s => s !== null && s !== void 0 ? s : Promise.reject([errorMessage("unknown sample")]));
    }
    save(survey, sample) {
        return doImport(survey.name).then(i => {
            const x = i.samples.findIndex(s => s.sampleCode == sample.sampleCode);
            const s = sample.update({ __untrack__: true });
            if (x == -1)
                i.samples.push(s);
            else
                i.samples[x] = s;
            return s;
        });
    }
}

class InterviewExampleDriver {
    constructor() {
        this.participantDriver = new ParticipantExampleDriver();
        this.sampleDriver = new SampleExampleDriver();
        this.mutex = new Mutex();
    }
    save(survey, participant, interview, items = interview.items) {
        return __awaiter(this, void 0, void 0, function* () {
            const samples = yield this.sampleDriver.getAll(survey);
            const nonce = interview.nonce
                ? interview.nonce
                : Math.ceil(Math.random() * 1e16);
            const i = new Interview(interview.pageSet, interview.options, interview.update({ nonce, __untrack__: true }));
            const release = yield this.mutex.acquire();
            const p = yield this.participantDriver.getByParticipantCode(survey, samples, participant.participantCode);
            const updated = new ParticipantBuilder(survey, p).interview(i).build();
            yield this.participantDriver.save(survey, updated);
            release();
            const itemKeys = [...items.map(() => ({ __untrack__: true }))];
            return [{ nonce: i.nonce, __untrack__: true }, { items: itemKeys }];
        });
    }
    delete(survey, participant, interview) {
        return __awaiter(this, void 0, void 0, function* () {
            const samples = yield this.sampleDriver.getAll(survey);
            const release = yield this.mutex.acquire();
            const p = yield this.participantDriver.getByParticipantCode(survey, samples, participant.participantCode);
            const updated = p.update({
                interviews: p.interviews.filter(i => i.nonce != interview.nonce),
            });
            yield this.participantDriver.save(survey, updated);
            release();
        });
    }
}

const participantDriver = new ParticipantExampleDriver();
const sampleDriver = new SampleExampleDriver();
class SummaryExampleDriver extends SummaryGenericDriver {
    constructor() {
        super(participantDriver, sampleDriver);
    }
}

class UserExampleDriver {
    getAll(survey) {
        return doImport(survey.name).then(i => { var _a; return [...((_a = i.users) !== null && _a !== void 0 ? _a : [])]; });
    }
    getByUserId(survey, userid) {
        return doImport(survey.name).then(i => { var _a; return (_a = i.users) === null || _a === void 0 ? void 0 : _a.find(u => u.userid == userid); });
    }
    save(survey, user) {
        return doImport(survey.name).then(i => this.update(i.users, user));
    }
    update(users, user) {
        const i = users.findIndex(u => u.userid == user.userid);
        if (i == -1)
            users.push(user);
        else
            users[i] = user;
        return user;
    }
}

class DocumentExampleDriver {
    save(survey, document) {
        return doImport(survey.name).then(i => {
            const x = i.documents.findIndex(d => d.hash == document.hash);
            if (x == -1)
                i.documents.push(document);
            else
                i.documents[x] = document;
            return document;
        });
    }
    delete(survey, hash) {
        return doImport(survey.name).then(i => {
            const index = i.documents.findIndex(d => d.hash == hash);
            if (index == -1)
                Promise.reject("unknown document");
            i.documents.splice(index, 1);
        });
    }
    getByHash(survey, hash) {
        return doImport(survey.name)
            .then(i => i.documents.find(d => d.hash == hash))
            .then(d => d !== null && d !== void 0 ? d : Promise.reject("unknown document"));
    }
    getAll(survey) {
        return doImport(survey.name).then(i => [...i.documents]);
    }
    saveContent(survey, hash, content) {
        return doImport(survey.name).then(i => {
            const x = i.documents.findIndex(d => d.hash == hash);
            if (x == -1)
                Promise.reject("unknown document");
            else
                i.documents[x] = i.documents[x].update({ content });
        });
    }
    getContent(survey, hash) {
        return doImport(survey.name)
            .then(i => i.documents.find(d => d.hash == hash))
            .then(d => {
            var _a;
            return d
                ? (_a = { content: d === null || d === void 0 ? void 0 : d.content, name: d.name }) !== null && _a !== void 0 ? _a : Promise.reject("no content document")
                : Promise.reject("unknown document");
        });
    }
}

class ExampleDrivers {
    constructor() {
        this.surveyDriver = new SurveyExampleDriver();
        this.sampleDriver = new SampleExampleDriver();
        this.participantDriver = new ParticipantExampleDriver();
        this.interviewDriver = new InterviewExampleDriver();
        this.summaryDriver = new SummaryExampleDriver();
        this.userDriver = new UserExampleDriver();
        this.auditDriver = new AuditExampleDriver(this);
        this.documentDriver = new DocumentExampleDriver();
        this.kpiDriver = new KpiGenericDriver(this.sampleDriver, this.summaryDriver);
    }
}

export { ExampleDrivers, P11_05, P11_05_Documents, P11_05_Participants, P11_05_Samples, P11_05_Users, seedExample };
