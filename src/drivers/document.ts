import { DomainCollection, IDomainCollection, mlstring, Survey } from "uask-dom";

export class Document {
  readonly __keys__: { [key: string]: number } = {};
  readonly hash: number = 0;
  readonly content: Uint8Array = new Uint8Array();
  readonly visibility: "survey" | "participant" = "survey";

  constructor(
    readonly name: string,
    readonly title: mlstring,
    readonly tags?: IDomainCollection<mlstring>,
    kwargs?: Partial<Document>
  ) {
    Object.assign(this, kwargs);
    Object.freeze(this);
  }

  update(kwargs: Partial<Document>): Document {
    const { __keys__, ...others } = kwargs;
    if (Object.keys(others).length == 0) {
      Object.assign(this.__keys__, __keys__);
      return this;
    }
    return new Document(this.name, this.title, this.tags, {
      ...this,
      ...kwargs,
    });
  }
}

export type DocumentNode = Omit<Document, "content" | "update">;

export function getAllTags(documents: Document[]): IDomainCollection<mlstring> {
  return documents
    .reduce((res, d) => {
      if (d?.tags) res = res.append(...d.tags);
      return res;
    }, DomainCollection<mlstring>())
    .filter((value, index, it) => it.indexOf(value) === index);
}

export interface IDocumentDriver {
  save(survey: Survey, document: Document): Promise<Partial<Document>>;
  delete(survey: Survey, hash: number): Promise<void>;
  getByHash(survey: Survey, hash: number): Promise<Document>;
  getAll(survey: Survey): Promise<Document[]>;
  saveContent(survey: Survey, hash: number, content: Uint8Array): Promise<void>;
  getContent(
    survey: Survey,
    hash: number
  ): Promise<{
    content: Uint8Array;
    name: string;
  }>;
}
