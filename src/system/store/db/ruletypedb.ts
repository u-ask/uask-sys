import { Knex } from "knex";
import { valueOrThrow } from "../../../tools.js";

export type RuleTypeRow = { name: string; precedence: number; id: number };

export class RuleTypeDriver {
  private rows: Promise<RuleTypeRow[]>;

  constructor(private client: Knex) {
    this.rows = this.client.table<RuleTypeRow>("ruleTypes").then(r => r);
  }

  async getAll(): Promise<RuleTypeRow[]> {
    return this.rows;
  }

  async getByName(name: string): Promise<RuleTypeRow> {
    return this.rows
      .then(rr => rr.find(r => r.name == name))
      .then(valueOrThrow("rule not found"));
  }

  getById(id: number): Promise<RuleTypeRow> {
    return this.rows
      .then(rr => rr.find(r => r.id == id))
      .then(valueOrThrow("rule not found"));
  }
}
