import {
  Survey,
  Interview,
  InterviewItem,
  mlstring,
  PageItem,
  Participant,
  User,
  getTranslation,
} from "uask-dom";

export class AuditRecord {
  constructor(
    readonly target: AuditableRef,
    readonly sampleCode: string,
    readonly date: Date,
    readonly operation: mlstring,
    readonly changes: Record<string, unknown>,
    readonly user: User
  ) {}

  private static operationOrder = ["create", "update"];

  private getOperationIndex() {
    return AuditRecord.operationOrder.indexOf(
      (this.changes.action ?? getTranslation(this.operation, "en")) as string
    );
  }

  isAfter(other: AuditRecord): boolean {
    const thisTime = Math.trunc(this.date.getTime() / 1000);
    const otherTime = Math.trunc(other.date.getTime() / 1000);
    return thisTime != otherTime
      ? thisTime > otherTime
      : this.getOperationIndex() > other.getOperationIndex();
  }
}

export type AuditTrailRecord = Omit<AuditRecord, "changes" | "isAfter"> & {
  readonly previous: string | undefined;
  readonly current: string | undefined;
};

export type AuditableRef = {
  participantCode: string;
  nonce?: number | null;
  variableName?: string | null;
  instance?: number | null;
};

export type Auditable = InterviewItem | Interview | Participant;

export function isInterviewItemTarget(
  target: Partial<AuditableRef>
): target is {
  participantCode: string;
  nonce: number;
  variableName: string;
  instance: number;
} {
  return (
    target.participantCode != undefined &&
    target.nonce != undefined &&
    target.variableName != undefined
  );
}

export function isInterviewTarget(
  target: Partial<AuditableRef>
): target is { participantCode: string; nonce: number } {
  return target.participantCode != undefined && target.nonce != undefined;
}

export function isParticipantTarget(
  target: Partial<AuditableRef>
): target is { participantCode: string } {
  return target.participantCode != undefined;
}

export class AuditTrail extends Array<AuditTrailRecord> {
  private item: InterviewItem;

  constructor(records: AuditRecord[], pageItem: PageItem, lang?: string) {
    super();
    this.item = new InterviewItem(pageItem, undefined);
    records
      .sort((a, b) => this.compare(a, b))
      .forEach(rec => {
        this.pushValue(rec, lang);
      });
    Object.defineProperty(this, "item", { enumerable: false });
  }

  private compare(a: AuditRecord, b: AuditRecord): number {
    return a.isAfter(b) ? 1 : -1;
  }

  private pushValue(rec: AuditRecord, lang: string | undefined) {
    const current = this.applyChanges(rec);
    if (this.isCreation(rec))
      rec = Object.assign(Object.create(AuditRecord.prototype), {
        ...rec,
        operation: "create",
      });
    if (this.isRelevant(rec, current)) this.pushRecord(rec, lang, current);
    this.item = current;
  }

  private applyChanges(rec: AuditRecord) {
    const changes = {
      ...rec.changes,
      ...this.undefValue(rec),
      ...this.undefSpecial(rec),
    };
    return this.item.update(changes as Partial<InterviewItem>);
  }

  private undefValue(rec: AuditRecord) {
    return rec.changes.specialValue != undefined ||
      Object.keys(rec.changes).length == 0
      ? { value: undefined, unit: undefined }
      : "specialValue" in rec.changes
      ? { specialValue: undefined }
      : {};
  }

  private undefSpecial(rec: AuditRecord) {
    return rec.changes.value != undefined ||
      Object.keys(rec.changes).length == 0
      ? { specialValue: undefined }
      : "value" in rec.changes
      ? { value: undefined }
      : {};
  }

  private isRelevant(rec: AuditRecord, current: InterviewItem) {
    return rec.operation != "create" || typeof current.label() != "undefined";
  }

  private isCreation(rec: AuditRecord) {
    return this.length == 0 && rec.operation == "update";
  }

  private pushRecord(
    rec: AuditRecord,
    lang: string | undefined,
    current: InterviewItem
  ) {
    super.push({
      target: rec.target,
      sampleCode: rec.sampleCode,
      date: rec.date,
      operation: rec.operation,
      previous: this.item.label(lang),
      current: current.label(lang),
      user: rec.user,
    });
  }
}

export interface IAuditDriver {
  get(
    survey: Survey,
    target: AuditableRef,
    operations?: mlstring[]
  ): Promise<AuditRecord[]>;
}
