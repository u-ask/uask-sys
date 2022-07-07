import * as uask_dom from 'uask-dom';
import { Survey, Participant, Interview, Sample, User } from 'uask-dom';
import { d as IInterviewDriver, e as IInterviewDeleteDriver, g as PartialInterview, b as IParticipantDriver, c as IParticipantDeleteDriver, P as ParticipantGetOptions, a as ISampleDriver, I as ISurveyDriver, S as SummaryGenericDriver, h as ISummaryDriver, m as IDocumentDriver, D as Document, o as IDrivers, i as IUserDriver, j as IAuditDriver, n as IKpiDriver } from './client.js';
import { exampleSurvey, exampleSamples, exampleParticipants } from 'uask-dom/example';
import 'got';

declare class InterviewExampleDriver implements IInterviewDriver, IInterviewDeleteDriver {
    private participantDriver;
    private sampleDriver;
    private mutex;
    save(survey: Survey, participant: Participant, interview: Interview, items?: uask_dom.IDomainCollection<uask_dom.InterviewItem>): Promise<PartialInterview>;
    delete(survey: Survey, participant: Participant, interview: Interview): Promise<void>;
}

declare class ParticipantExampleDriver implements IParticipantDriver, IParticipantDeleteDriver {
    getAll(survey: Survey, samples: Sample[], options?: Partial<ParticipantGetOptions>): Promise<Participant[]>;
    getBySample(survey: Survey, sample: Sample, options?: Partial<ParticipantGetOptions>): Promise<Participant[]>;
    getByParticipantCode(survey: Survey, samples: Sample[], participantCode: string): Promise<Participant>;
    save(survey: Survey, participant: Participant): Promise<{
        participantCode: string;
    }>;
    private create;
    private update;
    delete(survey: Survey, participant: Participant): Promise<void>;
}

declare class SampleExampleDriver implements ISampleDriver {
    getAll(survey: Survey): Promise<Sample[]>;
    getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample>;
    save(survey: Survey, sample: Sample): Promise<Partial<Sample>>;
}

declare class SurveyExampleDriver implements ISurveyDriver {
    static P11_06: Survey | undefined;
    constructor();
    getByName(name: string): Promise<Survey>;
    save(survey: Survey): Promise<Partial<Survey>>;
}

declare class SummaryExampleDriver extends SummaryGenericDriver implements ISummaryDriver {
    constructor();
}

declare class DocumentExampleDriver implements IDocumentDriver {
    save(survey: Survey, document: Document): Promise<Partial<Document>>;
    delete(survey: Survey, hash: number): Promise<void>;
    getByHash(survey: Survey, hash: number): Promise<Document>;
    getAll(survey: Survey): Promise<Document[]>;
    saveContent(survey: Survey, hash: number, content: Uint8Array): Promise<void>;
    getContent(survey: Survey, hash: number): Promise<{
        content: Uint8Array;
        name: string;
    }>;
}

declare let P11_05: typeof exampleSurvey;
declare let P11_05_Samples: typeof exampleSamples;
declare let P11_05_Participants: typeof exampleParticipants;
declare let P11_05_Users: User[];
declare let P11_05_Documents: Document[];
declare function seedExample(): void;

declare class ExampleDrivers implements IDrivers {
    readonly surveyDriver: SurveyExampleDriver;
    readonly sampleDriver: SampleExampleDriver;
    readonly participantDriver: ParticipantExampleDriver;
    readonly interviewDriver: InterviewExampleDriver;
    readonly summaryDriver: SummaryExampleDriver;
    readonly userDriver: IUserDriver;
    readonly auditDriver: IAuditDriver;
    readonly documentDriver: DocumentExampleDriver;
    readonly kpiDriver: IKpiDriver;
}

export { ExampleDrivers, P11_05, P11_05_Documents, P11_05_Participants, P11_05_Samples, P11_05_Users, seedExample };
