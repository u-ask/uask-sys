import { Differentiable, DomainCollectionImpl, mlstring } from "uask-dom";
import { Changes, hasChanges, hasKeys, Keys } from "../aspect/index.js";
import { Updatable } from "../aspect/tracking.js";

export type Payload<T> = Partial<T>;

export type ChangeRecord<T> = {
  payload?: Payload<T>;
  operation?: mlstring;
};

export function makeChangeRecord<T>(
  row: T & Changes<T> & Keys
): ChangeRecord<T> {
  if (hasKeys(row)) {
    return makeRecord(changePayload(row), "update");
  }
  return makeRecord(createPayload(row), "create");
}

function makeRecord<T>(
  payload: Payload<T> | undefined,
  operation: string
): ChangeRecord<T> {
  return payload ? { payload, operation } : {};
}

export function changePayload<T>(row: T & Changes<T>): Payload<T> | undefined {
  if (!hasChanges(row)) return undefined;
  return Object.keys(row.__changes__).reduce((payload, c) => {
    const key = c as keyof T;
    if (inPayload(row, key)) {
      return payloadAssign<T>(payload, key, row[key]);
    }
    return payload;
  }, undefined as Payload<T> | undefined);
}

export function createPayload<T>(row: T): Payload<T> {
  return Object.keys(row).reduce((payload, t) => {
    const c = t as keyof T;
    if (inPayload(row, c)) {
      return payloadAssign<T>(payload, c, row[c]);
    }
    return payload;
  }, {} as Payload<T>);
}

function inPayload<T>(row: T, c: keyof T) {
  return (
    !(row[c] instanceof DomainCollectionImpl) &&
    c != "__changes__" &&
    c != "__keys__" &&
    c != "__untrack__" &&
    !(typeof row[c] == "object" && "update" in row[c])
  );
}

function payloadAssign<T>(
  payload: Payload<T> | undefined,
  c: keyof T,
  value: unknown
) {
  const p = {
    [c]: value instanceof Date && value ? value.toISOString() : value,
  };
  return Object.assign(p, payload);
}

export function getChangeRecord<
  T extends Differentiable & Changes<T> & Updatable<T>
>(item: T): ChangeRecord<T> {
  const { payload, operation } = makeChangeRecord(item);
  if (typeof payload == "undefined") return { operation: "none" };
  const previous = hasChanges(item) ? item.update(item.__changes__) : undefined;
  const { operation: oper, ...payl } = item.diff(previous);
  return {
    payload: Object.assign(payload, payl),
    operation: oper ?? operation,
  };
}
