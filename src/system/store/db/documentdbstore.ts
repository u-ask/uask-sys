import { DocumentRow } from "./documentdb.js";
import { Survey } from "uask-dom";
import { Document, DocumentNode } from "../../../drivers/document.js";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { Drivers } from "./store.js";

export class DocumentStore {
  constructor(private readonly drivers: Drivers) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get save() {
    return this.drivers.documentDriver.save.bind(this.drivers.documentDriver);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get getContentByHash() {
    return this.drivers.documentDriver.getContentByHash.bind(
      this.drivers.documentDriver
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get deleteByHash() {
    return this.drivers.documentDriver.deleteByHash.bind(
      this.drivers.documentDriver
    );
  }

  async saveAll(survey: Survey, documents: Document[]): Promise<Keys[]> {
    return Promise.all(
      documents.map(async document => {
        const keys = await this.drivers.documentDriver.save(survey, document);
        document.update(keys);
        return keys;
      })
    );
  }

  async delete(hash: number, surveyKeys?: KeyMap): Promise<void> {
    if (!surveyKeys) throw "key missing in row";
    return this.drivers.documentDriver
      .deleteByHash(surveyKeys, hash)
      .catch(() => Promise.reject("document not found"));
  }

  async getNode(hash: number, surveyKeys?: KeyMap): Promise<DocumentNode> {
    if (!surveyKeys) throw "key missing in row";
    return this.drivers.documentDriver
      .getMetadataByHash(surveyKeys, hash)
      .then(async row => this.documentRowToNode(row))
      .catch(() => Promise.reject("document not found"));
  }

  async getNodes(surveyKeys?: KeyMap): Promise<DocumentNode[]> {
    if (!surveyKeys) throw "key missing in row";
    return this.drivers.documentDriver
      .getAll(surveyKeys)
      .then(rows =>
        Promise.all(rows.map(async r => this.documentRowToNode(r)))
      );
  }

  private async documentRowToNode(
    row: Keys & DocumentRow
  ): Promise<DocumentNode> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, title, tags, __keys__, hash, visibility, ...others } = row;
    return Object.assign(
      {
        name,
        title: JSON.parse(title as string),
        __keys__: __keys__ as KeyMap,
        hash,
        visibility: (visibility ? "survey" : "participant") as "survey" | "participant",
      },
      tags ? { tags: JSON.parse(tags as string) } : {}
    );
  }
}
