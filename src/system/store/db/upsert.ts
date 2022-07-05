import { Knex } from "knex";
import { UaskError } from "../../errors.js";
import { Keys } from "../../aspect/index.js";

type R<
  T,
  S extends "insert" | "update"
> = T extends Knex.CompositeTableType<unknown>
  ? Knex.ResolveTableType<T, S>
  : Knex.DbRecordArr<T>;

type K<T> = (string & keyof T)[];

export function upsert<T>(
  driver: { readonly table: Knex.QueryBuilder<T> },
  row: Knex.DbRecordArr<T> & {
    id?: number;
    version?: number;
    surveyId?: number;
    participantId?: number;
  },
  keys: string[] = ["id"]
): Promise<Keys & { __untrack__: true }> {
  const k = Object.entries(row).reduce(
    (result, [k, v]) => (keys.includes(k) ? { ...result, [k]: v } : result),
    {}
  );
  return driver.table
    .insert(row as R<T, "insert">)
    .onConflict(keys as K<T>)
    .merge()
    .returning<(number | { id: number })[]>(keys)
    .then(result => {
      const [r] = result;
      const rid = typeof r == "object" && "id" in r ? r.id : r;
      const id = "id" in row ? row.id ?? rid : undefined;
      return {
        __keys__: {
          ...k,
          ...(id ? { id } : {}),
          ...(row.version ? { version: row.version } : {}),
          ...(row.surveyId ? { surveyId: row.surveyId } : {}),
          ...(row.participantId ? { participantId: row.participantId } : {}),
        },
        __untrack__: <const>true,
      };
    })
    .catch(err => {
      return Promise.reject(new UaskError(err));
    });
}

export async function upsertChilds<T>(
  driver: { childTable: Knex.QueryBuilder<T> },
  childRows: Knex.DbRecordArr<T>[],
  keys: string[]
): Promise<void> {
  if (childRows.length > 0)
    await driver.childTable
      .insert(childRows as unknown as R<T, "insert">)
      .onConflict(keys as K<T>)
      .merge()
      .catch(err => {
        return Promise.reject(new UaskError(err));
      });
}
