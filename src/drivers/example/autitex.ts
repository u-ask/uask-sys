import {
  Interview,
  InterviewItem,
  mlstring,
  Participant,
  Sample,
  Survey,
  User,
} from "uask-dom";
import {
  AuditableRef,
  AuditRecord,
  IAuditDriver,
  IDrivers,
} from "../../client.js";
import {
  isInterviewItemTarget,
  isInterviewTarget,
  isParticipantTarget,
} from "../audit.js";

const henriette = new User(
  "Monseau",
  "Henriette",
  "Dr",
  "writer",
  "hmonceau@example.com",
  "0606060606"
);

export class AuditExampleDriver implements IAuditDriver {
  constructor(private readonly drivers: IDrivers) {}
  async get(
    survey: Survey,
    target: AuditableRef,
    operations?: mlstring[]
  ): Promise<AuditRecord[]> {
    const date = new Date().getTime();
    const samples = await this.drivers.sampleDriver.getAll(survey);
    const participant = await this.drivers.participantDriver.getByParticipantCode(
      survey,
      samples,
      target.participantCode
    );
    const interview = participant.interviews.find(
      i => i.nonce == target.nonce
    ) as Interview;

    if (isInterviewItemTarget(target)) {
      const item = interview.items.find(
        i => i.pageItem.variableName == target.variableName
      ) as InterviewItem;
      return await buildItemRecords(participant.sample, item, target, date);
    }
    if (isInterviewTarget(target)) {
      if (operations)
        return await buildInterviewSignedRecords(
          participant.sample,
          target,
          date,
          operations
        );
      return await buildInterviewRecords(participant.sample, interview, target, date);
    }
    if (isParticipantTarget(target)) {
      const participant = await this.drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        target.participantCode
      );
      const records = await buildParticipantRecords(
        participant.sample,
        participant,
        target,
        date
      );
      return records
        .filter(r =>
          target.variableName === null ? r.target.variableName == null : true
        )
        .filter(r => operations?.includes(r.operation) ?? true);
    }
    throw "invalid target";
  }
}

function buildParticipantRecords(
  sample: Sample,
  participant: Participant,
  target: { participantCode: string },
  date: number
) {
  const headRecords = [
    new AuditRecord(
      { participantCode: target.participantCode },
      sample.sampleCode,
      new Date(date - 5 * 3600 * 1000),
      "create",
      { email: "me@me.me" },
      henriette
    ),
    new AuditRecord(
      { participantCode: target.participantCode },
      sample.sampleCode,
      new Date(date - 4 * 3600 * 1000),
      "update",
      { phone: "0101010101" },
      henriette
    ),
  ];
  const tailRecords = participant.interviews
    .filter(i => i.items.find(isWeightVariable))
    .flatMap((i, x) =>
      buildInterviewRecords(
        sample,
        i,
        {
          participantCode: participant.participantCode,
          nonce: i.nonce,
        },
        date - (1 - x) * 3600 * 1000 + 60000
      )
    );
  return [...headRecords, ...tailRecords];
}

function buildInterviewRecords(
  sample: Sample,
  interview: Interview,
  target: { participantCode: string; nonce: number },
  date: number
) {
  const headRecord = new AuditRecord(
    target,
    sample.sampleCode,
    new Date(date - 4 * 3600 * 1000),
    "create",
    { nonce: target.nonce },
    henriette
  );
  const tailRecords = interview.items.filter(isWeightVariable).flatMap(i =>
    buildItemRecords(
      sample,
      i,
      {
        participantCode: target.participantCode,
        nonce: interview.nonce,
        variableName: i.pageItem.variableName,
      },
      date + 60000
    )
  );
  return [headRecord, ...tailRecords];
}

function buildInterviewSignedRecords(
  sample: Sample,
  target: { participantCode: string; nonce: number },
  date: number,
  operations: mlstring[]
) {
  return [
    ...operations.map(
      (operation, index) =>
        new AuditRecord(
          target,
          sample.sampleCode,
          new Date(date - 4 * 3600 * 1500 * index),
          operation,
          { nonce: target.nonce },
          henriette
        )
    ),
  ];
}

function buildItemRecords(
  sample: Sample,
  item: InterviewItem,
  target: { participantCode: string; nonce: number; variableName: string },
  date: number
) {
  if (
    (item.pageItem.variableName != "WEIGHT" &&
      item.pageItem.variableName != "POIDS") ||
    !item.value
  )
    return [];
  return [
    new AuditRecord(
      target,
      sample.sampleCode,
      new Date(date - 4 * 3600 * 1000),
      "create",
      { value: (item.value as number) - 1 },
      henriette
    ),
    new AuditRecord(
      target,
      sample.sampleCode,
      new Date(date - 3 * 3600 * 1000),
      "update",
      { value: undefined, specialValue: "unknown" },
      henriette
    ),
    new AuditRecord(
      target,
      sample.sampleCode,
      new Date(date - 2 * 3600 * 1000),
      "update",
      { value: item.value },
      henriette
    ),
  ];
}

function isWeightVariable(i: InterviewItem): unknown {
  return ["WEIGHT", "POIDS"].includes(i.pageItem.variableName);
}
