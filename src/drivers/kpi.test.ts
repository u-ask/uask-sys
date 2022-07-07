import test from "tape";
import { IParticipantSummary, KPISet } from "uask-dom";
import { getKPIForUnknownConditional } from "./kpi.js";
import { ExampleDrivers, seedExample } from "./example/index.js";

test("KPI drivers : get all kpis #319", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const [kpis] = await drivers.kpiDriver.getAll(survey);
  const variableNames = kpis
    .slice(1)
    .map(k => k.datasource.column.variableName);
  t.deepEqual(variableNames, [
    "AGE",
    "COU",
    "LEGLOC",
    "LEGSTATUS",
    "YEAR|WORK=Cuisinier",
    "YEAR|WORK=Secrétaire",
  ]);
  const titles = kpis.slice(1).map(k => k.title);
  t.deepEqual(titles, [
    { en: "Legal Age", fr: "Majorité" },
    { en: "Country", fr: "Pays" },
    { en: "Leg ulcer localization", fr: "Localisation de la tumeur" },
    { en: "Leg ulcer status", fr: "Status de la tumeur" },
    { en: "Year|WORK=Cuisinier", fr: "Année|WORK=Cuisinier" },
    { en: "Year|WORK=Secrétaire", fr: "Année|WORK=Secrétaire" },
  ]);
  t.end();
});

test("KPI drivers : get unknown conditional #319", async t => {
  seedExample();
  const drivers = new ExampleDrivers();
  const survey = await drivers.surveyDriver.getByName("P11-05");
  const summaries = await drivers.summaryDriver.getAll(
    survey,
    undefined,
    ["kpis"]
  );
  const kpiSet = new KPISet(survey, summaries as IParticipantSummary[], {
    sample: true,
  });
  const kpi = getKPIForUnknownConditional(
    survey,
    kpiSet,
    "@SAMPLE",
    "YEAR|WORK=Informaticien"
  );
  t.deepLooseEqual(kpi.title, {
    en: "Year|WORK=Informaticien",
    fr: "Année|WORK=Informaticien",
  });
  t.end();
});
