import {
  DomainCollection,
  IDomainCollection,
  mlstring,
  Survey,
} from "uask-dom";
import {
  Document,
  DocumentNode,
  IDocumentDriver,
} from "../../drivers/document.js";
import { KeyMap } from "../aspect/keys.js";
import { Store } from "./../store/index.js";
import fnv from "@sindresorhus/fnv1a";

export class DocumentStoreDriver implements IDocumentDriver {
  constructor(private readonly store: Store) {}

  save(survey: Survey, document: Document): Promise<Partial<Document>> {
    const hash = this.h(survey, document);
    return this.store
      .saveDocument(survey, document.update({ hash }))
      .then(k => ({ ...k, hash }));
  }

  delete(survey: Survey, hash: number): Promise<void> {
    return this.store.deleteDocument(hash, survey.__keys__ as KeyMap);
  }

  getByHash(survey: Survey, hash: number): Promise<Document> {
    return this.store
      .getDocumentNode(hash, survey.__keys__ as KeyMap)
      .then(node => createDocument(node));
  }

  getAll(survey: Survey): Promise<Document[]> {
    return this.store
      .getDocumentNodes(survey.__keys__ as KeyMap)
      .then(nodes => nodes.map(node => createDocument(node)));
  }

  async saveContent(
    survey: Survey,
    hash: number,
    content: Uint8Array
  ): Promise<void> {
    const document = await this.getByHash(survey, hash);
    this.store.saveDocument(survey, document.update({ content }));
  }

  async getContent(
    survey: Survey,
    hash: number
  ): Promise<{
    content: Uint8Array;
    name: string;
  }> {
    return this.store.getDocumentContent(survey.__keys__ as KeyMap, hash);
  }

  private h(survey: Survey, document: Document): number {
    return Number(
      fnv([survey.__keys__?.id, document.name, document.title].join(","))
    );
  }
}

function createDocument(node: DocumentNode): Document {
  const { name, title, tags, ...other } = node;
  return new Document(
    name,
    title,
    tags
      ? DomainCollection(...(tags as IDomainCollection<mlstring>))
      : undefined,
    { ...other }
  );
}
