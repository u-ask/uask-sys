import { Test } from "tape";
import { P11_05_Documents } from "../example/index.js";
import { IDrivers, Document } from "../index.js";

export async function testDocumentSave(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const document = new Document("TEST", "Test", undefined);
  const doc = await drivers.documentDriver.save(survey, document);
  const d = await drivers.documentDriver.getByHash(survey, doc.hash as number);
  t.deepLooseEqual(d, { ...document.update(doc) });
}

export async function testDocumentSaveContent(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const document = new Document("TEST", "Test", undefined);
  const { hash } = await drivers.documentDriver.save(survey, document);
  await drivers.documentDriver.saveContent(
    survey,
    hash as number,
    new Uint8Array([21, 31])
  );
  const { content: contentDocDb, name } =
    await drivers.documentDriver.getContent(survey, hash as number);
  t.true(contentDocDb);
  t.deepEquals(name, document.name);
}

export async function testDocumentDelete(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const document = new Document("TEST", "Test", undefined);
  const doc = await drivers.documentDriver.save(survey, document);
  await drivers.documentDriver.delete(survey, doc.hash as number);
  await drivers.documentDriver
    .getByHash(survey, doc.hash as number)
    .then(() => t.fail(), t.pass);
}

export async function testDocumentGetNameAndContent(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const document = new Document("TEST", "Test", undefined, {
    hash: 1234,
    content: new Uint8Array([21, 31]),
  });
  const doc = await drivers.documentDriver.save(survey, document);
  const { content: contentDocDb, name } =
    await drivers.documentDriver.getContent(survey, doc.hash as number);
  t.true(contentDocDb);
  t.deepEquals(name, document.name);
}

export async function testDocumentGetByHash(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const hash = P11_05_Documents[0].hash;
  const document = await drivers.documentDriver.getByHash(survey, hash);
  t.equal(String(document.hash), String(hash));
}

export async function testDocumentNotFound(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  await drivers.documentDriver
    .getByHash(survey, 1112212121)
    .then(() => t.fail(), t.pass);
}

export async function testDocumentUpdate(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const document = new Document("TEST", "Test", undefined, { hash: 1234 });
  const { hash } = await drivers.documentDriver.save(survey, document);
  const docBeforeUpdate = await drivers.documentDriver.getByHash(
    survey,
    hash as number
  );
  const docUpdated = docBeforeUpdate.update({ name: "UPDATED" });
  const { hash: hashUpdated } = await drivers.documentDriver.save(
    survey,
    docUpdated
  );
  const dbDoc = await drivers.documentDriver.getByHash(
    survey,
    hashUpdated as number
  );
  t.equal(dbDoc.name, docUpdated.name);
  t.deepEqual(dbDoc.title, docUpdated.title);
  t.deepEqual(dbDoc.tags, docUpdated.tags);
}

export async function testDocumentGetAll(
  drivers: IDrivers,
  t: Test
): Promise<void> {
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const documents = await drivers.documentDriver.getAll(survey);
  t.deepEqual(documents.length, 3);
}
