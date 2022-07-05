import {
  Workflow,
  SurveyOptions,
  DNode,
  ISurveyBuilder,
  getTranslation,
  IDomainCollection,
  PageSet,
} from "uask-dom";
import "../aspect/index.js";
import { trakDeserialize } from "./track.js";

export function workflowSerialize(
  workflow: Workflow,
  options: SurveyOptions,
  track = true
): DNode<Workflow> {
  const {
    info,
    single,
    many,
    sequence,
    stop,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    main,
    notifications,
    __keys__,
    __changes__,
    ...node
  } = workflow;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(node, {
    ...(info ? { infoType: getPageSetName(info, options) } : {}),
    singleTypes: getPageSetNames(single, options),
    manyTypes: getPageSetNames(many, options),
    sequenceTypes: getPageSetNames(sequence, options),
    stopTypes: getPageSetNames(stop, options),
    notifications: [...notifications],
    ...trackInfos,
  });
}

export function workflowDeserialize(
  b: ISurveyBuilder,
  workflow: DNode<Workflow>
): void {
  const wb = b.workflow({ name: workflow.name, raw: true });
  if (workflow.infoType) wb.home(workflow.infoType);
  wb.n(...workflow.manyTypes);
  wb.seq(...workflow.sequenceTypes);
  wb.end(...workflow.stopTypes);
  wb.one(...workflow.singleTypes);

  wb.notify(...workflow.notifications);

  trakDeserialize(wb, workflow);
}

function getPageSetNames(
  pageSets: IDomainCollection<PageSet>,
  options: SurveyOptions
) {
  return [...pageSets.map(p => getPageSetName(p, options))];
}

function getPageSetName(p: PageSet, options: SurveyOptions): string {
  return getTranslation(p.type, "__code__", options.defaultLang) as string;
}
