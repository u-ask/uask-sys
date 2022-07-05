import { Survey } from "uask-dom";
import { IDocumentDriver, IUserDriver } from "../../../drivers/index.js";
import { SurveyAuthorizationManager } from "./autz.js";
import { Document } from "../../../drivers/document.js";

export class DocumentAutzDriver implements IDocumentDriver {
  constructor(
    private readonly driver: IDocumentDriver,
    private readonly userDriver: IUserDriver,
    private readonly userid: string
  ) {}

  getByHash(survey: Survey, hash: number): Promise<Document> {
    return this.driver.getByHash(survey, hash);
  }

  getAll(survey: Survey): Promise<Document[]> {
    return this.driver.getAll(survey);
  }

  getContent(
    survey: Survey,
    hash: number
  ): Promise<{
    content: Uint8Array;
    name: string;
  }> {
    return this.driver.getContent(survey, hash);
  }

  async saveContent(
    survey: Survey,
    hash: number,
    content: Uint8Array
  ): Promise<void> {
    const caller = await this.userDriver.getByUserId(survey, [], this.userid);
    const document = await this.driver.getByHash(survey, hash);
    const am = new SurveyAuthorizationManager(survey, caller);
    if (!am.canSaveDocument(document))
      return Promise.reject(am.canSaveDocumentError(document));
    return this.driver.saveContent(survey, hash, content);
  }

  async delete(survey: Survey, hash: number): Promise<void> {
    const caller = await this.userDriver.getByUserId(survey, [], this.userid);
    const document = await this.driver.getByHash(survey, hash);
    const am = new SurveyAuthorizationManager(survey, caller);
    if (!am.canSaveDocument(document))
      return Promise.reject(am.canSaveDocumentError(document));
    return this.driver.delete(survey, hash);
  }

  async save(survey: Survey, document: Document): Promise<Partial<Document>> {
    const caller = await this.userDriver.getByUserId(survey, [], this.userid);
    const am = new SurveyAuthorizationManager(survey, caller);
    if (!am.canSaveDocument(document))
      return Promise.reject(am.canSaveDocumentError(document));
    return this.driver.save(survey, document);
  }
}
