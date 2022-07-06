import { stringify, Options } from "csv-stringify";
import archiver from "archiver";

import { ITable, ITableSet, SurveyTableSet, Sample } from "uask-dom";
import { Readable } from "stream";
import restana, { Protocol, Router, Request, Response } from "restana";
import { DriverFactory } from "../factory.js";
import { addAuditProps } from "../../system/audit/dataset.js";

export function toCSV(table: ITable, locale?: string): Readable {
  const options = csvOptions(locale);
  const stream = stringify({ columns: [...table.header], ...options });
  const elements = table.rows.map(r => r.elements);
  return Readable.from(elements).pipe(stream);
}

export function csvOptions(locale?: string): Options {
  return {
    header: true,
    cast: {
      date: d => (locale ? d.toLocaleDateString(locale) : d.toISOString()),
      number: n => (locale ? n.toLocaleString(locale) : n.toString()),
      boolean: b => (b ? "1" : "0"),
    },
    delimiter: (1.2).toLocaleString(locale) == "1,2" ? ";" : ",",
  };
}

export function toArchive(
  tableSet: ITableSet,
  locale = tableSet.locale
): Readable {
  const archive = archiver("zip");
  const zip = tableSet.tables.reduce(
    (zip, t, i) =>
      zip.append(toCSV(t, locale), {
        name: (t.name ?? `${tableSet.name}_${i}`) + ".csv",
      }),
    archive
  );
  zip.finalize();
  return zip;
}

export async function getArchiveByName<P extends Protocol>(
  driverFactory: DriverFactory,
  req: Request<P>,
  res: Response<P>
): Promise<void> {
  return driverFactory(
    async (drivers, userid) => {
      const survey = await drivers.surveyDriver.getByName(req.params.name);
      const allsamples = await drivers.sampleDriver.getAll(survey);
      const user = await drivers.userDriver.getByUserId(survey, userid);

      const participants = req.params.sampleCode
        ? await drivers.participantDriver.getBySample(
            survey,
            allsamples.find(
              s => s.sampleCode == req.params.sampleCode
            ) as Sample
          )
        : await drivers.participantDriver
            .getAll(survey, allsamples)
            .then(r =>
              r.filter(p => user?.sampleCodes?.includes(p.sample.sampleCode))
            );

      const surveyDataset = new SurveyTableSet(survey, participants);
      const auditDataset = await addAuditProps(
        surveyDataset,
        survey,
        drivers.auditDriver
      );
      const stream = toArchive(auditDataset);
      res.writeHead(200, {
        "Content-Type": "zip",
        "Content-disposition": `attachment;filename=${survey.name}.zip`,
      });
      stream.pipe(res as NodeJS.WritableStream);
    },
    { req, res }
  );
}

export function exportRouter<P extends Protocol>(
  driverFactory: DriverFactory
): Router<P> {
  return restana<P>()
    .newRouter()
    .get("/:name/:sampleCode?", async (req, res) => {
      await getArchiveByName(driverFactory, req, res);
    });
}
