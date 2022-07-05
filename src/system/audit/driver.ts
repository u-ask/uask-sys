import { Knex } from "knex";
import { mlstring, Survey } from "uask-dom";
import { IAuditDriver } from "../../drivers/index.js";
import { AuditableRef, AuditRecord } from "../../drivers/audit.js";
import "../aspect/index.js";

export class AuditDbDriver implements IAuditDriver {
  constructor(private client: Knex) {}

  async get(
    survey: Survey,
    target: AuditableRef,
    operations?: mlstring[]
  ): Promise<AuditRecord[]> {
    const where = Object.assign(
      {
        "audit_participants.surveyId": survey.__keys__?.id,
        participantCode: target.participantCode,
      },
      target.nonce !== undefined ? { nonce: target.nonce } : {},
      target.variableName !== undefined
        ? { variableName: target.variableName }
        : {},
      target.instance !== undefined
        ? {
            "audit_participants.instance": target.instance,
            "interviewItems.instance": target.instance,
          }
        : {}
    );
    const result = await this.client
      .table("audit_participants")
      .innerJoin(
        "participants",
        "participants.id",
        "audit_participants.participantId"
      )
      .innerJoin("samples", "samples.id", "participants.sampleId")
      .leftOuterJoin(
        "interviews",
        "interviews.id",
        "audit_participants.interviewId"
      )
      .leftOuterJoin("interviewItems", function () {
        this.on(
          "interviewItems.interviewId",
          "audit_participants.interviewId"
        ).andOn("interviewItems.pageItemId", "audit_participants.pageItemId");
      })
      .leftOuterJoin(
        "pageItems",
        "pageItems.id",
        "audit_participants.pageItemId"
      )
      .where(function () {
        if (operations) {
          return this.where(where).whereIn(
            "operation",
            operations.map(o => JSON.stringify(o))
          );
        }
        return this.where(where);
      })
      .select([
        "audit_participants.*",
        "sampleCode",
        "participantCode",
        "nonce",
        "variableName",
      ])
      .orderBy("audit_participants.id");
    return result.map(r => {
      return new AuditRecord(
        {
          participantCode: r.participantCode,
          ...(r.nonce ? { nonce: r.nonce } : {}),
          ...(r.variableName ? { variableName: r.variableName } : {}),
          ...(r.instance ? { instance: r.instance } : {}),
        },
        r.sampleCode,
        r.date,
        JSON.parse(r.operation as "create" | "update"),
        JSON.parse(r.payload),
        r.userId
      );
    });
  }
}
