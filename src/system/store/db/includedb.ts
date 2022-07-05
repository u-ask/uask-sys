import { Knex } from "knex";
import {
  getItem,
  getItemContext,
  Library,
  Page,
  PageItem,
  Survey,
} from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { upsertChilds } from "./upsert.js";

export type IncludeRow = {
  surveyId: number;
  pageId: number;
  includedPageId: number | undefined;
  pageItemId: number;
  context: string;
  position: number;
  variableName: string;
  id: number;
  version: number;
};

export type LibraryRow = {
  surveyId: number;
  pageId: number;
  includedPageId: number;
  pageItemIds: number[];
  contexts: [number, string][];
  position: number;
  variableNames: string[];
};

export function isLibraryRow(o: IncludeRow | LibraryRow): o is LibraryRow {
  return "pageItemIds" in o;
}

export class IncludeDriver {
  get childTable(): Knex.QueryBuilder<IncludeRow> {
    return this.client.table<IncludeRow>("includes");
  }

  constructor(private client: Knex) {}

  async save(
    survey: Survey,
    page: Page,
    include: Library | PageItem,
    pos: number
  ): Promise<void> {
    this.eagerSupport = undefined;
    if (include instanceof PageItem) {
      const row = {
        surveyId: survey.__keys__?.id,
        version: survey.__keys__?.version ?? 1,
        pageId: page.__keys__?.id,
        pageItemId: include.__keys__?.id,
        includedPageId: page.__keys__?.id,
        position: pos * 10000,
      };
      await upsertChilds(
        this,
        [row],
        ["surveyId", "pageId", "includedPageId", "pageItemId"]
      );
    } else {
      const library = include.items.map((item, x) => ({
        surveyId: survey.__keys__?.id,
        version: survey.__keys__?.version ?? 1,
        pageId: page.__keys__?.id,
        pageItemId: getItem(item).__keys__?.id,
        includedPageId: include.page.__keys__?.id,
        position: pos * 10000 + x,
        context: getItemContext(item)
          ? JSON.stringify(getItemContext(item))
          : undefined,
      }));
      await upsertChilds(
        this,
        [...library],
        ["surveyId", "pageId", "includedPageId", "pageItemId"]
      );
    }
  }

  private eagerSupport: EagerSupport | undefined;
  async getRowByPage(pageKey: KeyMap): Promise<(Keys & IncludeRow)[]> {
    if (
      this.eagerSupport == undefined ||
      this.eagerSupport.surveyId != pageKey.surveyId
    ) {
      this.eagerSupport = new EagerSupport(pageKey.surveyId, this.client);
    }
    const rows = (await this.eagerSupport.getByPageId(pageKey.id)) as (Keys &
      IncludeRow)[];
    return rows.map(r =>
      Object.assign(
        r,
        r.pageId == r.includedPageId ? { includedPageId: undefined } : {},
        { __keys__: { id: r.id, version: r.version, surveyId: r.surveyId } }
      )
    );
  }
}

class EagerSupport {
  private readonly rows: Promise<(Keys & IncludeRow & { pageId: number })[]>;
  constructor(readonly surveyId: number, client: Knex) {
    const q = client
      .table("includes")
      .join("pageItems", "includes.pageItemId", "pageItems.id")
      .where("pageItems.surveyId", surveyId)
      .where("includes.version", client.ref("pageItems.version"))
      .select("includes.*", "pageItems.variableName")
      .orderBy("position");
    this.rows = q.then(r => [...r]);
  }

  async getByPageId(pageId: number) {
    return (await this.rows).filter(r => r.pageId == pageId);
  }
}
