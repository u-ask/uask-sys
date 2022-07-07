import {
  DomainCollection,
  getTranslation,
  hasFixedLabels,
  hasPivot,
  IKPI,
  InclusionsBySamples,
  IParticipantSummary,
  ItemType,
  KPISet,
  mlstring,
  PageItem,
  PivotKpi,
  Sample,
  Survey,
  WithFixedLabels,
} from "uask-dom";
import { condStatTitle, condStatVariable, ISummaryDriver } from "./summary.js";
import { ISampleDriver } from "./sample.js";

type KpiLike = {
  variableName: string;
  kpi: mlstring;
  type: ItemType;
};

export interface IKpiDriver {
  getAll(survey: Survey, samples?: Sample[]): Promise<[IKPI[], KPISet]>;
}

export class KpiGenericDriver implements IKpiDriver {
  constructor(
    private readonly sampleDriver: ISampleDriver,
    private readonly summaryDriver: ISummaryDriver
  ) {}

  async getAll(survey: Survey, samples?: Sample[]): Promise<[IKPI[], KPISet]> {
    const summaries = await this.getAllSummaries(survey, samples);
    if (typeof samples == "undefined")
      samples = await this.sampleDriver.getAll(survey);

    const inclusionsBySamples = new InclusionsBySamples(
      survey,
      DomainCollection(...samples),
      DomainCollection(...summaries)
    );

    const kpiSet = new KPISet(survey, summaries, { sample: true });
    const itemStats = this.getKpis(survey).map(k =>
      kpiSet.variableNames.includes(k.variableName)
        ? kpiSet.getMatrix("@SAMPLE", k.variableName)
        : getKPIForUnknownConditional(survey, kpiSet, "@SAMPLE", k.variableName)
    );

    return [[inclusionsBySamples, ...itemStats], kpiSet];
  }

  private getKpis(
    survey: Survey
  ): { variableName: string; type: ItemType; kpi: mlstring }[] {
    const allKpis = survey.kpis.flatMap(item =>
      this.isPivotKpi(item)
        ? this.getPivotKpis(survey, item)
        : [item as { variableName: string; type: ItemType; kpi: mlstring }]
    );
    return [...allKpis].sort((a, b) => this.compateKpi(a, b));
  }

  private compateKpi(
    a: PageItem<"prototype"> | KpiLike,
    b: PageItem<"prototype"> | KpiLike
  ): number {
    const [variableName1, condValue1] = a.variableName.split("|");
    const [variableName2, condValue2] = b.variableName.split("|");
    if (!condValue1 && !condValue2)
      return variableName1.localeCompare(variableName2);
    if (condValue1 && condValue2) return condValue1.localeCompare(condValue2);
    if (condValue1) return condValue1.localeCompare(variableName2);
    if (condValue2) return variableName1.localeCompare(condValue2);
    return 0;
  }

  private isPivotKpi(item: PageItem<"prototype">) {
    return hasPivot(item.kpi) && hasFixedLabels(item.kpi.pivot.type);
  }

  private getPivotKpis(
    survey: Survey,
    item: PageItem
  ): { variableName: string; type: ItemType; kpi: mlstring }[] {
    const pivotKpi = item.kpi as PivotKpi;
    const pivotType = pivotKpi.pivot.type as ItemType & WithFixedLabels;
    return pivotType.labels.map(l => {
      const pivotValue = getTranslation(
        l,
        "__code__",
        survey.options.defaultLang
      );
      return {
        variableName: condStatVariable(
          item.variableName,
          pivotKpi.pivot.variableName,
          pivotValue
        ),
        type: item.type,
        kpi: condStatTitle(pivotKpi, survey.options, l),
      };
    });
  }

  private getAllSummaries(
    survey: Survey,
    samples: Sample[] | undefined
  ): Promise<IParticipantSummary[]> {
    if (typeof samples == "undefined") return this.getSummaries(survey);
    return Promise.all(samples.map(s => this.getSummaries(survey, s))).then(
      summaries => Array.prototype.concat([], ...summaries)
    );
  }

  private getSummaries(survey: Survey, sample?: Sample) {
    return this.summaryDriver.getAll(survey, sample, [
      "participantCode",
      "sampleCode",
      "currentInterview",
      "interviewCount",
      "pins",
      "alerts",
      "included",
      "kpis",
      "inclusionDate",
    ]) as Promise<IParticipantSummary[]>;
  }
}

export function getKPIForUnknownConditional(
  survey: Survey,
  kpiSet: KPISet,
  rowVariable: string,
  colVariable: string
): IKPI {
  const [mainVariable, condition] = colVariable.split("|");
  const [conditionalVariable, conditionalValue] = condition.split("=");
  if (mainVariable == colVariable) throw `unknown variable ${colVariable}`;
  const v = kpiSet.variableNames.find(v =>
    v.startsWith(`${mainVariable}|${conditionalVariable}`)
  ) as string;
  const m = kpiSet.getMatrix(rowVariable, v);
  return Object.assign(Object.create(Object.getPrototypeOf(m)), {
    columnSums: [m.columnSums[0].map(() => NaN)],
    rowSums: m.rowSums.map(() => [NaN]),
    datasource: {
      ...m.datasource,
      column: {
        ...m.datasource.column,
        variableName: colVariable,
      },
    },
    title: condStatTitle(
      survey.getItemForVariable(mainVariable)?.kpi as PivotKpi,
      survey.options,
      conditionalValue
    ),
    values: m.values.map(r => r.map(() => NaN)),
  });
}
