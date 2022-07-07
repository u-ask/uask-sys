import { C as ClientDrivers } from './client.js';
export { A as AuditRecord, a as AuditTrail, B as Builder, C as ClientDrivers, D as Document, I as InterviewSaveOptions, K as KpiGenericDriver, L as LoggingProxy, F as ParticipantAuthorizationManager, P as ParticipantGetOptions, b as ParticipantSummary, E as SampleCacheDriver, S as SummaryGenericDriver, G as SurveyAuthorizationManager, J as UaskClientError, U as UaskError, d as clone, o as crossRuleDeserialize, n as crossRuleSerialize, H as errorMessage, N as generateDSL, g as getAllTags, M as handleClientError, v as interviewDeserialize, y as interviewItemDeserialize, x as interviewItemSerialize, u as interviewSerialize, j as itemDeserialize, k as itemSerialize, l as librarySerialize, p as pageDeserialize, f as pageSerialize, h as pageSetDeserialize, i as pageSetSerialize, t as participantDeserialize, q as participantSerialize, z as pick, m as ruleDeserialize, r as ruleSerialize, s as surveyDeserialize, c as surveySerialize, e as workflowDeserialize, w as workflowSerialize } from './client.js';
import got from 'got';
import { Client } from 'uask-auth';
import 'uask-dom';
import 'fast-deep-equal';
import 'debug';
import 'stealer';

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

export { UaskClient };
