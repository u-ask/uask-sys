import ejs from "ejs";
import {
  ChoiceType,
  DateType,
  getItem,
  getItemContext,
  getTranslation,
  hasFixedLabels,
  InfoType,
  Interview,
  InterviewItem,
  ItemType,
  Metadata,
  mlstring,
  PageBuilder,
  PageItem,
  PageItemBuilder,
  PageSet,
  Participant,
  Sample,
  Survey,
  SurveyBuilder,
  TimeType,
  WithFixedLabels,
} from "uask-dom";
import { surveyDeserialize, surveySerialize } from "../../system/json/index.js";

const annotationTemplate = `<div class="annotation">
  <span class="annotation variable"><%=variableName%></span>
  <span class="annotation type"><%=annotation%></span>
</div>
<div class="mask"><%-mask%></div>`;

const rawValueTemplate = `<span class="annotation raw-value">(<%=raw%>)</span>`;
const labelTemplate = `<span class="label box"><%=box%></span> <%-label%>`;

export function blank(survey: Survey): Participant {
  const modifiedSurvey = special(survey, pi =>
    pi.update({
      type: new WrappedType(pi.type),
    })
  );
  return makeParticipant(modifiedSurvey, "blank0000000000");
}

export function annotated(survey: Survey): Participant {
  const modifiedSurvey = special(survey, pi =>
    pi.update({
      type: new WrappedAnnotatedType(pi, new Metadata(pi, survey.rules)),
    })
  );
  return makeParticipant(modifiedSurvey, "annotated0000000000");
}

function makeParticipant(survey: Survey, participantCode: string): Participant {
  return new Participant(participantCode, new Sample(""), {
    interviews: survey.pageSets.map(pageSet => makeInterview(survey, pageSet)),
  });
}

function makeInterview(survey: Survey, pageSet: PageSet) {
  return new Interview(pageSet, survey.options, {
    items: pageSet.items.map(
      item =>
        new InterviewItem(getItem(item), undefined, {
          context: getItemContext(item),
        })
    ),
  });
}

export function reword(
  wording: mlstring | mlstring[],
  annotation: string,
  rewordOptions = { newline: true }
): mlstring | mlstring[] {
  if (typeof wording == "string") return formatWording(wording);
  if (!Array.isArray(wording))
    return Object.entries(wording).reduce((result, [lang, w]) => {
      return { ...result, [lang]: formatWording(w) };
    }, {} as Record<string, string>) as mlstring;
  return wording.map(w => reword(w, annotation) as mlstring);

  function formatWording(w: string): string {
    return `${w}${rewordOptions.newline ? "<br>" : " "}${annotation}`;
  }
}

export function special(
  survey: Survey,
  transform: (pi: PageItem) => PageItem
): Survey {
  const json = surveySerialize(survey);
  const builder = new WrappedSurveyBuilder(transform);
  surveyDeserialize(builder, json);
  return builder.build();
}

export class WrappedType implements ItemType {
  name: string;
  nature?: "categorical" | "numerical" | undefined;
  labels?: mlstring[];

  constructor(private readonly type: ItemType) {
    this.name = type.name;
    this.nature = type.nature;
    if (hasFixedLabels(type)) this.labels = type.labels;
  }

  label(value: unknown, lang?: string): string | undefined {
    return mask(this.type, lang);
  }

  rawValue(value: unknown): string | number | undefined {
    return this.type.rawValue(value);
  }

  typedValue(value: unknown, ctx?: unknown): unknown {
    return this.type.typedValue(value, ctx);
  }
}

export class WrappedAnnotatedType implements ItemType {
  name: string;
  nature?: "categorical" | "numerical" | undefined;
  labels?: mlstring[];

  constructor(
    private readonly pageItem: PageItem,
    private readonly metadata: Metadata
  ) {
    this.name = pageItem.type.name;
    this.nature = pageItem.type.nature;
    if (hasFixedLabels(pageItem.type)) this.labels = pageItem.type.labels;
  }

  label(value: unknown, lang?: string): string | undefined {
    const data = {
      variableName: this.pageItem.variableName,
      annotation: this.annotation,
      mask: mask(this.pageItem.type, lang, { displayRaw: true }),
    };
    return ejs.render(annotationTemplate, data);
  }

  private get annotation(): string {
    const annotations = [...(this.metadata.properties as string[])];
    if (this.metadata.required) annotations.push(`required`);
    if (this.metadata.maxLength != undefined)
      annotations.push(`max length=${this.metadata.maxLength}`);
    if (this.metadata.fixedLength != undefined)
      annotations.push(`length=${this.metadata.fixedLength}`);
    if (this.metadata.range != undefined)
      annotations.push(`${this.metadata.range}`);
    if (this.metadata.precision != undefined)
      annotations.push(`precision=${this.metadata.precision}`);
    if (this.metadata.letterCase != undefined)
      annotations.push(`${this.metadata.letterCase} case`);
    return annotations.join(" ");
  }

  rawValue(value: unknown): string | number | undefined {
    return this.pageItem.type.rawValue(value);
  }

  typedValue(value: unknown, ctx?: unknown): unknown {
    return this.pageItem.type.typedValue(value, ctx);
  }
}

function mask(
  type: ItemType,
  lang: string | undefined,
  maskOptions = { displayRaw: false }
) {
  if (type instanceof InfoType) return "";
  if (hasFixedLabels(type)) return maskForLabels(type, lang, maskOptions);
  if (type instanceof DateType || type instanceof TimeType)
    return maskForDateTime(type);
  return "______________";
}

function maskForDateTime(type: DateType | TimeType) {
  const b = "__";
  const s = String.fromCharCode(0x2012);
  const bb = `${b} ${b}`;
  const box =
    type instanceof TimeType
      ? `${bb}:${bb}`
      : type.month
      ? `${bb} ${bb}${s}${bb}`
      : `${bb} ${bb}${s}${bb}${s}${bb}`;
  return ejs.render(labelTemplate, { box, label: "" });
}

function maskForLabels(
  type: ItemType & WithFixedLabels,
  lang: string | undefined,
  maskOptions: { displayRaw: boolean }
) {
  return type.labels
    .map((l, i) => {
      const value = getTranslation(l, lang);
      const raw = ejs.render(rawValueTemplate, { raw: type.rawValues[i] });
      return maskForLabel(type, value, raw, maskOptions);
    })
    .join("<br>");
}

function maskForLabel(
  type: ItemType & WithFixedLabels,
  value: string | undefined,
  raw: string,
  maskOptions: { displayRaw: boolean }
) {
  const label = maskOptions.displayRaw
    ? reword(value as string, raw as string, { newline: false })
    : value;
  const box =
    type instanceof ChoiceType && type.multiplicity == "many"
      ? String.fromCharCode(0x25a2)
      : String.fromCharCode(0x25cb);
  return ejs.render(labelTemplate, {
    box,
    label,
  });
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WrappedSurveyBuilder extends SurveyBuilder {}
class WrappedSurveyBuilder {
  constructor(transform: (pi: PageItem) => PageItem) {
    return new Proxy(new SurveyBuilder(), {
      get: (target, p, receiver) => {
        if (p == "page")
          return (name: string) => {
            const pageBuilder = target.page(name) as PageBuilder;
            const proxy = new WrappedPageBuilder(pageBuilder, transform);
            target.pages[target.pages.length - 1] = proxy;
            return proxy;
          };
        return Reflect.get(target, p, receiver);
      },
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WrappedPageBuilder extends PageBuilder {}
class WrappedPageBuilder {
  constructor(pageBuilder: PageBuilder, transform: (pi: PageItem) => PageItem) {
    return new Proxy(pageBuilder, {
      get: (target, p, receiver) => {
        if (p == "question")
          return (...args: Parameters<typeof target.question>) => {
            const itemBuilder = target.question(...args) as PageItemBuilder;
            const proxy = new WrappedPageItemBuilder(itemBuilder, transform);
            target.includes[target.includes.length - 1] = proxy;
            return proxy;
          };
        return Reflect.get(target, p, receiver);
      },
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WrappedPageItemBuilder extends PageItemBuilder {}
class WrappedPageItemBuilder {
  constructor(
    itemBuilder: PageItemBuilder,
    transform: (pi: PageItem) => PageItem
  ) {
    return new Proxy(itemBuilder, {
      get: (target, p, receiver) => {
        if (p == "build")
          return (ib: PageItemBuilder[]) => transform(target.build(ib));
        return Reflect.get(target, p, receiver);
      },
    });
  }
}
