import restana, { Protocol, Router, Request, Response } from "restana";
import { DriverFactory } from "../factory.js";
import { Document } from "../../drivers/document.js";
import { IDomainCollection, mlstring } from "uask-dom";

export async function getDocumentByHash<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const hash = Number(req.params.hash);
      const document = await drivers.documentDriver.getByHash(survey, hash);
      res.send(document, 200, { "Content-Type": "application/json" });
    },
    { req, res }
  );
}

async function saveDocumentContent<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const hash = Number(req.params.hash);
      const content = new Uint8Array(req.body as Buffer);
      await drivers.documentDriver.saveContent(survey, hash, content);
      res.send({}, 200, { "Content-Type": "application/json" });
    },
    { req, res }
  );
}

async function getDocumentContent<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const hash = Number(req.params.hash);
      const { content, name } = await drivers.documentDriver.getContent(
        survey,
        hash
      );
      res.send(content, 200, {
        "Content-Type": "application/octet-stream",
        "Content-disposition": `attachment;filename=${name}`,
      });
    },
    { req, res }
  );
}

async function getAllDocuments<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const documents = await drivers.documentDriver.getAll(survey);
      res.send(documents, 200, { "Content-Type": "application/json" });
    },
    { req, res }
  );
}

async function saveDocument<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const hash = Number(req.params.hash);
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      const data = req.body as Record<string, unknown>;
      const { name, title, tags, ...kwargs } = data;
      const document = new Document(
        name as string,
        title as mlstring,
        tags as IDomainCollection<mlstring> | undefined,
        { ...kwargs }
      );
      if (!isNaN(hash) && hash != document.hash) {
        res.send({ error: "Wrong hash" }, 400, {
          "Content-Type": "application/json",
        });
      } else {
        const { hash: newHash } = await drivers.documentDriver.save(
          survey,
          document
        );
        const code = isNaN(hash) ? 201 : 200;
        res.send({ hash: newHash }, code, {
          "Content-Type": "application/json",
        });
      }
    },
    { req, res }
  );
}

async function deleteDocument<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async drivers => {
      const hash = Number(req.params.hash);
      const survey = await drivers.surveyDriver.getByName(req.params.survey);
      await drivers.documentDriver.delete(survey, hash);
      res.send({}, 200);
    },
    { req, res }
  );
}

export function documentRouter<P extends Protocol>(
  driverFactory: DriverFactory
): Router<P> {
  return restana<P>()
    .newRouter()
    .get("/:survey/all", async (req, res) => {
      await getAllDocuments(driverFactory, req, res);
    })
    .get("/:survey/:hash", async (req, res) => {
      await getDocumentByHash(driverFactory, req, res);
    })
    .post("/:survey/:hash/content", async (req, res) => {
      await saveDocumentContent(driverFactory, req, res);
    })
    .post("/:survey/:hash", async (req, res) => {
      await saveDocument(driverFactory, req, res);
    })
    .post("/:survey/create", async (req, res) => {
      await saveDocument(driverFactory, req, res);
    })
    .delete("/:survey/:hash", async (req, res) => {
      await deleteDocument(driverFactory, req, res);
    })
    .get("/:survey/:hash/content", async (req, res) => {
      await getDocumentContent(driverFactory, req, res);
    });
}
