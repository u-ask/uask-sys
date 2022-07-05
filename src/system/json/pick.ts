import { DNode } from "uask-dom";

export function pick<T>(obj: T): DNode<T> {
  const result = {} as Record<keyof T, unknown>;
  for (const k in obj) {
    pickone<T>(obj, k, result);
  }
  return result as DNode<T>;
}

function pickone<T>(
  obj: T,
  k: Extract<keyof T, string>,
  result: Record<keyof T, unknown>
) {
  const v = obj[k];
  if (v !== undefined) {
    if (v instanceof Date) result[k] = v.toISOString();
    else result[k] = v;
  }
}
