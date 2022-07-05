import { IncludeRow, isLibraryRow, LibraryRow } from "./includedb.js";
import {
  Context,
  DNode,
  getTranslation,
  Include,
  Library,
  PageItem,
  Survey,
  SurveyOptions,
} from "uask-dom";
import { Keys } from "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { PageItemStore } from "./pageitemdbstore.js";
import { Drivers } from "./store.js";

export class IncludeStore {
  private readonly pageItemStore: PageItemStore;

  constructor(private readonly drivers: Drivers) {
    this.pageItemStore = new PageItemStore(this.drivers);
  }

  async saveAll(survey: Survey): Promise<void> {
    await Promise.all(
      survey.pages.map(p =>
        Promise.all(
          p.includes.map((i, x) =>
            this.drivers.includeDriver.save(survey, p, i, x)
          )
        )
      )
    );
  }

  async getNodes(
    options: SurveyOptions,
    keys?: KeyMap
  ): Promise<DNode<Include>[]> {
    if (!keys) throw "key missing in row";
    return this.drivers.includeDriver
      .getRowByPage(keys)
      .then(rows => this.groupByLibrary(rows))
      .then(rows =>
        Promise.all(
          rows.map(async r =>
            isLibraryRow(r)
              ? this.libraryRowToNode(options, r)
              : this.includeRowToNode(options, r)
          )
        )
      );
  }

  private async libraryRowToNode(
    options: SurveyOptions,
    row: Keys & LibraryRow
  ): Promise<DNode<Library>> {
    const { includedPageId, surveyId, variableNames } = row;
    const pageName = await this.drivers.pageDriver
      .getRowById({ id: includedPageId, surveyId })
      .then(
        r =>
          getTranslation(
            JSON.parse(r.name),
            "__code__",
            options.defaultLang
          ) as string
      );
    const contexts = await Promise.all(
      row.contexts
        .map(c => {
          const variableName = variableNames[c[0]];
          return [variableName, JSON.parse(c[1])] as [string, Context];
        })
        .filter(c => c[1] != undefined)
    );
    return {
      pageName,
      variableNames,
      contexts,
    };
  }

  private includeRowToNode(
    options: SurveyOptions,
    row: Keys & IncludeRow
  ): Promise<DNode<PageItem>> {
    return this.pageItemStore.getNode({
      id: row.pageItemId,
      surveyId: row.surveyId,
    });
  }

  async groupByLibrary(
    rows: (Keys & IncludeRow)[]
  ): Promise<(Keys & (LibraryRow | IncludeRow))[]> {
    return [
      ...rows
        .reduce((result, r) => {
          if (typeof r.includedPageId == "number") {
            let obj = result.get(r.includedPageId) as LibraryRow;
            if (obj == undefined) {
              obj = {
                surveyId: r.surveyId,
                pageId: r.pageId,
                includedPageId: r.includedPageId,
                pageItemIds: [r.pageItemId],
                contexts: [[0, r.context]],
                position: r.position,
                variableNames: [r.variableName],
              };
              result.set(r.includedPageId, obj);
            } else {
              obj.pageItemIds.push(r.pageItemId);
              obj.contexts.push([obj.pageItemIds.length - 1, r.context]);
              obj.variableNames.push(r.variableName);
            }
          } else {
            result.set(-r.pageItemId, r); // negation avoids collision with libraries
          }
          return result;
        }, new Map<number, Keys & (LibraryRow | IncludeRow)>())
        .values(),
    ].sort((a, b) => a.position - b.position);
  }
}
