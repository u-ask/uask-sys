import { Knex } from "knex";
import { Survey } from "uask-dom";
import { Document } from "../../../drivers/document.js";
import { Keys } from "../../aspect/index.js";
import { upsert } from "./upsert.js";
import { KeyMap } from "../../aspect/keys.js";

export type DocumentRow = {
  surveyId: number;
  hash: number;
  title: string;
  name: string;
  tags: string;
  visibility: boolean;
};

export class DocumentDriver {
  constructor(private client: Knex) {}

  get table(): Knex.QueryBuilder<DocumentRow> {
    return this.client.table<DocumentRow>("documents");
  }

  async save(survey: Survey, document: Document): Promise<Keys> {
    if (!survey.__keys__) throw "missing survey key";
    const surveyId = survey.__keys__.id;
    const row = {
      name: document.name,
      hash: document.hash,
      title: JSON.stringify(document.title),
      tags: JSON.stringify(document.tags),
      content: document.content,
      visibility: document.visibility == "survey",
      surveyId,
    };
    const u = await upsert(this, row, ["surveyId", "hash"]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __untrack__, ...others } = u;
    return others;
  }

  async getMetadataByHash(
    surveyKey: KeyMap,
    hash: number
  ): Promise<Keys & DocumentRow> {
    const row = await this.client
      .table("documents")
      .select("surveyId", "hash", "name", "title", "tags", "visibility")
      .where("surveyId", surveyKey.id)
      .where("hash", hash)
      .first();
    return Object.assign(row, {
      __keys__: { surveyId: row.surveyId, hash: row.hash },
    });
  }

  async getContentByHash(
    surveyKey: KeyMap,
    hash: number
  ): Promise<{
    content: Uint8Array;
    name: string;
  }> {
    return await this.client
      .table("documents")
      .select("content", "name")
      .where("surveyId", surveyKey.id)
      .where("hash", hash)
      .first();
  }

  async getAll(surveyKey: KeyMap): Promise<(Keys & DocumentRow)[]> {
    const rows = await this.client
      .table("documents")
      .where("surveyId", surveyKey.id)
      .andWhere("visibility", true);
    return rows.map(row =>
      Object.assign(row, {
        __keys__: { surveyId: row.surveyId, hash: row.hash },
      })
    );
  }

  async deleteByHash(surveyKey: KeyMap, hash: number): Promise<void> {
    await this.client
      .table("documents")
      .where("surveyId", surveyKey.id)
      .where("hash", hash)
      .delete();
  }
}
