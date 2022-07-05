export function sameDomain(a: unknown, b: unknown): boolean {
  const x = deepCleanDomain(a as Record<string, unknown>);
  const y = deepCleanDomain(b as Record<string, unknown>);
  return JSON.stringify(x) == JSON.stringify(y);
}

function deepCleanDomain(a: Record<string, unknown>): Record<string, unknown> {
  return Object.entries(cleanDomain(a))
    .map(([k, v]) => ({
      [k]: Array.isArray(v)
        ? v.map(deepCleanDomain)
        : typeof v == "object"
        ? cleanDomain(v as Record<string, unknown>)
        : v,
    }))
    .reduce((x, y) => ({ ...x, ...y }));
}

function cleanDomain(a: Record<string, unknown>): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __keys__, __changes__, ...b } = a;
  return b;
}
