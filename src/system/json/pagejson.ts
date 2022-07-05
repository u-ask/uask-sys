import {
  Context,
  DNode,
  getTranslation,
  Library,
  Page,
  IPageBuilder,
  PageItem,
  ISurveyBuilder,
  SurveyOptions,
} from "uask-dom";
import { itemDeserialize, itemSerialize } from "./pageitemjson.js";
import "../aspect/index.js";
import { trakDeserialize } from "./track.js";

const noSection = JSON.stringify(undefined);

export function pageDeserialize(b: ISurveyBuilder, page: DNode<Page>): void {
  const pb = b.page(page.name as string);

  if (page.exportConfig) pb.exportTo(page.exportConfig);

  let section = noSection;
  page.includes.forEach(q => {
    section = libraryDeserialize(pb, q, section);
  });
  section = endSection(pb, section);

  trakDeserialize(pb, page);
}

function libraryDeserialize(
  pb: IPageBuilder,
  q: DNode<PageItem> | DNode<Library>,
  section: string
) {
  if ("wording" in q) {
    section = startSection(pb, q, section);
    itemDeserialize(pb, q);
  } else {
    section = endSection(pb, section);
    const pi = pb.include(q.pageName);
    if (q.variableNames) pi.select(...q.variableNames);
    if (q.contexts) q.contexts.forEach(c => pi.context(...c));
  }
  return section;
}

function startSection(pb: IPageBuilder, q: DNode<PageItem>, section: string) {
  const s = JSON.stringify(q.section);
  if (section != s) {
    endSection(pb, section);
    if (s != noSection) pb.startSection(q.section as string);
  }
  return s;
}

function endSection(pb: IPageBuilder, section: string) {
  if (section != noSection) pb.endSection();
  return noSection;
}

export function pageSerialize(
  page: Page,
  options: SurveyOptions,
  track = true
): DNode<Page> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { includes, items, exportConfig, __keys__, __changes__, ...node } =
    page;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(node, {
    includes: [...includes.map(i => librarySerialize(i, options, track))],
    ...(exportConfig ? { exportConfig } : {}),
    ...trackInfos,
  });
}

export function librarySerialize(
  i: Library | PageItem,
  options: SurveyOptions,
  track = true
): DNode<Library> | DNode<PageItem> {
  if (i instanceof PageItem) return itemSerialize(i, track);
  else {
    const { page, pageItems, contexts } = i;
    return Object.assign(
      {
        pageName: getTranslation(
          page.name,
          "__code__",
          options.defaultLang
        ) as string,
      },
      pageItems
        ? { variableNames: [...pageItems.map(i => i.variableName)] }
        : {},
      contexts ? { contexts: [...contexts.map(contextSerialize)] } : {}
    );
  }
}

function contextSerialize(c: {
  pageItem: PageItem;
  context: Context;
}): [string, number] {
  return [c.pageItem.variableName, c.context] as [string, number];
}
