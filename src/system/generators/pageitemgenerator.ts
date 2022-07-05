/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Computed,
  ILibraryBuilder,
  IPageBuilder,
  IPageItemBuilder,
  isComputed,
  ISectionBuilder,
  isMLstring,
  ItemType,
  IUnitBuilder,
  mlstring,
  RuleArgs,
  RuleName,
  Rules,
  SurveyOptions,
  TypeArgs,
} from "uask-dom";
import { getDynamicArgs, regenerateDynamic } from "./dynamic.js";
import { FluentGenerator } from "./fluentgenerator.js";
import { getTypeGenerator } from "./itemtypegenerator.js";
import { PageGenerator } from "./pagegenerator.js";
import { defaultLang, transposeML } from "./transposeml.js";

export class PageItemGenerator implements IPageItemBuilder, IUnitBuilder {
  readonly generator = new FluentGenerator();
  variableName: string | undefined = undefined;

  constructor(
    private readonly builder: PageGenerator,
    private readonly options: SurveyOptions = {},
    private readonly typeFactory: string = "b.types"
  ) {}

  build(): string {
    return this.generator.build();
  }

  question(
    x: mlstring | mlstring[],
    y: string | (ItemType | TypeArgs),
    z?: ItemType | TypeArgs,
    t?: (ItemType | TypeArgs) | { followUp?: true },
    ...o: ItemType[]
  ): IPageItemBuilder {
    if (this.isamplemTypeLike(z) && z.name == "info" && isMLstring(x))
      return this.info(x, y as string);
    if (this.generator.isEmpty) {
      this.variableName =
        typeof y == "string" ? y : typeof x == "string" ? x : "";
      const { yy, zz, tt, oo } = this.mayBeTypes(y, z, t, o);
      const { [defaultLang(this.options)]: def, ...others } = transposeML(
        Array.isArray(x) ? x : [x],
        this.options
      );
      if (Array.isArray(x)) {
        this.multipleWordings(def, yy, zz, tt, oo);
      } else {
        this.singleWording(def[0], yy, zz, tt, oo);
      }
      this.translateWordings(others);
      return this;
    }
    return this.builder.question(x, y, z, t, ...o);
  }

  private mayBeTypes(
    y: string | ItemType | TypeArgs,
    z: ItemType | TypeArgs | undefined,
    t: ItemType | TypeArgs | { followUp?: true | undefined } | undefined,
    o: ItemType[]
  ) {
    const yy = this.mayBeType(y);
    const zz = this.mayBeType(z);
    const tt = this.mayBeType(t);
    const oo = o?.map(t => this.mayBeType(t));
    return { yy, zz, tt, oo };
  }

  private mayBeType(o: unknown) {
    if (this.isamplemTypeLike(o))
      return () =>
        getTypeGenerator(o as TypeArgs | ItemType, this.options).build(
          this.typeFactory,
          2
        );
    return o;
  }

  private isamplemTypeLike(o: unknown): o is ItemType {
    return typeof o == "object" && o != null && "name" in o;
  }

  private singleWording(
    wording: string,
    yy: unknown,
    zz: unknown,
    tt: unknown,
    oo: unknown[]
  ) {
    this.generator
      .call("question")
      .args(this.esc(wording), yy)
      .opts(zz, tt, ...oo);
  }

  private multipleWordings(
    wordings: string[],
    yy: unknown,
    zz: unknown,
    tt: unknown,
    oo: unknown[]
  ) {
    this.generator
      .call("question")
      .args(yy, zz)
      .opts(tt, ...oo);
    this.generator.call("wordings").args(...wordings.map(w => this.esc(w)));
  }

  private translateWordings(translations: Record<string, string[]>) {
    for (const [lang, wordings] of Object.entries(translations)) {
      this.generator
        .call("translate")
        .args(lang, ...wordings.map(w => this.esc(w)));
    }
  }

  private esc(wording: string) {
    return wording.replace(/[\\"]/g, "\\$&");
  }

  info(wording: mlstring | string[], name: string): IPageItemBuilder {
    if (this.generator.isEmpty) {
      this.variableName = name;
      if (isMLstring(wording)) {
        const { [defaultLang(this.options)]: def, ...others } = transposeML(
          [wording],
          this.options
        );
        this.generator.call("info").args(this.esc(def[0]), name);
        this.translateWordings(others);
      } else {
        this.generator.call("info").args(
          wording.map(w => this.esc(w)),
          name
        );
      }
      return this;
    }
    return this.builder.info(wording, name);
  }

  include(
    pageName: string,
    mode?:
      | {
          followUp: true;
        }
      | {
          initial: true;
        }
  ): ILibraryBuilder {
    return this.builder.include(pageName, mode);
  }

  startSection(title?: mlstring): ISectionBuilder {
    return this.builder.startSection(title);
  }

  endSection(): IPageBuilder {
    return this.builder.endSection();
  }

  unit(...units: string[]): IPageItemBuilder & IUnitBuilder {
    if (units.length > 0) this.generator.call("unit").args(...units);
    return this;
  }

  extendable(): IPageItemBuilder {
    const gen = new FluentGenerator().call("extendable");
    this.generator.compose(gen);
    return this;
  }

  translate(
    lang: string,
    translation: string,
    ...contexts: string[]
  ): IPageItemBuilder {
    this.generator.call("translate").args(lang, translation, ...contexts);
    return this;
  }

  required(formula?: string): IPageItemBuilder {
    this.generator.call("required").opt(formula);
    return this;
  }

  critical(
    tag: string | Computed,
    message?: string | Computed,
    ...x: unknown[]
  ): IPageItemBuilder {
    tag = this.unquote(tag);
    message = this.unquote(message);
    this.generator
      .call("critical")
      .arg(tag)
      .opts(message, ...x);
    return this;
  }

  private unquote<T>(v: T | Computed) {
    if (isComputed(v) && /^'[^']*'$/.test(v.formula))
      return v.formula.slice(1, -1);
    return v;
  }

  inRange(
    min: number | Date | Computed,
    max: number | Date | Computed,
    limits: {
      includeLower: boolean;
      includeUpper: boolean;
    } = { includeLower: true, includeUpper: true }
  ): IPageItemBuilder {
    this.generator.call("inRange").args(min, max).opt(limits);
    return this;
  }

  inPeriod(
    min: Date | Computed,
    max: Date | Computed,
    limits?: {
      includeLower: boolean;
      includeUpper: boolean;
    }
  ): IPageItemBuilder {
    this.generator.call("inPeriod").args(min, max).opt(limits);
    return this;
  }

  comment(comment: mlstring): IPageItemBuilder {
    this.generator.call("comment").arg(comment);
    return this;
  }

  pin(title: mlstring): IPageItemBuilder {
    this.generator.call("pin").arg(title);
    return this;
  }

  kpi(title: mlstring, pivot?: string): IPageItemBuilder {
    this.generator.call("kpi").arg(title).opt(pivot);
    return this;
  }

  maxLength(maxLength: number): IPageItemBuilder {
    this.generator.call("maxLength").arg(maxLength);
    return this;
  }

  decimalPrecision(precision: number): IPageItemBuilder {
    this.generator.call("decimalPrecision").arg(precision);
    return this;
  }

  fixedLength(length: number): IPageItemBuilder {
    this.generator.call("fixedLength").arg(length);
    return this;
  }

  computed(formula: string): IPageItemBuilder {
    this.generator.call("computed").arg(formula);
    return this;
  }

  memorize(): IPageItemBuilder {
    this.generator.call("memorize");
    return this;
  }

  letterCase(letterCase: "upper" | "lower"): IPageItemBuilder {
    this.generator.call("letterCase").arg(letterCase);
    return this;
  }

  activateWhen(formula: string, ...values: unknown[]): IPageItemBuilder {
    this.generator.call("activateWhen").args(formula, ...values);
    return this;
  }

  visibleWhen(formula: string, ...values: unknown[]): IPageItemBuilder {
    this.generator.call("visibleWhen").args(formula, ...values);
    return this;
  }

  modifiableWhen(formula: string, ...values: unknown[]): IPageItemBuilder {
    this.generator.call("modifiableWhen").args(formula, ...values);
    return this;
  }

  rule(rule: RuleName | RuleArgs, ...args: unknown[]): IPageItemBuilder {
    const name = typeof rule == "object" ? rule.name : rule;
    const a = typeof rule == "object" ? Rules.args(rule) : args;
    switch (name) {
      case "required":
        return this.required(
          (a[0] === true ? undefined : a[0]) as string | undefined
        );
      case "critical":
        return this.critical(a[0] as string, a[1] as string, ...a.slice(2));
      case "inRange":
        return this.inRange(
          a[0] as number | Computed,
          a[1] as number | Computed,
          a[2] as { includeLower: boolean; includeUpper: boolean } | undefined
        );
      case "maxLength":
        return this.maxLength(a[0] as number);
      case "fixedLength":
        return this.fixedLength(a[0] as number);
      case "decimalPrecision":
        return this.decimalPrecision(a[0] as number);
      case "letterCase":
        return this.letterCase(a[0] as "upper" | "lower");
      case "computed":
      case "activation":
      case "constant":
      case "copy":
        this.generator.call("rule").args("dynamic", name, ...a);
        return this;
      case "dynamic":
        regenerateDynamic(
          this,
          a[0] as RuleName,
          getDynamicArgs(
            [this.variableName as string],
            a[1] as [string, number]
          )[0] as string[],
          ...a.slice(2)
        );
        return this;
    }
  }

  defaultValue(defaultValue: unknown): IPageItemBuilder {
    this.generator.call("defaultValue").arg(defaultValue);
    return this;
  }

  wordings(
    wording1: mlstring,
    wording2: mlstring,
    ...contexts: mlstring[]
  ): IPageItemBuilder {
    this.generator.call("wordings").args(wording1, wording2, ...contexts);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  track(): void {}
}
