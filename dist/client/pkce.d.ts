import { o as IDrivers, I as ISurveyDriver, a as ISampleDriver, b as IParticipantDriver, c as IParticipantDeleteDriver, d as IInterviewDriver, e as IInterviewDeleteDriver, h as ISummaryDriver, i as IUserDriver, j as IAuditDriver, m as IDocumentDriver, n as IKpiDriver } from './client.js';
export { A as AuditRecord, l as AuditTrail, k as AuditableRef, X as Builder, C as ClientDrivers, D as Document, j as IAuditDriver, m as IDocumentDriver, o as IDrivers, e as IInterviewDeleteDriver, d as IInterviewDriver, n as IKpiDriver, c as IParticipantDeleteDriver, b as IParticipantDriver, a as ISampleDriver, h as ISummaryDriver, I as ISurveyDriver, i as IUserDriver, f as InterviewSaveOptions, J as Json, K as KpiGenericDriver, Y as LoggingProxy, g as PartialInterview, _ as ParticipantAuthorizationManager, P as ParticipantGetOptions, p as ParticipantSummary, Z as SampleCacheDriver, S as SummaryGenericDriver, $ as SurveyAuthorizationManager, a2 as UaskClientError, a0 as UaskError, V as Value, t as clone, M as crossRuleDeserialize, L as crossRuleSerialize, a1 as errorMessage, a4 as generateDSL, q as getAllTags, a3 as handleClientError, R as interviewDeserialize, U as interviewItemDeserialize, T as interviewItemSerialize, Q as interviewSerialize, E as itemDeserialize, F as itemSerialize, y as librarySerialize, v as pageDeserialize, x as pageSerialize, z as pageSetDeserialize, B as pageSetSerialize, O as participantDeserialize, N as participantSerialize, W as pick, H as ruleDeserialize, G as ruleSerialize, s as surveyDeserialize, r as surveySerialize, u as workflowDeserialize, w as workflowSerialize } from './client.js';
import 'got';
import 'uask-dom';

declare class UaskClient implements IDrivers {
    private readonly apiUrl;
    private readonly auth;
    private readonly drivers;
    constructor(apiUrl: string, authUrl?: string);
    surveyDriver: ISurveyDriver;
    sampleDriver: ISampleDriver;
    participantDriver: IParticipantDriver & IParticipantDeleteDriver;
    interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
    summaryDriver: ISummaryDriver;
    userDriver: IUserDriver;
    auditDriver: IAuditDriver;
    documentDriver: IDocumentDriver;
    kpiDriver: IKpiDriver;
    destroy(): Promise<void>;
    private deref;
}

export { UaskClient };
