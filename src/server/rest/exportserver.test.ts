import { SurveyTableSet } from "uask-dom";
import test from "tape";
import { ExampleDrivers, seedExample } from "../../drivers/example/index.js";
import { toArchive, toCSV } from "./exportserver.js";
import temp from "temp";
import AdmZip from "adm-zip";
import { parse } from "csv-parse";

temp.track();
test.onFinish(() => temp.cleanup());

test("Export table to csv", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participants = await drivers.participantDriver.getAll(survey, samples);
  const page = survey.pages[1];
  const surveyDataset = new SurveyTableSet(survey, participants, "fr");
  const csv = await new Promise<string>(r => {
    let data = "";
    const stream = toCSV(surveyDataset.tables[0]);
    stream.on("data", d => (data += d.toString())).on("end", () => r(data));
  });
  const data = csv.split("\n").filter(l => l.length > 0);
  const expectedCount = participants.reduce(
    (count, p) =>
      count + p.interviews.filter(i => i.pageSet.pages.includes(page)).length,
    1
  );
  t.equal(data.length, expectedCount);
  t.end();
});

test("Export table set to zip", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const samples = await drivers.sampleDriver.getAll(survey);
  const participants = await drivers.participantDriver.getAll(survey, samples);
  const stream = toArchive(new SurveyTableSet(survey, participants, "fr"));
  const file = temp.createWriteStream({ suffix: ".zip" });
  await new Promise<string>(r => {
    stream.pipe(file).on("close", r);
  });
  file.close();
  const zip = new AdmZip(file.path);
  t.equal(zip.getEntries().length, 11);
  const buffer = zip.getEntries()[0].getData();
  const data = await getData(buffer);
  if (data) t.equal(data.length, 8);
  t.end();
});

async function getData(buffer: Buffer) {
  return await new Promise<unknown[]>(r => {
    const data: unknown[] = [];
    const parser = parse({
      delimiter: "fr",
    });
    parser
      .on("readable", () => {
        let record;
        while ((record = parser.read())) {
          data.push(record);
        }
      })
      .on("error", err => console.log(err.message))
      .on("end", () => r(data));
    parser.write(buffer);
    parser.end();
  });
}
