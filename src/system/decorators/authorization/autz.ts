import { Interview, Participant, Survey, User, Workflow } from "uask-dom";
import { Document } from "../../../drivers";

const superUsers = ["developer", "superadministrator"];
const administrators = ["administrator", ...superUsers];
const writers = ["writer", ...superUsers];

export class ParticipantAuthorizationManager {
  constructor(
    readonly survey: Survey,
    readonly participant: Participant,
    readonly user: User | undefined
  ) {}

  get workflow(): Workflow {
    return this.user
      ? this.survey.workflow(this.user.workflow) ?? this.survey.mainWorkflow
      : this.survey.mainWorkflow;
  }

  canDelete(): boolean {
    return !this.canDeleteError();
  }

  canDeleteError(): string {
    if (!this.user) return "unknown user";
    if (!this.isInRole(...administrators))
      return "role is not authorized to delete";
    if (this.isFrozen()) return "sample is frozen";
    return "";
  }

  canCreate(): boolean {
    return !this.canCreateError();
  }

  canCreateError(): string {
    if (!this.user) return "unknown user";
    if (!this.isInRole(...writers))
      return "role is not authorized to create items";
    if (this.isFrozen()) return "sample is frozen";
    return "";
  }

  canWriteItems(interview: Interview): boolean {
    return !this.canWriteItemsError(interview);
  }

  canWriteItemsError(interview: Interview): string {
    if (!this.user) return "unknown user";
    if (!this.isInRole(...writers))
      return "role is not authorized to write items";
    if (this.isInWorkflow(interview))
      return "workflow is not authorized to write items for interview";
    if (this.isFrozen()) return "sample is frozen";
    return "";
  }

  private isFrozen(): boolean {
    return this.participant.sample.frozen;
  }

  private isInRole(...roles: string[]): boolean {
    return this.user ? roles.includes(this.user.role) : false;
  }

  private isInWorkflow(interview: Interview) {
    return !this.workflow.pageSets.includes(interview.pageSet);
  }
}

export class SurveyAuthorizationManager {
  constructor(readonly survey: Survey, readonly user: User | undefined) {}

  canReadSample(sampleCode: string): boolean {
    return !this.canReadSampleError(sampleCode);
  }

  canReadSampleError(sampleCode: string): string {
    if (!this.user) return "unknown user";
    if (
      this.user.sampleCodes &&
      this.user.sampleCodes.length > 0 &&
      !this.user.sampleCodes.includes(sampleCode)
    )
      return "not authorized to read participants from sample";
    return "";
  }

  canReadParticipant(participantCode: string): boolean {
    return !this.canReadParticipantError(participantCode);
  }

  canReadParticipantError(participantCode: string): string {
    if (!this.user) return "unknown user";
    if (
      this.user.participantCodes &&
      this.user.participantCodes.length > 0 &&
      !this.user.participantCodes.includes(participantCode)
    )
      return "not authorized to read participant";
    return "";
  }

  canSaveUser(): boolean {
    return !this.canSaveUserError();
  }

  canSaveUserError(): string {
    if (!this.user) return "unknown user";
    if (!this.isInRole(...administrators))
      return "role is not authorized to save user";
    return "";
  }

  canSaveSurvey(): boolean {
    return !this.canSaveSurveyError();
  }

  canSaveSurveyError(): string {
    if (!this.user) return "unknown user";
    if (!this.isInRole(...administrators))
      return "role is not authorized to save survey";
    return "";
  }

  canSaveSample(): boolean {
    return !this.canSaveSampleError();
  }

  canSaveSampleError(): string {
    if (!this.user) return "unknown user";
    if (!this.isInRole(...administrators))
      return "role is not authorized to save sample";
    return "";
  }

  canSaveDocument(document: Document): boolean {
    return !this.canSaveDocumentError(document);
  }

  canSaveDocumentError(document: Document): string {
    if (!this.user) return "unknown user";
    if (document.visibility == "survey" && !this.isInRole(...administrators))
      return "role is not authorized to save survey document";
    if (document.visibility == "participant" && !this.isInRole(...writers))
      return "role is not authorized to save participant document";
    return "";
  }

  private isInRole(...roles: string[]): boolean {
    return this.user ? roles.includes(this.user.role) : false;
  }
}
