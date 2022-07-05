import { SurveyTableSet } from "uask-dom";
import test from "tape";
import { ExampleDrivers, P11_05, P11_05_Participants } from "../../client-example.js";
import { addAuditProps } from "./dataset.js";

test("Add creator to dataset tables #329", async t => {
  const surveyTableSet = new SurveyTableSet(P11_05, P11_05_Participants);
  const tableSet = await addAuditProps(
    surveyTableSet,
    P11_05,
    new ExampleDrivers().auditDriver
  );
  const auditedTables = tableSet.tables.filter(t =>
    t.header.includes("WEIGHT")
  );
  t.true(
    auditedTables.every(t => {
      const weight = t.header.indexOf("WEIGHT");
      return t.rows
        .filter(r => !!r.elements[weight])
        .every(
          r => r.elements[r.elements.length - 1] == "hmonceau@example.com"
        );
    })
  );
  t.end();
});
