import {
  Context,
  ILibraryBuilder,
  IPageBuilder,
  IPageItemBuilder,
  ISectionBuilder,
  ItemType,
  mlstring,
  SurveyOptions,
  TypeArgs,
} from "uask-dom";
import { FluentGenerator } from "./fluentgenerator.js";
import { PageItemGenerator } from "./pageitemgenerator.js";
import { SurveyGenerator } from "./surveygenerator.js";
import { defaultLang, transposeML } from "./transposeml.js";

export class PageGenerator implements IPageBuilder, ILibraryBuilder {
  readonly generator = new FluentGenerator();
  private currentGenerator = this.generator;
  private inSection = "";
  private anonymousSection = " ";
  items: PageItemGenerator[] = [];

  constructor(
    private readonly builder: SurveyGenerator,
    private readonly options: SurveyOptions = {},
    private readonly typeFactory = "b.types"
  ) {}

  build(): string {
    return this.generator.build("  ", 1);
  }

  translate(lang: string, translation: string): IPageBuilder {
    this.currentGenerator.call("translate").args(lang, translation);
    return this;
  }

  exportTo(
    conf:
      | string
      | {
          fileName?: string;
        }
  ): IPageBuilder {
    this.generator.call("exportTo").arg(conf);
    return this;
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
    this.currentGenerator = new FluentGenerator();
    this.generator.call("include").arg(pageName).opt(mode);
    this.generator.compose(this.currentGenerator);
    return this;
  }

  select(...variableNames: string[]): ILibraryBuilder {
    this.currentGenerator.call("select").args(...variableNames);
    return this;
  }

  context(variableName: string, ctx: Context): ILibraryBuilder {
    this.currentGenerator.call("context").args(variableName, ctx);
    return this;
  }

  startSection(title?: mlstring): ISectionBuilder {
    if (title) {
      const { [defaultLang(this.options)]: def, ...others } = transposeML(
        [title],
        this.options
      );
      if (this.inSection != def[0]) {
        this.inSection = def[0];
        this.generator.call("startSection").arg(def[0]);
        this.currentGenerator = new FluentGenerator();
        this.generator.compose(this.currentGenerator);
        for (const [lang, translation] of Object.entries(others))
          this.currentGenerator.call("translate").args(lang, translation[0]);
      }
    } else {
      this.startSection(this.anonymousSection);
      this.anonymousSection += " ";
    }
    return this;
  }

  endSection(): IPageBuilder {
    this.currentGenerator.call("endSection");
    this.currentGenerator = this.generator;
    this.inSection = "";
    return this;
  }

  activateWhen(
    variableName: string,
    ...values: unknown[]
  ): ISectionBuilder & ILibraryBuilder {
    this.currentGenerator.call("activateWhen").args(variableName, ...values);
    return this;
  }

  visibleWhen(
    variableName: string,
    ...values: unknown[]
  ): ISectionBuilder & ILibraryBuilder {
    this.currentGenerator.call("visibleWhen").args(variableName, ...values);
    return this;
  }

  modifiableWhen(
    variableName: string,
    ...values: unknown[]
  ): ISectionBuilder & ILibraryBuilder {
    this.currentGenerator.call("modifiableWhen").args(variableName, ...values);
    return this;
  }

  question(
    x: mlstring | mlstring[],
    y: string | (ItemType | TypeArgs),
    z?: ItemType | TypeArgs,
    t?: (ItemType | TypeArgs) | { followUp?: true },
    ...o: ItemType[]
  ): IPageItemBuilder {
    if (this.inSection.length == 0) this.currentGenerator = this.generator;
    const pageItemGenerator = new PageItemGenerator(
      this,
      this.options,
      this.typeFactory
    );
    pageItemGenerator.question(x, y, z, t, ...o);
    this.currentGenerator.compose(
      pageItemGenerator.generator,
      0,
      this.inSection == "" ? 2 : 3
    );
    this.items.push(pageItemGenerator);
    return pageItemGenerator;
  }

  info(wording: mlstring | string[], name: string): IPageItemBuilder {
    const pageItemGenerator = new PageItemGenerator(
      this,
      this.options,
      this.typeFactory
    );
    pageItemGenerator.info(wording, name);
    this.currentGenerator.compose(pageItemGenerator.generator, 0, 2);
    this.items.push(pageItemGenerator);
    return pageItemGenerator;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  track(): void {}
}
