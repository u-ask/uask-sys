import { Changes, Keys } from "../aspect/index.js";
import { Tracker } from "../aspect/building.js";

export function trakDeserialize<T>(b: Tracker<T>, t: Keys & Changes<T>): void {
  b.track(
    { __keys__: t.__keys__ } as Keys,
    { __changes__: t.__changes__ } as Changes<T>
  );
}

export function trakDeserializeArray<T>(
  b: Tracker<T>[],
  t: (Keys & Changes<T>)[]
): void {
  for (const i in b) {
    trakDeserialize(b[i], t[i]);
  }
}
