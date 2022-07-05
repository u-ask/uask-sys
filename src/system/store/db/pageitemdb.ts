import { Knex } from "knex";
import { PageItem, GlobalScope, Survey, Sample, hasPivot } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { ItemTypeDriver } from "./itemtypedb.js";
import { upsert } from "./upsert.js";
import { KeyMap } from "../../aspect/keys.js";

export type PageItemRow = {
  version: number;
  wording: string;
  variableName: string;
  surveyId: number;
  typeId: number;
  typeArgs: string;
  units: string;
  comment: string;
  defaultValue: string;
  section: string;
  pin: string;
  kpi: string;
  array: boolean;
  position: number;
  id: number;
};

type ItemDef = {
  id: number;
  variableName: string;
};

export class PageItemDriver {
  get table(): Knex.QueryBuilder<PageItemRow> {
    return this.client.table<PageItemRow>("pageItems");
  }

  constructor(private client: Knex) {}

  private static globalInitializer: Promise<PageItem[]>;

  static async initGlobalItems(client: Knex): Promise<void> {
    if (typeof this.globalInitializer == "undefined") {
      const driver = new PageItemDriver(client);
      this.globalInitializer = driver.getGlobals();
    }
    await this.globalInitializer;
  }

  getGlobals(): Promise<PageItem[]> {
    return this.client
      .table("pageItems")
      .whereNull("surveyId")
      .select<ItemDef[]>("id", "variableName")
      .then(def => this.mergeGlobals(def));
  }

  private mergeGlobals(def: ItemDef[]): Promise<PageItem[]> {
    return Promise.all(
      new GlobalScope({ lastInput: new Date(), sample: new Sample("") }).items
        .map(i => i.pageItem)
        .map(i => this.mergeGlobal(i, def))
    );
  }

  private async mergeGlobal(
    pageItem: PageItem,
    result: { variableName: string; id: number }[]
  ): Promise<PageItem> {
    const entry = result.find(r => r.variableName == pageItem.variableName);
    if (entry) {
      pageItem.update({ __keys__: { id: entry.id }, __untrack__: true });
    } else {
      const keyInfo = await this.save(
        <Survey>{ __keys__: {} },
        <PageItem>{
          ...pageItem,
          __keys__: {},
        }
      );
      pageItem.update(keyInfo);
    }
    return pageItem;
  }

  async save(survey: Survey, pageItem: PageItem): Promise<Keys> {
    this.eagerSupport = undefined;
    const { name, ...typeArgs } = pageItem.type;
    const type = await new ItemTypeDriver(this.client).getByName(name);
    const row = {
      id: pageItem.__keys__?.id,
      version: survey.__keys__?.version ?? 1,
      surveyId: survey.__keys__?.id,
      wording: JSON.stringify(pageItem.wording),
      variableName: pageItem.variableName,
      typeId: type.id,
      typeArgs: JSON.stringify(typeArgs),
      units: JSON.stringify(pageItem.units),
      comment: JSON.stringify(pageItem.comment),
      section: JSON.stringify(pageItem.section),
      pin: JSON.stringify(pageItem.pin),
      kpi: JSON.stringify(
        hasPivot(pageItem.kpi)
          ? {
              title: pageItem.kpi.title,
              pivot: pageItem.kpi.pivot.variableName,
            }
          : pageItem.kpi
      ),
      array: pageItem.array,
    };
    return upsert(this, row, ["id"]);
  }

  private eagerSupport: EagerSupport | undefined;
  async getRowById(key: KeyMap): Promise<Keys & PageItemRow> {
    if (
      this.eagerSupport == undefined ||
      this.eagerSupport.surveyId != key.surveyId
    ) {
      this.eagerSupport = new EagerSupport(key.surveyId, this.client);
    }
    const row = (await this.eagerSupport.get(key.id)) as Keys & PageItemRow;
    return Object.assign(row, {
      __keys__: { id: row.id, version: row.version, surveyId: row.surveyId },
    });
  }
}

class EagerSupport {
  private readonly rows: Promise<Map<number, PageItemRow>>;
  constructor(readonly surveyId: number, client: Knex) {
    this.rows = client
      .table("pageItems")
      .where("surveyId", surveyId)
      .then(result => new Map(result.map(r => [r.id, r])));
  }

  async get(id: number) {
    return (await this.rows).get(id);
  }
}
