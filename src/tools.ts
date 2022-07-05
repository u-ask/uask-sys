export function valueOrThrow<T>(
  message = "value is undefined"
): (t: T | undefined) => T {
  return t => {
    if (!t) throw message;
    return t;
  };
}
