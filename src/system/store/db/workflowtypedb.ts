import { Knex } from "knex";
import { valueOrThrow } from "../../../tools.js";

export type WorkflowTypeRow = { type: string; id: number };

export class WorkflowTypeDriver {
  private rows: Promise<WorkflowTypeRow[]>;

  constructor(private client: Knex) {
    this.rows = this.client
      .table("workflowTypes")
      .then(rr => rr.map(r => ({ ...r, type: JSON.parse(r.type) })))
      .catch(() => []);
  }

  getAll(): Promise<WorkflowTypeRow[]> {
    return this.rows;
  }

  async getByType(type: string): Promise<WorkflowTypeRow> {
    return this.rows
      .then(rr => rr.find(r => r.type == type))
      .then(valueOrThrow("workflow type not found"));
  }

  async getById(id: number): Promise<WorkflowTypeRow> {
    return this.rows
      .then(rr => rr.find(r => r.id == id))
      .then(valueOrThrow("workflow type not found"));
  }
}
