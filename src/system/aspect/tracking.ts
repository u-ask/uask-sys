import {
  InterviewItem,
  Interview,
  Page,
  Participant,
  PageItem,
  Sample,
  Survey,
  PageSet,
  Workflow,
} from "uask-dom";
import {
  Changes,
  resetChanges,
  getChanges,
  mergeChanges,
  hasChanges,
} from "./change.js";
import { Keys, hasKeys, setKeys, KeyMap } from "./keys.js";

type Freshen<T> = ((p: Partial<T>) => Partial<T>) | false;

export interface Updatable<T, U extends Keys = T> {
  update(kwargs: Partial<U>): T;
}

export type Zip<T, U> = [Partial<T>, U];

export interface Zippable<T, U> extends Updatable<T> {
  update(kwargs: Partial<T> | Zip<T, U>): T;
  zip(kwargs: Zip<T, U>): T;
}

function isZip<T, U>(o: Partial<T> | Zip<T, U>): o is Zip<T, U> {
  return Array.isArray(o);
}

function isZippable<T, U>(o: Updatable<T>): o is Zippable<T, U> {
  return "zip" in o;
}

export interface Tracking<T> extends Updatable<T> {
  updateNoTrack(kwargs: Partial<T>): T;
  isStale(omit?: (keyof T)[]): Freshen<T>;
  __untrack__?: true;
}

export interface Del<T> extends Updatable<T> {
  __delete__?: unknown;
}

declare module "uask-dom" {
  interface Survey extends Keys, Tracking<Survey>, Changes<Survey> {}
  interface Page extends Keys, Tracking<Page>, Changes<Page> {}
  interface PageSet extends Keys, Tracking<PageSet>, Changes<PageSet> {}
  interface PageItem extends Keys, Tracking<PageItem>, Changes<PageItem> {}
  interface Participant
    extends Keys,
      Tracking<Participant>,
      Changes<Participant>,
      Del<Participant> {}
  interface Interview
    extends Keys,
      Tracking<Interview>,
      Changes<Interview>,
      Del<Interview> {}
  interface InterviewItem
    extends Keys,
      Tracking<InterviewItem>,
      Changes<InterviewItem> {}
  interface Sample extends Keys, Tracking<Sample>, Changes<Sample> {}
  interface Workflow extends Keys, Tracking<Workflow>, Changes<Workflow> {}
}

function weave<T extends Keys & Tracking<T> & Changes<T>>(proto: T) {
  proto.updateNoTrack =
    proto.update ??
    function (this: T, kwargs: Partial<T>) {
      return Object.assign(this, kwargs);
    };

  proto.update = function <U>(kwargs: Partial<T> | Zip<T, U>) {
    if (isZip(kwargs) && isZippable(this)) return this.zip(kwargs);
    if (isZip(kwargs)) throw "zipped type applied to non zippable";

    const { __untrack__, __keys__, __changes__, ...others } = kwargs;

    if (__untrack__) {
      const updated = this.updateNoTrack?.(others as Partial<T>);
      if (__keys__) setKeys(updated, __keys__ as KeyMap);
      resetChanges(updated);
      return updated;
    }

    const updated = this.updateNoTrack(kwargs);

    if (this != updated && !hasChanges({ __changes__ })) {
      const __changes__ = getChanges<T>(this, updated, others as Partial<T>);

      if (hasChanges({ __changes__ })) {
        const merged = mergeChanges(this, __changes__);
        resetChanges(updated, merged);
      }
    }

    return updated;
  };

  proto.isStale = function (omit = []) {
    if (isNew(this) || isModified(this, omit)) return freshen;
    return false;
  };
}

function isNew<T extends Keys & Tracking<T> & Changes<T>>(obj: T) {
  return !hasKeys(obj);
}

function isModified<T extends Keys & Tracking<T> & Changes<T>>(
  obj: T,
  omit: (keyof T)[]
) {
  return (
    hasChanges(obj) &&
    !Object.keys(obj.__changes__)?.every(c => omit.includes(c as keyof T))
  );
}

function freshen<T>(p: Partial<T>) {
  return { __keys__: { __flag__: 1 }, __untrack__: true, ...p };
}

weave(Survey.prototype);
weave(Page.prototype);
weave(PageSet.prototype);
weave(PageItem.prototype);
weave(Participant.prototype);
weave(Interview.prototype);
weave(InterviewItem.prototype);
weave(Sample.prototype);
weave(Workflow.prototype);
