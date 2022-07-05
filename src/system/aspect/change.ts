import { DomainCollectionImpl } from "uask-dom";
import deepEqual from "fast-deep-equal";

export interface Changes<T> {
  readonly __changes__?: Partial<T>;
}

export function hasChanges<T>(
  obj: Changes<T>
): obj is T & Required<Changes<T>> {
  return (
    typeof obj.__changes__ == "object" &&
    Object.keys(obj.__changes__).length > 0
  );
}

export function resetChanges<T>(
  current: Changes<T>,
  changes: Partial<T> = {}
): void {
  for (const x in current.__changes__) delete current.__changes__[x];
  Object.assign(current.__changes__ as Changes<T>, changes);
}

export function getChanges<T>(
  target: T & Changes<T>,
  updated: T & Changes<T>,
  kwargs: Partial<T>
): Partial<T> {
  const __changes__: Partial<T> = {};
  let key: keyof Partial<T>;
  for (key in kwargs)
    if (shouldTrack(target, updated, key))
      setChangedValue(__changes__, updated, key);
  return __changes__;
}

function shouldTrack<T>(
  target: T & Changes<T>,
  kwargs: Partial<T>,
  key: keyof T
) {
  const targetValue = target[key];
  const sourceValue = kwargs[key];
  return isTrackable(targetValue) && !deepEqual(targetValue, sourceValue);
}

function isTrackable<T>(targetValue: (T & Changes<T>)[keyof T]) {
  return !(targetValue instanceof DomainCollectionImpl);
}

function setChangedValue<T>(
  __changes__: Partial<T>,
  kwargs: Partial<T>,
  key: keyof T
) {
  __changes__[key] = kwargs[key];
}

export function mergeChanges<T>(
  target: T & Changes<T>,
  changes: Partial<T>
): Partial<T> {
  if (!hasChanges({ __changes__: changes })) return target.__changes__ ?? {};
  const __changes__: Partial<T> = { ...target.__changes__ };
  for (const k in changes)
    mergeChange<T>(__changes__, target, changes, k as keyof T);

  return __changes__;
}

function isChangedInTarget<T>(
  target: T & Changes<T>,
  k: keyof T
): target is T & Required<Changes<T>> {
  return hasChanges(target) && k in target.__changes__;
}

const undef = { undef: true };
function isUndef(obj: unknown) {
  const o =
    typeof obj == "object" ? (obj as Record<string, unknown>) : undefined;
  return o?.undef;
}

function isOriginalValue<T>(
  target: T & Required<Changes<T>>,
  changes: Partial<T>,
  k: keyof T
) {
  const original = target.__changes__[k];
  if (changes[k] == undefined) return isUndef(original);
  return deepEqual(changes[k], original);
}

function mergeChange<T>(
  __changes__: Partial<T>,
  target: T & Changes<T>,
  changes: Partial<T>,
  k: keyof T
) {
  if (isChangedInTarget<T>(target, k)) {
    if (isOriginalValue<T>(target, changes, k)) delete __changes__[k];
  } else {
    const original = target[k];
    __changes__[k] = (original ?? undef) as typeof original;
  }
}
