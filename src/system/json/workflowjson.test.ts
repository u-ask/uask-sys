import { DNode, SurveyBuilder, Workflow } from "uask-dom";
import { exampleSurvey } from "uask-dom/example";
import test from "tape";
import { pageSetDeserialize, pageSetSerialize } from "./pagesetjson.js";
import { pageDeserialize, pageSerialize } from "./pagejson.js";
import { workflowSerialize, workflowDeserialize } from "./workflowjson.js";
import { pick } from "./pick.js";

test("Workflows serialization", t => {
  exampleSurvey.workflows.map(w => {
    const json = workflowSerialize(w, { defaultLang: "en" });
    const obj = pick(json);
    t.deepLooseEqual(obj, json);
    t.doesNotThrow(() => JSON.stringify(json));
  });
  t.end();
});

test("Workflows deserialization", t => {
  let main: DNode<Workflow> | undefined;
  exampleSurvey.workflows.map(w => {
    const builder = new SurveyBuilder();
    exampleSurvey.pageSets.forEach(s => {
      exampleSurvey.pages.forEach(p => {
        const jsonPages = pageSerialize(p, { defaultLang: "en" });
        pageDeserialize(builder, jsonPages);
      });
      const jsonPageSets = pageSetSerialize(s, { defaultLang: "en" });
      pageSetDeserialize(builder, jsonPageSets);
    });
    const json = workflowSerialize(w, { defaultLang: "en" });
    if (w.name == "main") {
      main = json;
    } else if (main != undefined) {
      workflowDeserialize(builder, main);
    }
    workflowDeserialize(builder, json);
    const obj = builder.build().workflows[w.name == "main" ? 0 : 1];
    t.deepLooseEqual(obj, w);
  });
  t.end();
});
