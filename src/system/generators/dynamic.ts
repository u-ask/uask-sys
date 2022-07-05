import { Computed, RuleName } from "uask-dom";
import { PageItemGenerator } from "./pageitemgenerator.js";

export function getDynamicArgs(
  variableNames: string[],
  args: [string, number]
): unknown[] {
  // eslint-disable-next-line prefer-const
  const formula = reverseFormula(args[0], variableNames, args);
  return extractFormula(formula);
}
function reverseFormula(
  formula: string,
  variableNames: string[],
  a: [string, number]
) {
  for (let i = a[1]; i > 0; i--) {
    formula = formula.replace(new RegExp(`\\$${i}`, "g"), variableNames[i - 1]);
  }
  return formula;
}
function extractFormula(formula: string): unknown[] {
  const extract = /^\[(.*)\]$/.exec(formula);
  if (extract == null) return extractElement(formula);
  return [extractFormula(extract[1])];
}
function extractElement(content: string): unknown[] {
  const elementExpr =
    /(^|,)(([^,()']+|(\[.*\])|((\(.*\))|('[^']*'))*)+)(?=(,|$))/g;
  let elementMatch: ReturnType<typeof elementExpr.exec>;
  const result = [];
  while ((elementMatch = elementExpr.exec(content))) {
    const element = elementMatch[2];
    result.push(element);
  }
  return result;
}

export function regenerateDynamic(
  pageItemGenerator: PageItemGenerator | undefined,
  rule: RuleName,
  values: unknown[],
  ...extraArgs: unknown[]
): void {
  switch (rule) {
    case "inRange":
      pageItemGenerator?.inRange(
        asComputed(values[0]),
        asComputed(values[1]),
        extraArgs[0] as { includeLower: boolean; includeUpper: boolean }
      );
      break;
    case "critical":
      pageItemGenerator?.critical(
        asComputed(values[0]),
        asComputed(values[1]),
        asComputed(values[2])
      );
      break;
    case "required":
    case "maxLength":
    case "fixedLength":
    case "decimalPrecision":
    case "letterCase":
      pageItemGenerator?.rule(rule, ...values);
      break;
    case "activation":
      if (extraArgs[0] == "enable")
        pageItemGenerator?.activateWhen((values[0] as string[])[0]);
      else pageItemGenerator?.visibleWhen((values[0] as string[])[0]);
      break;
    case "constant":
    case "copy":
    case "dynamic":
    case "computed":
      break;
  }
}
function asComputed(value: unknown): Computed {
  return typeof value == "string" ? { formula: value } : (value as Computed);
}
