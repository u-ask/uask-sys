/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Knex } from "knex";

import { SurveyDriver } from "./surveydb.js";
import { SampleDriver } from "./sampledb.js";
import { InterviewDriver } from "./interviewdb.js";
import { PageItemDriver } from "./pageitemdb.js";
import { PageSetDriver } from "./pagesetdb.js";
import { ParticipantDriver } from "./participantdb.js";
import { InterviewItemDriver } from "./interviewitemdb.js";
import { PageDriver } from "./pagedb.js";
import { IncludeDriver } from "./includedb.js";
import { RuleDriver } from "./ruledb.js";
import { DocumentDriver } from "./documentdb.js";
import { WorkflowDriver } from "./workflowdb.js";
import { ItemTypeDriver } from "./itemtypedb.js";
import { WorkflowTypeDriver } from "./workflowtypedb.js";
import { RuleTypeDriver } from "./ruletypedb.js";
import { ScopeDriver } from "./scopedb.js";
import { SurveyStore } from "./surveydbstore.js";
import { PageSetStore } from "./pagesetsdbstore.js";
import { PageStore } from "./pagedbstore.js";
import { PageItemStore } from "./pageitemdbstore.js";
import { IncludeStore } from "./includedbstore.js";
import { RuleStore } from "./ruledbstore.js";
import { WorkflowStore } from "./workflowdbstore.js";
import { SampleStore } from "./sampledbstore.js";
import { ParticipantStore } from "./participantdbstore.js";
import { InterviewStore } from "./interviewdbstore.js";
import { InterviewItemStore } from "./interviewitemdbstore.js";
import { DocumentStore } from "./documentdbstore.js";

export class Drivers {
  readonly surveyDriver: SurveyDriver;
  readonly pageDriver: PageDriver;
  readonly pageItemDriver: PageItemDriver;
  readonly itemTypeDriver: ItemTypeDriver;
  readonly pageSetDriver: PageSetDriver;
  readonly includeDriver: IncludeDriver;
  readonly ruleDriver: RuleDriver;
  readonly ruleTypeDriver: RuleTypeDriver;
  readonly scopeDriver: ScopeDriver;
  readonly workflowDriver: WorkflowDriver;
  readonly workflowTypeDriver: WorkflowTypeDriver;
  readonly sampleDriver: SampleDriver;
  readonly participantDriver: ParticipantDriver;
  readonly interviewDriver: InterviewDriver;
  readonly interviewItemDriver: InterviewItemDriver;
  readonly documentDriver: DocumentDriver;
  constructor(readonly client: Knex) {
    this.surveyDriver = new SurveyDriver(this.client);
    this.pageDriver = new PageDriver(this.client);
    this.pageItemDriver = new PageItemDriver(this.client);
    this.itemTypeDriver = new ItemTypeDriver(this.client);
    this.pageSetDriver = new PageSetDriver(this.client);
    this.includeDriver = new IncludeDriver(this.client);
    this.ruleDriver = new RuleDriver(this.client);
    this.ruleTypeDriver = new RuleTypeDriver(this.client);
    this.scopeDriver = new ScopeDriver(this.client);
    this.workflowDriver = new WorkflowDriver(this.client);
    this.workflowTypeDriver = new WorkflowTypeDriver(this.client);
    this.sampleDriver = new SampleDriver(this.client);
    this.participantDriver = new ParticipantDriver(this.client);
    this.interviewDriver = new InterviewDriver(this.client);
    this.interviewItemDriver = new InterviewItemDriver(this.client);
    this.documentDriver = new DocumentDriver(this.client);
  }
}

export class Store extends Drivers {
  readonly surveyStore = new SurveyStore(this);
  readonly pageSetStore = new PageSetStore(this);
  readonly pageStore = new PageStore(this);
  readonly pageItemStore = new PageItemStore(this);
  readonly includeStore = new IncludeStore(this);
  readonly ruleStore = new RuleStore(this);
  readonly workflowStore = new WorkflowStore(this);
  readonly sampleStore = new SampleStore(this);
  readonly participantStore = new ParticipantStore(this);
  readonly interviewStore = new InterviewStore(this);
  readonly interviewItemStore = new InterviewItemStore(this);
  readonly documentStore = new DocumentStore(this);

  constructor(readonly client: Knex) {
    super(client);
  }

  get saveSurvey() {
    return this.surveyStore.save.bind(this.surveyStore);
  }

  get getSurveyNode() {
    return this.surveyStore.getNode.bind(this.surveyStore);
  }

  get savePages() {
    return this.pageStore.saveAll.bind(this.pageStore);
  }

  get savePageItems() {
    return this.pageItemStore.saveAll.bind(this.pageItemStore);
  }

  get savePageSets() {
    return this.pageSetStore.saveAll.bind(this.pageSetStore);
  }

  get saveIncludes() {
    return this.includeStore.saveAll.bind(this.includeStore);
  }

  get saveRules() {
    return this.ruleStore.saveAll.bind(this.ruleStore);
  }

  get saveWorkflows() {
    return this.workflowStore.saveAll.bind(this.workflowStore);
  }

  get saveSamples() {
    return this.sampleStore.saveAll.bind(this.sampleStore);
  }

  get saveSample() {
    return this.sampleStore.save.bind(this.sampleStore);
  }

  get getSampleNodes() {
    return this.sampleStore.getNodes.bind(this.sampleStore);
  }

  get saveParticipants() {
    return this.participantStore.saveAll.bind(this.participantStore);
  }

  get saveParticipant() {
    return this.participantStore.save.bind(this.participantStore);
  }

  get getParticipantNodes() {
    return this.participantStore.getNodes.bind(this.participantStore);
  }

  get saveInterviews() {
    return this.interviewStore.saveAll.bind(this.interviewStore);
  }

  get saveInterview() {
    return this.interviewStore.save.bind(this.interviewStore);
  }

  get saveInterviewItems() {
    return this.interviewItemStore.saveAll.bind(this.interviewItemStore);
  }

  get saveDocuments() {
    return this.documentStore.saveAll.bind(this.documentStore);
  }

  get saveDocument() {
    return this.documentStore.save.bind(this.documentStore);
  }

  get deleteDocument() {
    return this.documentStore.delete.bind(this.documentStore);
  }

  get getDocumentNode() {
    return this.documentStore.getNode.bind(this.documentStore);
  }

  get getDocumentNodes() {
    return this.documentStore.getNodes.bind(this.documentStore);
  }

  get getDocumentContent() {
    return this.documentStore.getContentByHash.bind(this.documentStore);
  }
}
