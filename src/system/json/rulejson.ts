import { DNode, IPageItemBuilder, Rule, RuleArgs } from "uask-dom";
import "../aspect/index.js";
import { pick } from "./pick.js";

export function ruleSerialize(rule: Rule): DNode<Rule> {
  return pick(rule);
}

export function ruleDeserialize(ib: IPageItemBuilder, rule: DNode<Rule>): void {
  const args = rule as RuleArgs;
  ib.rule(args);
}
