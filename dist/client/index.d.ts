import { I as IDrivers, a as ISampleDriver, b as IParticipantDriver, c as IParticipantDeleteDriver, d as ISurveyDriver, e as IInterviewDriver, f as IInterviewDeleteDriver, g as ISummaryDriver, h as IAuditDriver, i as IUserDriver, j as IDocumentDriver, k as IKpiDriver } from './system.js';
export { A as AuditRecord, p as AuditTrail, o as AuditableRef, Y as Builder, D as Document, h as IAuditDriver, j as IDocumentDriver, I as IDrivers, f as IInterviewDeleteDriver, e as IInterviewDriver, k as IKpiDriver, c as IParticipantDeleteDriver, b as IParticipantDriver, a as ISampleDriver, g as ISummaryDriver, d as ISurveyDriver, i as IUserDriver, m as InterviewSaveOptions, J as Json, K as KpiGenericDriver, Z as LoggingProxy, n as PartialInterview, $ as ParticipantAuthorizationManager, P as ParticipantGetOptions, q as ParticipantSummary, _ as SampleCacheDriver, S as SummaryGenericDriver, a0 as SurveyAuthorizationManager, U as UaskClientError, a1 as UaskError, V as Value, u as clone, M as crossRuleDeserialize, L as crossRuleSerialize, l as errorMessage, a3 as generateDSL, r as getAllTags, a2 as handleClientError, R as interviewDeserialize, W as interviewItemDeserialize, T as interviewItemSerialize, Q as interviewSerialize, E as itemDeserialize, F as itemSerialize, z as librarySerialize, x as pageDeserialize, y as pageSerialize, B as pageSetDeserialize, C as pageSetSerialize, O as participantDeserialize, N as participantSerialize, X as pick, H as ruleDeserialize, G as ruleSerialize, s as surveyDeserialize, t as surveySerialize, v as workflowDeserialize, w as workflowSerialize } from './system.js';
import { Got } from 'got';
import 'uask-dom';

declare class ClientDrivers implements IDrivers {
    readonly client: Got;
    readonly sampleDriver: ISampleDriver;
    readonly participantDriver: IParticipantDriver & IParticipantDeleteDriver;
    readonly surveyDriver: ISurveyDriver;
    readonly interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
    readonly summaryDriver: ISummaryDriver;
    readonly auditDriver: IAuditDriver;
    readonly userDriver: IUserDriver;
    readonly documentDriver: IDocumentDriver;
    readonly kpiDriver: IKpiDriver;
    constructor(client: Got);
}

export { ClientDrivers };
