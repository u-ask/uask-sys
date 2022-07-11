import { builder } from "uask-dom";
import { UaskClient } from "./dist/client/pkce.js";
const b = builder();


b.options({
  "languages": [
    "en",
    "fr"
  ],
  "defaultLang": "en",
  "interviewDateVar": "VDATE",
  "phoneVar": "__PHONE",
  "emailVar": "__EMAIL",
  "showFillRate": true,
  "epro": false,
  "inclusionVar": {
    "name": "__INCLUDED",
    "hidden": false
  },
  "unitSuffix": "_UNIT",
  "workflowVar": "__WORKFLOW",
  "participantCodeStrategy": {
    "length": 5,
    "bySample": false
  }
})

b.survey("First-Survey")
  .pageSet("Questionnaire")
    .pages("Questions")
  .pageSet("HOME")
    .translate("en", "Synthesis")
    .pages("HOME")

b.page("Questions")
  .question("Ok?", "__INCLUDED", b.types.yesno)
  .question("When:", "INCLUSION_DATE", b.types.date())

b.page("HOME")
  .translate("en", "Synthesis")

b.workflow()
  .home("HOME")
  .initial("Questionnaire")

const cli = new UaskClient("http://127.0.0.1:3005")
await cli.surveyDriver.save(b.get()).finally(() => cli.destroy())