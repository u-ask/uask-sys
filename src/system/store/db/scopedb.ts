import { Knex } from "knex";
import { valueOrThrow } from "../../../tools.js";

type ScopeRow = { level: string; id: number };

export class ScopeDriver {
  private rows: Promise<ScopeRow[]>;

  constructor(private client: Knex) {
    this.rows = this.client
      .table<ScopeRow>("scopes")
      .then(rr => rr)
      .catch(() => []);
  }
  async getAll(): Promise<ScopeRow[]> {
    return this.rows;
  }

  async getByLevel(level: string): Promise<ScopeRow> {
    return this.rows
      .then(rr => rr.find(r => r.level == level))
      .then(valueOrThrow("scope not found"));
  }

  getById(id: number): Promise<ScopeRow> {
    return this.rows
      .then(rr => rr.find(r => r.id == id))
      .then(valueOrThrow("scope not found"));
  }

  private get(c: Partial<ScopeRow>) {
    return this.client
      .table<ScopeRow>("scopes")
      .where(c)
      .select("level", "id")
      .first()
      .then(valueOrThrow("scope not found"));
  }
}
