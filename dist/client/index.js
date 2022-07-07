import { s as surveyDeserialize, _ as __awaiter, h as handleClientError, a as surveySerialize, P as ParticipantGetOptions, p as participantDeserialize, b as __rest, i as interviewItemSerialize, e as errorMessage, A as AuditRecord, D as Document, B as Builder, S as SampleCacheDriver, K as KpiGenericDriver } from './system.js';
export { A as AuditRecord, d as AuditTrail, B as Builder, D as Document, I as InterviewSaveOptions, K as KpiGenericDriver, L as LoggingProxy, H as ParticipantAuthorizationManager, P as ParticipantGetOptions, f as ParticipantSummary, S as SampleCacheDriver, c as SummaryGenericDriver, J as SurveyAuthorizationManager, U as UaskClientError, M as UaskError, j as clone, y as crossRuleDeserialize, x as crossRuleSerialize, e as errorMessage, N as generateDSL, g as getAllTags, h as handleClientError, E as interviewDeserialize, F as interviewItemDeserialize, i as interviewItemSerialize, C as interviewSerialize, r as itemDeserialize, t as itemSerialize, n as librarySerialize, l as pageDeserialize, m as pageSerialize, o as pageSetDeserialize, q as pageSetSerialize, p as participantDeserialize, z as participantSerialize, G as pick, v as ruleDeserialize, u as ruleSerialize, s as surveyDeserialize, a as surveySerialize, k as workflowDeserialize, w as workflowSerialize } from './system.js';
import { SurveyBuilder, ParticipantBuilder, DomainCollection, getTranslation, Sample, User } from 'uask-dom';
import 'fast-deep-equal';
import got from 'got';
import { Client } from 'uask-auth/client';
import 'debug';
import 'stealer';

class SurveyWebDriver {
    constructor(client) {
        this.client = client;
    }
    getByName(name) {
        const b = new SurveyBuilder();
        const query = "query ($name:String!){survey(name:$name)}";
        const variables = JSON.stringify({ name });
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => {
            surveyDeserialize(b, response.data.survey);
            return b.build();
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    save(survey) {
        const b = new SurveyBuilder();
        const query = {
            query: "mutation ($name: String!, $survey: Json!){ saveSurvey(name: $name, survey: $survey) }",
            variables: { name: survey.name, survey: surveySerialize(survey) },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => {
            surveyDeserialize(b, response.data.saveSurvey);
            return b.build();
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class ParticipantWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey, samples, options = { limit: Infinity }) {
        if (options.limit > 20)
            throw "getting more than 20 participants is not allowed by client, use summry driver instead";
        const query = "query ($survey:String!, $offset: Int, $limit:Int){participants(survey:$survey, offset:$offset, limit:$limit)}";
        const variables = JSON.stringify(Object.assign(Object.assign({ survey: survey.name }, new ParticipantGetOptions()), options));
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.participants.map(p => {
            const b = new ParticipantBuilder(survey, DomainCollection(...samples));
            participantDeserialize(b, p);
            return b.build();
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    getByParticipantCode(survey, samples, participantCode) {
        const b = new ParticipantBuilder(survey, DomainCollection(...samples));
        const query = "query ($survey:String!, $participant:String!){participant(survey:$survey, code:$participant)}";
        const variables = JSON.stringify({
            survey: survey.name,
            participant: participantCode,
        });
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => {
            participantDeserialize(b, response.data.participant);
            return b.build();
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    getBySample(survey, sample, options = { limit: Infinity }) {
        if (options.limit > 20)
            throw "getting more than 20 participants is not allowed by client, use summry driver instead";
        const query = "query ($survey:String!, $sample:String!, $offset:Int!, $limit:Int!){participants(survey:$survey, sample:$sample, offset:$offset, limit:$limit)}";
        const variables = JSON.stringify(Object.assign(Object.assign({ survey: survey.name, sample: sample.sampleCode }, new ParticipantGetOptions()), options));
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.participants.map(p => {
            const b = new ParticipantBuilder(survey, DomainCollection(sample));
            participantDeserialize(b, p);
            return b.build();
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    save(survey, participant) {
        const { participantCode, sample, interviews } = participant, kwargs = __rest(participant, ["participantCode", "sample", "interviews"]);
        const query = {
            query: participant.participantCode.length > 0
                ? "mutation ($survey:String!, $code:String!, $sample:String!, $kwargs:Json){saveParticipant(survey:$survey, code:$code, sample:$sample, kwargs:$kwargs)}"
                : "mutation ($survey:String!, $sample:String!, $kwargs:Json){createParticipant(survey:$survey, sample:$sample, kwargs:$kwargs)}",
            variables: Object.assign(Object.assign({ survey: survey.name }, (participantCode.length > 0 ? { code: participantCode } : {})), { sample: sample.sampleCode, kwargs }),
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => participant.participantCode.length > 0
            ? response.data.saveParticipant
            : response.data.createParticipant)
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    delete(survey, participant) {
        const query = {
            query: "mutation ($survey: String!, $code: String!, $reason: Json!){ deleteParticipant(survey: $survey, code: $code, reason: $reason) }",
            variables: {
                survey: survey.name,
                code: participant.participantCode,
                reason: participant.__delete__,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(() => { })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class InterviewWebDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, participant, interview, items = interview.items, options) {
        options = { strict: !!(options === null || options === void 0 ? void 0 : options.strict) };
        const pageSet = getTranslation(interview.pageSet.type, "__code__", survey.options.defaultLang);
        if (interview.nonce == 0) {
            return this.createInterview(survey, participant, pageSet, interview, items, options);
        }
        return this.saveItems(survey, participant, interview, items, options);
    }
    saveItems(survey, participant, interview, interviewItems, options) {
        const items = [...interviewItems.map(item => interviewItemSerialize(item))];
        const query = {
            query: "mutation ($survey: String!, $participant: String!, $nonce: BigInt!, $items: [Json!]!, $strict: Boolean){ saveInterview(survey: $survey, participant: $participant, nonce: $nonce, items: $items, strict: $strict) }",
            variables: {
                survey: survey.name,
                participant: participant.participantCode,
                nonce: interview.nonce,
                items,
                strict: !!options.strict,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => response.data.saveInterview)
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    createInterview(survey, participant, pageSet, interview, interviewItems, options) {
        const items = interviewItems
            ? [...interviewItems.map(item => interviewItemSerialize(item))]
            : undefined;
        const variables = {
            survey: survey.name,
            participant: participant.participantCode,
            pageSet,
            nonce: interview.nonce,
            strict: !!options.strict,
        };
        const query = items
            ? {
                query: `mutation ($survey: String!, $participant: String!, $pageSet: String!, $items: [Json!], $strict: Boolean){ createInterview(survey: $survey, participant: $participant, pageSet: $pageSet, items: $items, strict: $strict) }`,
                variables: Object.assign(Object.assign({}, variables), { items }),
            }
            : {
                query: `mutation ($survey: String!, $participant: String!, $pageSet: String!, $strict: Boolean){ createInterview(survey: $survey, participant: $participant, pageSet: $pageSet, strict: $strict) }`,
                variables,
            };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => response.data.createInterview)
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    delete(survey, participant, interview) {
        const query = {
            query: "mutation ($survey: String!, $participant: String!, $nonce: BigInt!, $reason: Json!){ deleteInterview(survey: $survey, participant: $participant, nonce: $nonce, reason: $reason) }",
            variables: {
                survey: survey.name,
                participant: participant.participantCode,
                nonce: interview.nonce,
                reason: interview.__delete__,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(() => { })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class SummaryWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey, sample, x, options) {
        const select = Array.isArray(x)
            ? x
            : [
                "participantCode",
                "sampleCode",
                "currentInterview",
                "interviewCount",
                "pins",
                "alerts",
                "included",
            ];
        options = Array.isArray(x) ? options : x;
        const fragment = select.join(",");
        const query = `query ($survey:String!, $sample:String, $offset:Int, $limit:Int){summary(survey:$survey, sample:$sample, offset:$offset, limit:$limit){${fragment}}}`;
        const variables = JSON.stringify(Object.assign(Object.assign(Object.assign({ survey: survey.name }, (sample ? { sample: sample.sampleCode } : {})), new ParticipantGetOptions()), options));
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.summary.map(s => {
            if (typeof s.currentInterview != "undefined" &&
                typeof s.currentInterview.date != "undefined")
                s.currentInterview.date = new Date(s.currentInterview.date);
            return s;
        }))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class SampleWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey) {
        const query = "query ($survey:String!){samples(survey:$survey)}";
        const variables = JSON.stringify({ survey: survey.name });
        return this.client
            .get("graphql", { searchParams: { query, variables } })
            .json()
            .then(response => response.data.samples.map(s => new Sample(s.sampleCode, s)))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    getBySampleCode(survey, sampleCode) {
        return this.getAll(survey).then(s => {
            var _a;
            return (_a = s.find(e => e.sampleCode == sampleCode)) !== null && _a !== void 0 ? _a : Promise.reject([errorMessage("unknown sample")]);
        });
    }
    save(survey, sample) {
        const query = {
            query: "mutation ($survey: String!, $sample: Json!){ saveSample(survey: $survey, sample: $sample) }",
            variables: {
                survey: survey.name,
                sample: sample,
            },
        };
        return this.client
            .post("graphql", { json: query })
            .json()
            .then(response => {
            const sample = response.data.saveSample;
            return new Sample(sample.sampleCode, sample);
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class AuditWebDriver {
    constructor(client) {
        this.client = client;
    }
    get(survey, target, operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "query ($survey: String!,$participant: String!,$nonce: BigInt,$variableName: String,$instance: Int, $operations:[Json!]){auditRecords(survey:$survey,participantCode:$participant,nonce:$nonce,variableName:$variableName,instance:$instance,operations:$operations)}";
            const variables = JSON.stringify({
                survey: survey.name,
                participant: target.participantCode,
                nonce: target.nonce,
                variableName: target.variableName,
                instance: target.instance,
                operations,
            });
            return this.client
                .get("graphql", { searchParams: { query, variables } })
                .json()
                .then(response => response.data.auditRecords.map(rec => Object.assign(Object.create(AuditRecord.prototype), Object.assign(Object.assign({}, rec), { date: new Date(rec.date) }))))
                .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
        });
    }
}

class UserWebDriver {
    constructor(client) {
        this.client = client;
    }
    getAll(survey) {
        const query = `admin/${survey.name}/users`;
        return this.client
            .get(query)
            .json()
            .then(response => response.map(u => this.createUser(u)))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    createUser(u) {
        return new User(u.name, u.firstName, u.title, u.workflow, u.email, u.phone, u.sampleCodes, u.participantCodes, {
            role: u.role,
            email_verified: u.email_verfied,
            id: u.id,
            userid: u.userid,
        });
    }
    getByUserId(survey, userid) {
        const route = `admin/${survey.name}/users/${userid}`;
        return this.client
            .get(route)
            .json()
            .then(response => this.createUser(response))
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
    save(survey, user) {
        const route = `admin/${survey.name}/users/${user.userid}`;
        return this.client
            .post(route, { json: user })
            .json()
            .catch((error) => __awaiter(this, void 0, void 0, function* () { return yield handleClientError(error); }));
    }
}

class DocumentWebDriver {
    constructor(client) {
        this.client = client;
    }
    save(survey, document) {
        const route = `document/${survey.name}/${document.hash}`;
        return this.client
            .post(route, { json: document })
            .json();
    }
    delete(survey, hash) {
        throw new Error(`Use delete endpoint /document/${survey.name}/${hash}`);
    }
    getByHash(survey, hash) {
        const query = `document/${survey.name}/${hash}`;
        return this.client
            .get(query)
            .json()
            .then(d => {
            const { name, title, tags, content } = d, other = __rest(d, ["name", "title", "tags", "content"]);
            return new Document(name, title, tags, Object.assign({}, other));
        });
    }
    getAll(survey) {
        const query = `document/${survey.name}/all`;
        return this.client
            .get(query)
            .json()
            .then(response => response.map(d => {
            const { name, title, tags } = d, other = __rest(d, ["name", "title", "tags"]);
            return new Document(name, title, tags, Object.assign({}, other));
        }));
    }
    saveContent(survey, hash) {
        throw new Error(`Use upload endpoint /document/${survey.name}/${hash}/content`);
    }
    getContent(survey, hash) {
        throw new Error(`Use download endpoint /document/${survey.name}/${hash}/content`);
    }
}

class ClientDrivers {
    constructor(client) {
        this.client = client;
        this.surveyDriver = Builder.decorate(SurveyWebDriver, client)
            .withLogging()
            .get();
        this.participantDriver = Builder.decorate(ParticipantWebDriver, client)
            .withLogging()
            .get();
        this.sampleDriver = Builder.decorate(SampleWebDriver, client)
            .withLogging()
            .with(SampleCacheDriver)
            .withLogging()
            .get();
        this.interviewDriver = Builder.decorate(InterviewWebDriver, client)
            .withLogging()
            .get();
        this.summaryDriver = Builder.decorate(SummaryWebDriver, client)
            .withLogging()
            .get();
        this.auditDriver = Builder.decorate(AuditWebDriver, client)
            .withLogging()
            .get();
        this.userDriver = Builder.decorate(UserWebDriver, client)
            .withLogging()
            .get();
        this.documentDriver = Builder.decorate(DocumentWebDriver, client)
            .withLogging()
            .get();
        this.kpiDriver = Builder.decorate(KpiGenericDriver, this.sampleDriver, this.summaryDriver)
            .withLogging()
            .get();
    }
}

class UaskClient {
    constructor(apiUrl, authUrl = `${apiUrl}/oidc`) {
        this.apiUrl = apiUrl;
        this.surveyDriver = this.deref("surveyDriver", "getByName", "save");
        this.sampleDriver = this.deref("sampleDriver", "getAll", "getBySampleCode", "save");
        this.participantDriver = this.deref("participantDriver", "getAll", "getBySample", "getByParticipantCode", "save", "delete");
        this.interviewDriver = this.deref("interviewDriver", "save", "delete");
        this.summaryDriver = this.deref("summaryDriver", "getAll");
        this.userDriver = this.deref("userDriver", "getAll", "getByUserId", "save");
        this.auditDriver = this.deref("auditDriver", "get");
        this.documentDriver = this.deref("documentDriver", "getAll", "getByHash", "getContent", "save", "saveContent", "delete");
        this.kpiDriver = this.deref("kpiDriver", "getAll");
        this.auth = new Client(authUrl);
        this.drivers = this.auth.getTokens().then(toks => {
            const cli = got.extend({
                prefixUrl: apiUrl,
                headers: {
                    Authorization: `Bearer ${toks.access_token}`,
                },
            });
            return new ClientDrivers(cli);
        });
    }
    destroy() {
        return this.drivers.then(() => this.auth.destroy());
    }
    deref(driver, ...methods) {
        return methods.reduce((d, m) => {
            const impl = (...args) => this.drivers.then(d => Reflect.get(d[driver], m).call(d[driver], ...args));
            return Object.assign(d, { [m]: impl });
        }, {});
    }
}

export { ClientDrivers, UaskClient };
