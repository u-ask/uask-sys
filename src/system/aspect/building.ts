/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  PageBuilder,
  PageItemBuilder,
  SurveyBuilder,
  PageSetBuilder,
  InterviewBuilder,
  ParticipantBuilder,
  InterviewItemBuilder,
  WorkflowBuilder,
} from "uask-dom";
import { Tracking } from "./tracking.js";
import { Changes, hasChanges, resetChanges } from "./change.js";
import { Keys, hasKeys, setKeys } from "./keys.js";

export interface Builder<T> {
  build(...args: unknown[]): T;
}

export interface Tracker<T> {
  track(keys: Keys, changes: Changes<T>): void;
}

export interface TrackBuilder<T extends Tracking<T>>
  extends Builder<T>,
    Tracker<T> {
  buildNoTrack(...args: unknown[]): T;
}

declare module "uask-dom" {
  interface ISurveyBuilder extends Tracker<Survey> {}
  interface SurveyBuilder
    extends ISurveyBuilder,
      Keys,
      TrackBuilder<Survey>,
      Changes<Survey> {}
  interface IPageBuilder extends Tracker<Page> {}
  interface PageBuilder
    extends IPageBuilder,
      Keys,
      TrackBuilder<Page>,
      Changes<Page> {}
  interface IPageItemBuilder extends Tracker<PageItem> {}
  interface PageItemBuilder
    extends IPageItemBuilder,
      Keys,
      TrackBuilder<PageItem>,
      Changes<PageItem> {}
  interface IPageSetBuilder extends Tracker<PageSet> {}
  interface PageSetBuilder
    extends IPageSetBuilder,
      Keys,
      TrackBuilder<PageSet>,
      Changes<PageSet> {}
  interface IWorkflowBuilder extends Tracker<Workflow> {}
  interface IRawWorkflowBuilder extends Tracker<Workflow> {}
  interface WorkflowBuilder
    extends IWorkflowBuilder,
      IRawWorkflowBuilder,
      Keys,
      TrackBuilder<Workflow>,
      Changes<Workflow> {}
  interface ParticipantBuilder
    extends Keys,
      TrackBuilder<Participant>,
      Changes<Participant> {}
  interface InterviewBuilder
    extends Keys,
      TrackBuilder<Interview>,
      Changes<Interview> {}
  interface InterviewItemBuilder
    extends Keys,
      TrackBuilder<InterviewItem>,
      Changes<InterviewItem> {}
}

function weave<T extends Keys & Changes<T> & Tracking<T>>(
  proto: Keys & TrackBuilder<T> & Changes<T>
) {
  Object.assign(proto, { __keys__: {}, __changes__: {} });
  proto.track = function (keys: Keys, changes: Changes<T>) {
    Object.assign(this, keys, changes);
  };
  proto.buildNoTrack = proto.build;
  proto.build = function (...args: unknown[]) {
    const instance = this.buildNoTrack(...args);
    if (hasKeys(this) && this.__keys__ != instance.__keys__)
      setKeys(instance, this.__keys__);
    if (hasChanges(this) && instance.__changes__ != this.__changes__)
      resetChanges(instance, this.__changes__);
    return instance;
  };
}

weave(SurveyBuilder.prototype);
weave(PageBuilder.prototype);
weave(PageSetBuilder.prototype);
weave(WorkflowBuilder.prototype);
weave(PageItemBuilder.prototype);
weave(ParticipantBuilder.prototype);
weave(InterviewBuilder.prototype);
weave(InterviewItemBuilder.prototype);
