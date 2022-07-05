import { IPageSetBuilder, mlstring, PageDef, SurveyOptions } from "uask-dom";
import { FluentGenerator } from "./fluentgenerator.js";
import { SurveyGenerator } from "./surveygenerator.js";
import { defaultLang, transposeML } from "./transposeml.js";

export class PageSetGenerator implements IPageSetBuilder {
  readonly generator = new FluentGenerator();

  constructor(
    private readonly builder: SurveyGenerator,
    private readonly options: SurveyOptions = {}
  ) {}

  build(): string {
    return this.generator.build();
  }

  pageSet(type: mlstring): IPageSetBuilder {
    if (this.generator.isEmpty) {
      const {
        __code__,
        [defaultLang(this.options)]: def,
        ...others
      } = transposeML([type], this.options);
      if (typeof __code__ != "undefined") {
        this.generator.call("pageSet").arg(__code__[0]);
        this.generator
          .call("translate")
          .args(defaultLang(this.options), def[0]);
      } else this.generator.call("pageSet").arg(def[0]);
      for (const [lang, type] of Object.entries(others))
        this.generator.call("translate").args(lang, type[0]);
      return this;
    } else return this.builder.pageSet(type);
  }

  translate(lang: string, translation: string): IPageSetBuilder {
    this.generator.call("translate").args(lang, translation);
    return this;
  }

  datevariable(datevariable: string): IPageSetBuilder {
    this.generator.call("datevariable").arg(datevariable);
    return this;
  }

  pages(...pageDefs: (PageDef | string)[]): IPageSetBuilder {
    this.generator.call("pages").args(...pageDefs);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  track(): void {}
}
