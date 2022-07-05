import { Survey } from "uask-dom";
import { Document, IDocumentDriver } from "../../client.js";
import { doImport } from "./surveyex.js";

export class DocumentExampleDriver implements IDocumentDriver {
  save(survey: Survey, document: Document): Promise<Partial<Document>> {
    return doImport(survey.name).then(i => {
      const x = i.documents.findIndex(d => d.hash == document.hash);
      if (x == -1) i.documents.push(document);
      else i.documents[x] = document;
      return document;
    });
  }

  delete(survey: Survey, hash: number): Promise<void> {
    return doImport(survey.name).then(i => {
      const index = i.documents.findIndex(d => d.hash == hash);
      if (index == -1) Promise.reject("unknown document");
      i.documents.splice(index, 1);
    });
  }

  getByHash(survey: Survey, hash: number): Promise<Document> {
    return doImport(survey.name)
      .then(i => i.documents.find(d => d.hash == hash))
      .then(d => d ?? Promise.reject("unknown document"));
  }

  getAll(survey: Survey): Promise<Document[]> {
    return doImport(survey.name).then(i => [...i.documents]);
  }

  saveContent(survey: Survey, hash: number, content: Uint8Array): Promise<void> {
    return doImport(survey.name).then(i => {
      const x = i.documents.findIndex(d => d.hash == hash);
      if (x == -1) Promise.reject("unknown document");
      else i.documents[x] = i.documents[x].update({ content });
    });
  }

  getContent(
    survey: Survey,
    hash: number
  ): Promise<{
    content: Uint8Array;
    name: string;
  }> {
    return doImport(survey.name)
      .then(i => i.documents.find(d => d.hash == hash))
      .then(d =>
        d
          ? { content: d?.content, name: d.name } ??
            Promise.reject("no content document")
          : Promise.reject("unknown document")
      );
  }
}
