import test from "tape";
import { InterviewItem } from "uask-dom";
import { AuditRecord, IDrivers } from "../index.js";

export async function testInterviewItemCodeAudit(
  drivers: IDrivers,
  t: test.Test
): Promise<void> {
  const { survey, participant, interview, interviewItem } = await setUp(
    drivers
  );
  const codes = {
    participantCode: participant.participantCode,
    nonce: interview.nonce,
    variableName: interviewItem.pageItem.variableName,
    instance: interviewItem.pageItem.instance,
  };
  const records = await drivers.auditDriver.get(survey, codes);
  testInterviewItemAuditRecords(t, records);
}

export async function testInterviewCodeAudit(
  drivers: IDrivers,
  t: test.Test
): Promise<void> {
  const { survey, participant, interview } = await setUp(drivers);
  const codes = {
    participantCode: participant.participantCode,
    nonce: interview.nonce,
  };
  const records = await drivers.auditDriver.get(survey, codes);
  testInterviewAuditRecords(t, records);
}

export async function testParticipantCodeAudit(
  drivers: IDrivers,
  t: test.Test
): Promise<void> {
  const { survey, participant } = await setUp(drivers);
  const codes = {
    participantCode: participant.participantCode,
  };
  const records = await drivers.auditDriver.get(survey, codes);
  testParticipantAuditRecords(t, records);
}

export async function testParticipantInterviewsAudit(
  drivers: IDrivers,
  t: test.Test
): Promise<void> {
  const { survey, participant } = await setUp(drivers);
  const records = await drivers.auditDriver.get(
    survey,
    {
      participantCode: participant.participantCode,
      variableName: null,
    },
    ["create"]
  );
  t.deepEqual(
    records.map(a => a.operation),
    ["create", "create", "create"]
  );
  t.deepEqual(
    records.map(r => r.target.variableName),
    [undefined, undefined, undefined]
  );
  t.deepEqual(
    records.map(r => r.target.nonce),
    [undefined, records[1].target.nonce, records[2].target.nonce]
  );
  t.deepEqual(
    records.map(r => r.target.participantCode),
    [
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
    ]
  );
}

async function setUp(drivers: IDrivers) {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participant = await drivers.participantDriver.getByParticipantCode(
    survey,
    samples,
    "000001"
  );
  const interview = participant.interviews[1];
  const interviewItem = interview.items.find(
    i => i.pageItem.variableName == "WEIGHT"
  ) as InterviewItem;
  return { survey, participant, interview, interviewItem };
}

export function testInterviewItemAuditRecords(
  t: test.Test,
  records: AuditRecord[]
): void {
  t.deepEqual(
    records.map(a => a.operation),
    ["create", "update", "update"]
  );
  t.deepEqual(
    records.map(a => a.changes.value),
    [64, undefined, 65]
  );
  t.deepEqual(
    records.map(a => a.changes.specialValue),
    [undefined, "unknown", undefined]
  );
  t.deepEqual(
    records.map(r => r.target.variableName),
    ["WEIGHT", "WEIGHT", "WEIGHT"]
  );
  t.deepEqual(
    records.map(r => r.target.instance),
    [1, 1, 1]
  );
}

export function testInterviewAuditRecords(
  t: test.Test,
  records: AuditRecord[]
): void {
  t.deepEqual(
    records.map(a => a.operation),
    ["create", "create", "update", "update"]
  );
  t.deepEqual(
    records.map(r => r.target.variableName),
    [undefined, "WEIGHT", "WEIGHT", "WEIGHT"]
  );
  t.deepEqual(
    records.map(r => r.target.nonce),
    [
      records[0].target.nonce,
      records[0].target.nonce,
      records[0].target.nonce,
      records[0].target.nonce,
    ]
  );
}

export function testParticipantAuditRecords(
  t: test.Test,
  records: AuditRecord[]
): void {
  t.deepEqual(
    records.map(a => a.sampleCode),
    ["001", "001", "001", "001", "001", "001", "001", "001", "001", "001"]
  );
  t.deepEqual(
    records.map(a => a.operation),
    [
      "create",
      "update",
      "create",
      "create",
      "update",
      "update",
      "create",
      "create",
      "update",
      "update",
    ]
  );
  t.deepEqual(
    records.map(r => r.target.variableName),
    [
      undefined,
      undefined,
      undefined,
      "WEIGHT",
      "WEIGHT",
      "WEIGHT",
      undefined,
      "WEIGHT",
      "WEIGHT",
      "WEIGHT",
    ]
  );
  t.deepEqual(
    records.map(r => r.target.nonce),
    [
      undefined,
      undefined,
      records[2].target.nonce,
      records[2].target.nonce,
      records[2].target.nonce,
      records[2].target.nonce,
      records[6].target.nonce,
      records[6].target.nonce,
      records[6].target.nonce,
      records[6].target.nonce,
    ]
  );
  t.deepEqual(
    records.map(r => r.target.participantCode),
    [
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
      records[0].target.participantCode,
    ]
  );
}
