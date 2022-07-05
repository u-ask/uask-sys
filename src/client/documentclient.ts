import { IDocumentDriver } from "../drivers/index.js";
import { Got } from "got";
import { Survey } from "uask-dom";
import { Document } from "../drivers/document.js";

export class DocumentWebDriver implements IDocumentDriver {
  constructor(private client: Got) {}

  save(survey: Survey, document: Document): Promise<Partial<Document>> {
    const route = `document/${survey.name}/${document.hash}`;
    return this.client
      .post(route, { json: document })
      .json<Partial<Document>>();
  }

  delete(survey: Survey, hash: number): Promise<void> {
    throw new Error(`Use delete endpoint /document/${survey.name}/${hash}`);
  }

  getByHash(survey: Survey, hash: number): Promise<Document> {
    const query = `document/${survey.name}/${hash}`;
    return this.client
      .get(query)
      .json<Document>()
      .then(d => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { name, title, tags, content, ...other } = d;
        return new Document(name, title, tags, { ...other });
      });
  }

  getAll(survey: Survey): Promise<Document[]> {
    const query = `document/${survey.name}/all`;
    return this.client
      .get(query)
      .json<Document[]>()
      .then(response =>
        response.map(d => {
          const { name, title, tags, ...other } = d;
          return new Document(name, title, tags, { ...other });
        })
      );
  }

  saveContent(survey: Survey, hash: number): Promise<void> {
    throw new Error(
      `Use upload endpoint /document/${survey.name}/${hash}/content`
    );
  }

  getContent(
    survey: Survey,
    hash: number
  ): Promise<{ content: Uint8Array; name: string }> {
    throw new Error(
      `Use download endpoint /document/${survey.name}/${hash}/content`
    );
  }
}
