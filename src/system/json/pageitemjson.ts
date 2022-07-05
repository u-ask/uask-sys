import {
  TypeArgs,
  PageItem,
  IPageBuilder,
  DNode,
  PageItemBuilder,
  getItem,
  hasPivot,
} from "uask-dom";
import "../aspect/index.js";
import { ruleDeserialize, ruleSerialize } from "./rulejson.js";
import { trakDeserialize } from "./track.js";
import { pick } from "./pick.js";

export function itemDeserialize(pb: IPageBuilder, item: DNode<PageItem>): void {
  const qb = pb.question(
    item.wording as string,
    item.variableName as string,
    { ...item.type } as TypeArgs
  ) as PageItemBuilder;

  if (item.units) {
    const ub = Array.isArray(item.units)
      ? qb.unit(...item.units)
      : qb.unit(...item.units.values);
    if (!Array.isArray(item.units) && item.units.isExtendable) ub.extendable();
  }

  if (typeof item.default != "undefined") qb.defaultValue(item.default);

  item.rules.forEach(rule => {
    ruleDeserialize(qb, rule);
  });

  if (item.itemComment) qb.comment(item.itemComment);
  if (item.pinTitle) qb.pin(item.pinTitle);
  if (item.kpiTitle) qb.kpi(item.kpiTitle, item.kpiPivot);

  trakDeserialize(qb, item);
}

export function itemSerialize(item: PageItem, track = true): DNode<PageItem> {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    instance,
    rules,
    type,
    comment,
    section,
    pin,
    kpi,
    defaultValue,
    __keys__,
    __changes__,
    ...node
  } = getItem(item);
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(
    node,
    {
      type: pick(type),
      rules: [...rules.map(ruleSerialize)],
      ...trackInfos,
    },
    section ? { section } : {},
    comment ? { itemComment: comment } : {},
    pin ? { pinTitle: pin } : {},
    kpi ? { kpiTitle: hasPivot(kpi) ? kpi.title : kpi } : {},
    kpi && hasPivot(kpi) ? { kpiPivot: kpi.pivot.variableName } : {},
    typeof defaultValue != "undefined" ? { default: defaultValue.value } : {}
  );
}
