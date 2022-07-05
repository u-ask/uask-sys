import { ISurveyBuilder, PageSet, WorkflowBuilder } from "uask-dom";
import test from "tape";
import { workflowDeserialize, workflowSerialize } from "../json/index.js";
import {
  DerivedWorkflowGenerator,
  WorkflowGenerator,
} from "./workflowgenerator.js";

test("Generate a main workflow", t => {
  const workflowBuilder = new WorkflowBuilder("main", {});
  workflowBuilder
    .home("PS0")
    .initial("PS1", "PS2")
    .followUp("PS3")
    .end("PS4", "PS5")
    .auxiliary("PS6");
  const workflow = workflowBuilder.build([
    new PageSet("PS0"),
    new PageSet("PS1"),
    new PageSet("PS2"),
    new PageSet("PS3"),
    new PageSet("PS4"),
    new PageSet("PS5"),
    new PageSet("PS6"),
  ]);
  const json = workflowSerialize(workflow, {});
  const generator = new WorkflowGenerator();
  workflowDeserialize(
    { workflow: () => generator } as unknown as ISurveyBuilder,
    json
  );
  const dsl = generator.build();
  t.equal(
    dsl,
    `.home("PS0")
  .initial("PS1", "PS2")
  .followUp("PS3")
  .end("PS4", "PS5")
  .auxiliary("PS6")`
  );
  t.end();
});

test("Generate a participant workflow", t => {
  const workflowBuilder = new WorkflowBuilder("participant", {});
  workflowBuilder.followUp("PS3").notify("inclusion", "ae");
  const workflow = workflowBuilder.build([new PageSet("PS3")]);
  const json = workflowSerialize(workflow, {});
  const generator = new DerivedWorkflowGenerator();
  workflowDeserialize(
    { workflow: () => generator } as unknown as ISurveyBuilder,
    json
  );
  const dsl = generator.build();
  t.equal(
    dsl,
    `.withPageSets("PS3")
.notify("inclusion", "ae")`
  );
  t.end();
});
