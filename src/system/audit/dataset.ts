import { IRow, ITable, ITableSet, Survey } from "uask-dom";
import { AuditRecord, IAuditDriver } from "../../drivers/audit.js";

export function addAuditProps(
  adaptee: ITableSet,
  survey: Survey,
  driver: IAuditDriver
): Promise<ITableSet> {
  const creatorMap = new Map<string, AuditRecord[]>();

  return new Promise(res => {
    getTables(adaptee).then(tables => {
      const tableSet: ITableSet = {
        name: adaptee.name,
        locale: adaptee.locale,
        tables,
      };
      res(tableSet);
    });
  });

  async function getTables(adaptee: ITableSet) {
    const tables = [];
    for (const table of adaptee.tables) tables.push(await addCreators(table));
    return tables;
  }

  async function addCreators(table: ITable): Promise<ITable> {
    const header = [...table.header, "CREATOR"];
    const rows = [];
    for (const row of table.rows) rows.push(await addCreator(row));
    return { ...table, header, rows };
  }

  async function addCreator(r: IRow): Promise<IRow> {
    return {
      ...r,
      elements: [...r.elements, await getCreator(r.participantCode, r.nonce)],
    };
  }

  async function getCreator(
    participantCode: string,
    nonce: number
  ): Promise<string> {
    const records = await getRecords(participantCode);
    const record = records.find(r => r.target.nonce == nonce);
    if (typeof record == "undefined") return "";
    return record.user.email ?? record.user.name ?? record.user;
  }

  async function getRecords(participantCode: string): Promise<AuditRecord[]> {
    const cached = creatorMap.get(participantCode);
    if (typeof cached != "undefined") return cached;
    const records = await driver.get(survey, {
      participantCode,
      variableName: null,
      instance: null,
    });
    creatorMap.set(participantCode, records);
    return records;
  }
}
