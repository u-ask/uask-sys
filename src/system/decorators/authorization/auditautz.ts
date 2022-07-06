import { mlstring, Survey } from "uask-dom";
import {
  AuditRecord,
  IAuditDriver,
  ISampleDriver,
  IUserDriver,
} from "../../../drivers/index.js";
import { AuditableRef } from "../../../drivers/audit.js";
import { SurveyAuthorizationManager } from "./autz.js";

export class AuditAutzDriver implements IAuditDriver {
  constructor(
    private readonly driver: IAuditDriver,
    private readonly sampleDriver: ISampleDriver,
    private readonly userDriver: IUserDriver,
    private readonly userid: string
  ) {}

  async get(
    survey: Survey,
    target: AuditableRef,
    operations?: mlstring[]
  ): Promise<AuditRecord[]> {
    const records = await this.driver.get(survey, target, operations);
    if (records.length > 0) {
      const user = await this.userDriver.getByUserId(survey, this.userid);
      const am = new SurveyAuthorizationManager(survey, user);
      if (!am.canReadSample(records[0].sampleCode))
        return Promise.reject(am.canReadSampleError(records[0].sampleCode));
    }
    return records;
  }
}
