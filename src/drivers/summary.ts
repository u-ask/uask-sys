import {
  DomainCollection,
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  Sample,
  Survey,
  getItemType,
  getItemWording,
  Workflow,
  Page,
  mlstring,
  IParticipantSummary,
  ItemJson,
  PivotKpi,
  hasFixedLabels,
  isML,
  getTranslation,
  isMLstring,
  SurveyOptions,
  Item,
  getItem,
} from "uask-dom";
import { IParticipantDriver, ParticipantGetOptions } from "./participant.js";
import { ISampleDriver } from "./sample.js";
import { pick } from "../system/json/pick.js";

import { Json } from "./types.js";

export class ParticipantSummary implements IParticipantSummary {
  readonly participantCode: string;
  readonly sampleCode: string;
  readonly currentInterview: Json | undefined;
  readonly interviewCount: number;
  readonly pins: ItemJson;
  readonly kpis: ItemJson;
  readonly alerts: IDomainCollection<Json>;
  readonly included: boolean;
  readonly inclusionDate: Date | undefined;

  constructor(survey: Survey, summary: Record<string, unknown>);
  constructor(survey: Survey, participant: Participant, workflow?: Workflow);
  constructor(
    private survey: Survey,
    x: Record<string, unknown> | Participant,
    workflow?: Workflow
  ) {
    Object.defineProperty(this, "survey", { enumerable: false });
    if (x instanceof Participant) {
      this.participantCode = x.participantCode;
      this.sampleCode = x.sample.sampleCode;
      const interview = x.currentInterview(workflow as Workflow);
      this.currentInterview = this.interviewSummary(x, interview);
      this.interviewCount = x.interviews.length;
      this.pins = this.itemMap(
        x.currentItems(survey.pins).filter((i): i is InterviewItem => !!i)
      ) as ItemJson;
      this.kpis = this.kpiMap(
        x.interviews.flatMap(i => i.kpis),
        survey.options
      ) as ItemJson;
      this.alerts = x.alerts
        .filter(a =>
          a.item ? a.interview.pageSet.getPagesForItem(a.item).length > 0 : true
        )
        .map(a => ({
          message: a.message,
          interview: this.interviewSummary(x, a.interview),
          page: this.pageSummary(a.interview, a.item ?? (a.page as Page)),
          item: a.item ? this.itemSummary(a.item) : undefined,
          type: a.type,
          tags: a.tags,
        }));
      this.included = x.included;
      this.inclusionDate = x.inclusionDate;
    } else {
      this.participantCode = x.participantCode as string;
      this.sampleCode = x.sampleCode as string;
      this.currentInterview = this.currentInterview as Json;
      this.interviewCount = x.interviewCount as number;
      this.pins = x.pins as ItemJson;
      this.kpis = x.kpis as ItemJson;
      this.alerts = DomainCollection(...(x.alerts as Json[]));
      this.inclusionDate = new Date(x.inclusionDate as number);
      this.included = x.included as boolean;
    }
    Object.freeze(this);
  }
  private interviewSummary(participant: Participant, interview: Interview) {
    if (!interview) return {};
    return {
      type: interview.pageSet.type,
      status: interview.status,
      date: interview.date,
      index: participant.interviews.indexOf(interview) + 1,
      fillRate: interview.fillRate,
    };
  }

  private itemMap(items: IDomainCollection<InterviewItem>) {
    return items.reduce((r, i) => {
      const { variableName, ...item } = this.itemSummary(i);
      return {
        ...r,
        [variableName]: item,
      };
    }, {} as Json);
  }

  private kpiMap(
    kpis: IDomainCollection<InterviewItem | [InterviewItem, InterviewItem]>,
    options: SurveyOptions
  ) {
    return kpis.reduce(
      (r, i) =>
        this.isPivotKpi(i) ? this.pivotKpi(r, options, i) : this.kpi(r, i),
      {}
    ) as ItemJson;
  }

  private isPivotKpi(
    i: InterviewItem | [InterviewItem, InterviewItem]
  ): i is [InterviewItem, InterviewItem] {
    return Array.isArray(i) && hasFixedLabels(i[1].type);
  }

  private kpi(
    r: ItemJson,
    i: InterviewItem | [InterviewItem, InterviewItem]
  ): ItemJson {
    i = i instanceof InterviewItem ? i : i[0];
    const { variableName, ...item } = this.itemSummary(i);
    return {
      ...r,
      [variableName]: item,
    } as ItemJson;
  }

  private pivotKpi(
    r: ItemJson,
    options: SurveyOptions,
    i: [InterviewItem, InterviewItem]
  ) {
    const [kpi, pivot] = i;
    const { variableName, ...item } = this.itemSummary(kpi);
    const pivotVariable = pivot.pageItem.variableName;
    const pivotValue = pivot.value;
    return {
      ...r,
      [condStatVariable(variableName, pivotVariable, pivotValue)]: {
        ...item,
        kpi: condStatTitle(kpi.pageItem.kpi as PivotKpi, options, pivotValue),
      },
    };
  }

  private pageSummary(
    interview: Interview,
    x: Page | Item
  ): { name: mlstring; index: number } {
    const page =
      x instanceof Page ? x : interview.pageSet.getPagesForItem(x)[0];
    const px = interview.pageSet.pages.indexOf(page);
    return {
      name: page.name,
      index: px + 1,
    };
  }

  private itemSummary(item: Item) {
    const pageItem = getItem(item);
    return {
      wording: getItemWording(item),
      variableName: pageItem.variableName,
      type: pick(getItemType(item)),
      value: item instanceof InterviewItem ? item.value : undefined,
      specialValue:
        item instanceof InterviewItem ? item.specialValue : undefined,
      pin: pageItem.pin,
      kpi: pageItem.kpi,
    };
  }
}

export interface ISummaryDriver {
  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<ParticipantSummary[]>;
  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    select?: (keyof ParticipantSummary)[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Partial<ParticipantSummary>[]>;
}

export class SummaryGenericDriver implements ISummaryDriver {
  constructor(
    private readonly participantDriver: IParticipantDriver,
    private readonly sampleDriver: ISampleDriver
  ) {}

  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    options?: Partial<ParticipantGetOptions>
  ): Promise<ParticipantSummary[]>;
  getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    select?: (keyof ParticipantSummary)[],
    options?: Partial<ParticipantGetOptions>
  ): Promise<Partial<ParticipantSummary>[]>;
  async getParticipantSummaries(
    survey: Survey,
    sample?: Sample,
    x?: (keyof ParticipantSummary)[] | Partial<ParticipantGetOptions>,
    options?: Partial<ParticipantGetOptions>
  ): Promise<Partial<ParticipantSummary>[]> {
    const select = Array.isArray(x) ? x : [];
    options = Array.isArray(x) ? options : x;
    const config = { ...new ParticipantGetOptions(), limit: 20, ...options };

    const participants = await this.getParticipants(survey, sample, config);

    const summaries = participants.map(
      p => new ParticipantSummary(survey, p, survey.mainWorkflow)
    );

    return select.length > 0
      ? summaries.map(p => select.reduce((s, q) => ({ ...s, [q]: p[q] }), {}))
      : summaries;
  }

  private async getParticipants(
    survey: Survey,
    sample?: Sample,
    options?: ParticipantGetOptions
  ) {
    return sample
      ? await this.participantDriver.getBySample(survey, sample, options)
      : await this.participantDriver.getAll(
          survey,
          await this.sampleDriver.getAll(survey),
          options
        );
  }
}

export function condStatVariable(
  variableName: string,
  pivotVarName: string,
  pivotValue: unknown
): string {
  return `${variableName}|${pivotVarName}=${pivotValue}`;
}

export function condStatTitle(
  kpi: PivotKpi,
  options: SurveyOptions,
  condValue: unknown
): mlstring {
  const title = isML(kpi.title)
    ? kpi.title
    : { [options.defaultLang ?? "en"]: kpi.title };
  return Object.entries(title).reduce((r, [lang, title]) => {
    const label =
      isMLstring(condValue) && isML(condValue)
        ? getTranslation(condValue, lang)
        : kpi.pivot.type.label(condValue, lang);
    return {
      ...r,
      [lang]: buildTitle(title, kpi, label ?? String(condValue)),
    };
  }, {});
}
function buildTitle(title: string, kpi: PivotKpi, label: string | undefined) {
  if (title.includes("${value}"))
    return title.replace("${value}", String(label));
  return `${title}|${kpi.pivot.variableName}=${label}`;
}
