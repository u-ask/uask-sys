import { Knex } from "knex";
import { valueOrThrow } from "../../../tools.js";

type ItemTypeRow = { name: string; id: number };
export class ItemTypeDriver {
  rows: Promise<ItemTypeRow[]>;

  constructor(private client: Knex) {
    this.rows = this.client
      .table<ItemTypeRow>("itemTypes")
      .then(r => r)
      .catch(() => []);
  }

  async getAll(): Promise<ItemTypeRow[]> {
    return this.rows;
  }

  async getById(id: number): Promise<ItemTypeRow> {
    return this.rows
      .then(rr => rr.find(r => r.id == id))
      .then(valueOrThrow("type not found"));
  }

  async getByName(name: string): Promise<ItemTypeRow> {
    return this.rows
      .then(rr => rr.find(r => r.name == name))
      .then(valueOrThrow("type not found"));
  }
}
