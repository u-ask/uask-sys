import {
  CrossItemRule,
  DNode,
  getVariableName,
  Rule,
  RuleArgs,
  ISurveyBuilder,
  TriggerWhen,
} from "uask-dom";
import { ruleSerialize } from "./rulejson.js";
import "../aspect/index.js";

export function crossRuleSerialize(
  crossItemRule: CrossItemRule
): DNode<CrossItemRule> {
  const {
    pageItems,
    name,
    when,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: { rule, ...args },
  } = crossItemRule;
  return Object.assign({
    variableNames: [...pageItems.map(i => getVariableName(i))],
    args: ruleSerialize({ name, ...args } as Rule),
    when,
  });
}

export function crossRuleDeserialize(
  b: ISurveyBuilder,
  crossRule: DNode<CrossItemRule>
): void {
  const { variableNames, args } = crossRule;
  b.rule(variableNames, args as RuleArgs).trigger(
    crossRule.when as TriggerWhen
  );
}
