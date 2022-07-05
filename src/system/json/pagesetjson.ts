import {
  SurveyOptions,
  ISurveyBuilder,
  PageSet,
  DNode,
  PageSetBuilder,
  getTranslation,
} from "uask-dom";
import "../aspect/index.js";
import { trakDeserialize } from "./track.js";

export function pageSetDeserialize(
  b: ISurveyBuilder,
  pageSet: DNode<PageSet>
): void {
  const vb = b.pageSet(pageSet.type as string) as PageSetBuilder;

  if (pageSet.datevar) vb.datevariable(pageSet.datevar);

  const pageNames = pageSet.pageNames.map(p =>
    pageSet.mandatoryPageNames?.includes(p) ? { name: p, mandatory: true } : p
  );
  if (pageNames.length > 0) vb.pages(...pageNames);

  trakDeserialize(vb, pageSet);
}

export function pageSetSerialize(
  pageSet: PageSet,
  options: SurveyOptions,
  track = true
): DNode<PageSet> {
  const { pages, mandatoryPages, datevar, __keys__, __changes__, ...node } =
    pageSet;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(
    node,
    {
      pageNames: [
        ...pages.map(
          p => getTranslation(p.name, "__code__", options.defaultLang) as string
        ),
      ],
      ...trackInfos,
    },
    typeof mandatoryPages != "undefined"
      ? {
          mandatoryPageNames: [
            ...mandatoryPages.map(
              p =>
                getTranslation(
                  p.name,
                  "__code__",
                  options.defaultLang
                ) as string
            ),
          ],
        }
      : {},
    datevar ? { datevar } : {}
  );
}
