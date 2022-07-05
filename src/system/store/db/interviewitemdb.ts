import { Knex } from "knex";
import { Interview, InterviewItem, Survey } from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { upsert } from "./upsert.js";

export type InterviewItemRow = {
  surveyId: number;
  participantId: number;
  interviewId: number;
  pageItemId: number;
  variableName: string;
  instance: number;
  messages: string;
  value: string;
  context: string;
  unit: string;
  specialValue: string;
  position: number;
};

export class InterviewItemDriver {
  get table(): Knex.QueryBuilder<InterviewItemRow> {
    return this.client.table<InterviewItemRow>("interviewItems");
  }

  constructor(private client: Knex) {}

  async save(
    survey: Survey,
    interview: Interview,
    interviewItem: InterviewItem,
    position: number
  ): Promise<Keys> {
    this.eagerSupport = undefined;
    const row = {
      pageItemId: interviewItem.pageItem.__keys__?.id,
      surveyId: survey.__keys__?.id,
      participantId: interview.__keys__?.participantId,
      interviewId: interview.__keys__?.id,
      instance: interviewItem.pageItem.instance || 1,
      value: JSON.stringify(interviewItem.value),
      context: JSON.stringify(interviewItem.context),
      unit: interviewItem.unit,
      specialValue: interviewItem.specialValue,
      messages: JSON.stringify(interviewItem.messages),
      position,
    };
    return upsert(this, row, ["interviewId", "pageItemId", "instance"]);
  }

  async delete(surveyKeys: KeyMap, interviewKeys: KeyMap[]): Promise<void> {
    await this.client
      .table("interviewItems")
      .whereIn(
        "interviewId",
        interviewKeys.map(k => k.id)
      )
      .delete();
  }

  private eagerSupport: EagerSupport | undefined;
  async getRowsByInterview(
    surveyKeys: KeyMap,
    interviewKey: KeyMap
  ): Promise<(Keys & InterviewItemRow)[]> {
    if (
      this.eagerSupport == undefined ||
      this.eagerSupport.participantId != interviewKey.participantId
    ) {
      this.eagerSupport = new EagerSupport(
        interviewKey.participantId,
        surveyKeys.version,
        this.client
      );
    }
    const rows = (await this.eagerSupport.get(interviewKey.id)) as Keys &
      InterviewItemRow[];
    return rows.map(r =>
      Object.assign(r, {
        __keys__: {
          interviewId: r.interviewId,
          pageItemId: r.pageItemId,
          instance: r.instance,
          surveyId: r.surveyId,
          participantId: r.participantId,
        },
      })
    );
  }
}

class EagerSupport {
  private readonly rows: Promise<Map<number, InterviewItemRow[]>>;
  constructor(readonly participantId: number, version: number, client: Knex) {
    const query = client
      .table("interviewItems")
      .where("interviewItems.participantId", participantId)
      .join("pageItems", "interviewItems.pageItemId", "pageItems.id")
      .where("pageItems.version", ">=", version)
      .whereExists(function () {
        this.table("interviews")
          .innerJoin(
            "pageSetPages",
            "interviews.pageSetId",
            "pageSetPages.pageSetId"
          )
          .innerJoin("includes", "pageSetPages.pageId", "includes.pageId")
          .where("includes.version", ">=", version)
          .whereRaw('interviews.id = "interviewItems"."interviewId"')
          .whereRaw('includes."pageItemId" = "pageItems".id')
          .select(1);
      })
      .select<InterviewItemRow[]>("interviewItems.*", "pageItems.variableName")
      .orderBy(["interviewItems.position", "interviewItems.instance"]);
    this.rows = query.then(r => {
      const acc = new Map<number, InterviewItemRow[]>();
      return r.reduce((acc, i) => {
        const group = acc.get(i.interviewId);
        if (group) group.push(i);
        else acc.set(i.interviewId, [i]);
        return acc;
      }, acc);
    });
  }

  async get(id: number) {
    return (await this.rows).get(id) ?? [];
  }
}
