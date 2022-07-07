import { Survey as Survey$1, Sample, Participant as Participant$1, ZippedInterview, Interview as Interview$1, IDomainCollection, InterviewItem as InterviewItem$1, mlstring, IParticipantSummary, ItemJson, Workflow as Workflow$1, User, PageItem as PageItem$1, IKPI, KPISet, ISurveyBuilder, DNode, SurveyBuilder, SurveyOptions, Page as Page$1, Library, PageSet as PageSet$1, IPageBuilder, Rule, IPageItemBuilder, CrossItemRule, ParticipantBuilder, InterviewBuilder } from 'uask-dom';

declare class ParticipantGetOptions {
    offset: number;
    limit: number;
    deleted: boolean;
}
interface IParticipantDriver {
    getAll(survey: Survey$1, samples: Sample[], options?: Partial<ParticipantGetOptions>): Promise<Participant$1[]>;
    getByParticipantCode(survey: Survey$1, samples: Sample[], participantCode: string): Promise<Participant$1>;
    getBySample(survey: Survey$1, sample: Sample, options?: Partial<ParticipantGetOptions>): Promise<Participant$1[]>;
    save(survey: Survey$1, participant: Participant$1): Promise<Partial<Participant$1>>;
}
interface IParticipantDeleteDriver {
    delete(survey: Survey$1, participant: Participant$1): Promise<void>;
}

interface ISampleDriver {
    getAll(survey: Survey$1): Promise<Sample[]>;
    getBySampleCode(survey: Survey$1, sampleCode: string): Promise<Sample>;
    save(survey: Survey$1, sample: Sample): Promise<Partial<Sample>>;
}

interface ISurveyDriver {
    getByName(name: string): Promise<Survey$1>;
    save(survey: Survey$1): Promise<Partial<Survey$1>>;
}

declare type PartialInterview = Required<ZippedInterview>;
declare class InterviewSaveOptions {
    strict: boolean;
}
interface IInterviewDriver {
    save(survey: Survey$1, participant: Participant$1, interview: Interview$1, items?: IDomainCollection<InterviewItem$1>, options?: InterviewSaveOptions): Promise<PartialInterview>;
}
interface IInterviewDeleteDriver {
    delete(survey: Survey$1, participant: Participant$1, interview: Interview$1): Promise<void>;
}

declare type Value = Date | number | mlstring | undefined;
declare type Json<T = unknown> = Record<string, T>;

declare class ParticipantSummary implements IParticipantSummary {
    private survey;
    readonly participantCode: string;
    readonly sampleCode: string;
    readonly currentInterview: Json | undefined;
    readonly interviewCount: number;
    readonly pins: ItemJson;
    readonly kpis: ItemJson;
    readonly alerts: IDomainCollection<Json>;
    readonly included: boolean;
    readonly inclusionDate: Date | undefined;
    constructor(survey: Survey$1, summary: Record<string, unknown>);
    constructor(survey: Survey$1, participant: Participant$1, workflow?: Workflow$1);
    private interviewSummary;
    private itemMap;
    private kpiMap;
    private isPivotKpi;
    private kpi;
    private pivotKpi;
    private pageSummary;
    private itemSummary;
}
interface ISummaryDriver {
    getAll(survey: Survey$1, sample?: Sample, options?: Partial<ParticipantGetOptions>): Promise<ParticipantSummary[]>;
    getAll(survey: Survey$1, sample?: Sample, select?: (keyof ParticipantSummary)[], options?: Partial<ParticipantGetOptions>): Promise<Partial<ParticipantSummary>[]>;
}
declare class SummaryGenericDriver implements ISummaryDriver {
    private readonly participantDriver;
    private readonly sampleDriver;
    constructor(participantDriver: IParticipantDriver, sampleDriver: ISampleDriver);
    getAll(survey: Survey$1, sample?: Sample, options?: Partial<ParticipantGetOptions>): Promise<ParticipantSummary[]>;
    getAll(survey: Survey$1, sample?: Sample, select?: (keyof ParticipantSummary)[], options?: Partial<ParticipantGetOptions>): Promise<Partial<ParticipantSummary>[]>;
    private getParticipants;
}

interface IUserDriver {
    getAll(survey: Survey$1): Promise<User[]>;
    getByUserId(survey: Survey$1, userid: string): Promise<User | undefined>;
    save(survey: Survey$1, user: User): Promise<Partial<User>>;
}

declare class AuditRecord {
    readonly target: AuditableRef;
    readonly sampleCode: string;
    readonly date: Date;
    readonly operation: mlstring;
    readonly changes: Record<string, unknown>;
    readonly user: User;
    constructor(target: AuditableRef, sampleCode: string, date: Date, operation: mlstring, changes: Record<string, unknown>, user: User);
    private static operationOrder;
    private getOperationIndex;
    isAfter(other: AuditRecord): boolean;
}
declare type AuditTrailRecord = Omit<AuditRecord, "changes" | "isAfter"> & {
    readonly previous: string | undefined;
    readonly current: string | undefined;
};
declare type AuditableRef = {
    participantCode: string;
    nonce?: number | null;
    variableName?: string | null;
    instance?: number | null;
};
declare class AuditTrail extends Array<AuditTrailRecord> {
    private item;
    constructor(records: AuditRecord[], pageItem: PageItem$1, lang?: string);
    private compare;
    private pushValue;
    private applyChanges;
    private undefValue;
    private undefSpecial;
    private isRelevant;
    private isCreation;
    private pushRecord;
}
interface IAuditDriver {
    get(survey: Survey$1, target: AuditableRef, operations?: mlstring[]): Promise<AuditRecord[]>;
}

declare class Document {
    readonly name: string;
    readonly title: mlstring;
    readonly tags?: IDomainCollection<mlstring> | undefined;
    readonly __keys__: {
        [key: string]: number;
    };
    readonly hash: number;
    readonly content: Uint8Array;
    readonly visibility: "survey" | "participant";
    constructor(name: string, title: mlstring, tags?: IDomainCollection<mlstring> | undefined, kwargs?: Partial<Document>);
    update(kwargs: Partial<Document>): Document;
}
declare function getAllTags(documents: Document[]): IDomainCollection<mlstring>;
interface IDocumentDriver {
    save(survey: Survey$1, document: Document): Promise<Partial<Document>>;
    delete(survey: Survey$1, hash: number): Promise<void>;
    getByHash(survey: Survey$1, hash: number): Promise<Document>;
    getAll(survey: Survey$1): Promise<Document[]>;
    saveContent(survey: Survey$1, hash: number, content: Uint8Array): Promise<void>;
    getContent(survey: Survey$1, hash: number): Promise<{
        content: Uint8Array;
        name: string;
    }>;
}

interface IKpiDriver {
    getAll(survey: Survey$1, samples?: Sample[]): Promise<[IKPI[], KPISet]>;
}
declare class KpiGenericDriver implements IKpiDriver {
    private readonly sampleDriver;
    private readonly summaryDriver;
    constructor(sampleDriver: ISampleDriver, summaryDriver: ISummaryDriver);
    getAll(survey: Survey$1, samples?: Sample[]): Promise<[IKPI[], KPISet]>;
    private getKpis;
    private compateKpi;
    private isPivotKpi;
    private getPivotKpis;
    private getAllSummaries;
    private getSummaries;
}

interface IDrivers {
    readonly surveyDriver: ISurveyDriver;
    readonly sampleDriver: ISampleDriver;
    readonly participantDriver: IParticipantDriver & IParticipantDeleteDriver;
    readonly interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
    readonly summaryDriver: ISummaryDriver;
    readonly userDriver: IUserDriver;
    readonly auditDriver: IAuditDriver;
    readonly documentDriver: IDocumentDriver;
    readonly kpiDriver: IKpiDriver;
}

interface Changes<T> {
    readonly __changes__?: Partial<T>;
}

declare type KeyMap = {
    [key: string]: number;
};
interface Keys {
    readonly __keys__?: KeyMap;
}

declare type Freshen<T> = ((p: Partial<T>) => Partial<T>) | false;
interface Updatable<T, U extends Keys = T> {
    update(kwargs: Partial<U>): T;
}
interface Tracking<T> extends Updatable<T> {
    updateNoTrack(kwargs: Partial<T>): T;
    isStale(omit?: (keyof T)[]): Freshen<T>;
    __untrack__?: true;
}
interface Del<T> extends Updatable<T> {
    __delete__?: unknown;
}
declare module "uask-dom" {
    interface Survey extends Keys, Tracking<Survey>, Changes<Survey> {
    }
    interface Page extends Keys, Tracking<Page>, Changes<Page> {
    }
    interface PageSet extends Keys, Tracking<PageSet>, Changes<PageSet> {
    }
    interface PageItem extends Keys, Tracking<PageItem>, Changes<PageItem> {
    }
    interface Participant extends Keys, Tracking<Participant>, Changes<Participant>, Del<Participant> {
    }
    interface Interview extends Keys, Tracking<Interview>, Changes<Interview>, Del<Interview> {
    }
    interface InterviewItem extends Keys, Tracking<InterviewItem>, Changes<InterviewItem> {
    }
    interface Sample extends Keys, Tracking<Sample>, Changes<Sample> {
    }
    interface Workflow extends Keys, Tracking<Workflow>, Changes<Workflow> {
    }
}

interface Builder$1<T> {
    build(...args: unknown[]): T;
}
interface Tracker<T> {
    track(keys: Keys, changes: Changes<T>): void;
}
interface TrackBuilder<T extends Tracking<T>> extends Builder$1<T>, Tracker<T> {
    buildNoTrack(...args: unknown[]): T;
}
declare module "uask-dom" {
    interface ISurveyBuilder extends Tracker<Survey> {
    }
    interface SurveyBuilder extends ISurveyBuilder, Keys, TrackBuilder<Survey>, Changes<Survey> {
    }
    interface IPageBuilder extends Tracker<Page> {
    }
    interface PageBuilder extends IPageBuilder, Keys, TrackBuilder<Page>, Changes<Page> {
    }
    interface IPageItemBuilder extends Tracker<PageItem> {
    }
    interface PageItemBuilder extends IPageItemBuilder, Keys, TrackBuilder<PageItem>, Changes<PageItem> {
    }
    interface IPageSetBuilder extends Tracker<PageSet> {
    }
    interface PageSetBuilder extends IPageSetBuilder, Keys, TrackBuilder<PageSet>, Changes<PageSet> {
    }
    interface IWorkflowBuilder extends Tracker<Workflow> {
    }
    interface IRawWorkflowBuilder extends Tracker<Workflow> {
    }
    interface WorkflowBuilder extends IWorkflowBuilder, IRawWorkflowBuilder, Keys, TrackBuilder<Workflow>, Changes<Workflow> {
    }
    interface ParticipantBuilder extends Keys, TrackBuilder<Participant>, Changes<Participant> {
    }
    interface InterviewBuilder extends Keys, TrackBuilder<Interview>, Changes<Interview> {
    }
    interface InterviewItemBuilder extends Keys, TrackBuilder<InterviewItem>, Changes<InterviewItem> {
    }
}

declare function surveyDeserialize(b: ISurveyBuilder, survey: DNode<Survey$1>): void;
declare function surveySerialize(survey: Survey$1, track?: boolean): DNode<Survey$1>;
declare function clone(survey: Survey$1): SurveyBuilder;

declare function workflowSerialize(workflow: Workflow$1, options: SurveyOptions, track?: boolean): DNode<Workflow$1>;
declare function workflowDeserialize(b: ISurveyBuilder, workflow: DNode<Workflow$1>): void;

declare function pageDeserialize(b: ISurveyBuilder, page: DNode<Page$1>): void;
declare function pageSerialize(page: Page$1, options: SurveyOptions, track?: boolean): DNode<Page$1>;
declare function librarySerialize(i: Library | PageItem$1, options: SurveyOptions, track?: boolean): DNode<Library> | DNode<PageItem$1>;

declare function pageSetDeserialize(b: ISurveyBuilder, pageSet: DNode<PageSet$1>): void;
declare function pageSetSerialize(pageSet: PageSet$1, options: SurveyOptions, track?: boolean): DNode<PageSet$1>;

declare function itemDeserialize(pb: IPageBuilder, item: DNode<PageItem$1>): void;
declare function itemSerialize(item: PageItem$1, track?: boolean): DNode<PageItem$1>;

declare function ruleSerialize(rule: Rule): DNode<Rule>;
declare function ruleDeserialize(ib: IPageItemBuilder, rule: DNode<Rule>): void;

declare function crossRuleSerialize(crossItemRule: CrossItemRule): DNode<CrossItemRule>;
declare function crossRuleDeserialize(b: ISurveyBuilder, crossRule: DNode<CrossItemRule>): void;

declare function participantSerialize(participant: Participant$1, track?: boolean): DNode<Participant$1>;
declare function participantDeserialize(pb: ParticipantBuilder, participant: DNode<Participant$1>): void;

declare function interviewSerialize(interview: Interview$1, track?: boolean): DNode<Interview$1>;
declare function interviewDeserialize(pb: ParticipantBuilder, interview: DNode<Interview$1>): void;

declare function interviewItemSerialize(interviewItem: InterviewItem$1, track?: boolean): DNode<InterviewItem$1>;
declare function interviewItemDeserialize(ib: InterviewBuilder, interviewItem: DNode<InterviewItem$1>): void;

declare function pick<T>(obj: T): DNode<T>;

declare type Ftor<T, S extends unknown[]> = (...args: S) => T;
declare type Ctor<T, S extends unknown[]> = {
    new (...args: S): T;
};
declare type Driver = IParticipantDriver | ISurveyDriver | ISummaryDriver | ISampleDriver | IInterviewDriver | IUserDriver | IAuditDriver | IDocumentDriver | IKpiDriver;
declare class Builder<T extends Driver, S extends unknown[]> {
    private ftor;
    private args;
    private constructor();
    with<U extends Driver, R extends unknown[]>(ftor: Ftor<U, [T, ...R]> | Ctor<U, [T, ...R]>, ...args: R): Builder<U, R>;
    withLogging(on?: boolean): Builder<T, S>;
    private __driver;
    get(): T;
    static decorate<T extends Driver, S extends unknown[]>(ftor: Ftor<T, S> | Ctor<T, S>, ...args: S): Builder<T, S>;
}

declare function LoggingProxy<T extends IParticipantDriver | ISurveyDriver | ISummaryDriver | ISampleDriver | IInterviewDriver | IUserDriver | IAuditDriver | IDocumentDriver | IKpiDriver>(target: T): T;

declare class SampleCacheDriver implements ISampleDriver {
    private readonly driver;
    private static cache;
    static _init(): void;
    constructor(driver: ISampleDriver);
    getAll(survey: Survey$1): Promise<Sample[]>;
    getBySampleCode(survey: Survey$1, sampleCode: string): Promise<Sample>;
    save(survey: Survey$1, sample: Sample): Promise<Partial<Sample>>;
}

declare class ParticipantAuthorizationManager {
    readonly survey: Survey$1;
    readonly participant: Participant$1;
    readonly user: User | undefined;
    constructor(survey: Survey$1, participant: Participant$1, user: User | undefined);
    get workflow(): Workflow$1;
    canDelete(): boolean;
    canDeleteError(): string;
    canCreate(): boolean;
    canCreateError(): string;
    canWriteItems(interview: Interview$1): boolean;
    canWriteItemsError(interview: Interview$1): string;
    private isFrozen;
    private isInRole;
    private isInWorkflow;
}
declare class SurveyAuthorizationManager {
    readonly survey: Survey$1;
    readonly user: User | undefined;
    constructor(survey: Survey$1, user: User | undefined);
    canReadSample(sampleCode: string): boolean;
    canReadSampleError(sampleCode: string): string;
    canReadParticipant(participantCode: string): boolean;
    canReadParticipantError(participantCode: string): string;
    canSaveUser(): boolean;
    canSaveUserError(): string;
    canSaveSurvey(): boolean;
    canSaveSurveyError(): string;
    canSaveSample(): boolean;
    canSaveSampleError(): string;
    canSaveDocument(document: Document): boolean;
    canSaveDocumentError(document: Document): string;
    private isInRole;
}

declare type WithRespBody = {
    response: Record<string, unknown> & ({
        body: string;
    } | {
        json: () => Record<string, unknown>;
    });
};
declare class UaskError extends Error {
    constructor(err: {
        code?: string;
        message: string;
    });
}
declare function errorMessage(message: string, statusCode?: number): {
    message: string;
    statusCode: number;
};
declare class UaskClientError extends Error {
    readonly errors: string[];
    constructor(errors: string[]);
}
declare function handleClientError(error: WithRespBody): Promise<never>;

declare function generateDSL(survey: Survey$1): string;

export { ParticipantAuthorizationManager as $, AuditRecord as A, pageSetDeserialize as B, pageSetSerialize as C, Document as D, itemDeserialize as E, itemSerialize as F, ruleSerialize as G, ruleDeserialize as H, IDrivers as I, Json as J, KpiGenericDriver as K, crossRuleSerialize as L, crossRuleDeserialize as M, participantSerialize as N, participantDeserialize as O, ParticipantGetOptions as P, interviewSerialize as Q, interviewDeserialize as R, SummaryGenericDriver as S, interviewItemSerialize as T, UaskClientError as U, Value as V, interviewItemDeserialize as W, pick as X, Builder as Y, LoggingProxy as Z, SampleCacheDriver as _, ISampleDriver as a, SurveyAuthorizationManager as a0, UaskError as a1, handleClientError as a2, generateDSL as a3, IParticipantDriver as b, IParticipantDeleteDriver as c, ISurveyDriver as d, IInterviewDriver as e, IInterviewDeleteDriver as f, ISummaryDriver as g, IAuditDriver as h, IUserDriver as i, IDocumentDriver as j, IKpiDriver as k, errorMessage as l, InterviewSaveOptions as m, PartialInterview as n, AuditableRef as o, AuditTrail as p, ParticipantSummary as q, getAllTags as r, surveyDeserialize as s, surveySerialize as t, clone as u, workflowDeserialize as v, workflowSerialize as w, pageDeserialize as x, pageSerialize as y, librarySerialize as z };
