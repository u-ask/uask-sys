import { Got } from "got";
import { mlstring, Survey } from "uask-dom";
import { IAuditDriver } from "../drivers/index.js";
import { AuditableRef, AuditRecord } from "../drivers/audit.js";
import { handleClientError } from "../system/errors.js";

export class AuditWebDriver implements IAuditDriver {
  constructor(private client: Got) {}
  async get(
    survey: Survey,
    target: AuditableRef,
    operations?: mlstring[]
  ): Promise<AuditRecord[]> {
    const query =
      "query ($survey: String!,$participant: String!,$nonce: BigInt,$variableName: String,$instance: Int, $operations:[Json!]){auditRecords(survey:$survey,participantCode:$participant,nonce:$nonce,variableName:$variableName,instance:$instance,operations:$operations)}";
    const variables = JSON.stringify({
      survey: survey.name,
      participant: target.participantCode,
      nonce: target.nonce,
      variableName: target.variableName,
      instance: target.instance,
      operations,
    });
    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { auditRecords: AuditRecord[] } }>()
      .then(response =>
        response.data.auditRecords.map(rec =>
          Object.assign(Object.create(AuditRecord.prototype), {
            ...rec,
            date: new Date(rec.date),
          })
        )
      )
      .catch(async error => await handleClientError(error));
  }
}
