import {
  Survey,
  SurveyOptions,
  ISurveyBuilder,
  DNode,
  SurveyBuilder,
} from "uask-dom";
import { pageDeserialize, pageSerialize } from "./pagejson.js";
import { pageSetDeserialize, pageSetSerialize } from "./pagesetjson.js";
import "../aspect/index.js";
import { trakDeserialize } from "./track.js";
import { workflowSerialize, workflowDeserialize } from "./workflowjson.js";
import { crossRuleDeserialize, crossRuleSerialize } from "./crossrulejson.js";

export function surveyDeserialize(b: ISurveyBuilder, survey: DNode<Survey>): void {
  b.options(survey.config as Partial<SurveyOptions>);
  b.survey(survey.name as string);

  survey.pageSets.forEach(v => pageSetDeserialize(b, v));
  survey.pages.forEach(p => pageDeserialize(b, p));

  survey.crossRules.forEach(r => crossRuleDeserialize(b, r));
  survey.workflows.forEach(w => workflowDeserialize(b, w));

  trakDeserialize(b, survey);
}

export function surveySerialize(survey: Survey, track = true): DNode<Survey> {
  const {
    options,
    workflows,
    pageSets,
    pages,
    crossRules,
    __keys__,
    __changes__,
    ...node
  } = survey;
  const trackInfos = track ? { __keys__, __changes__ } : {};
  return Object.assign(node, {
    config: options,
    workflows: [
      ...workflows.map(w => workflowSerialize(w, survey.options, track)),
    ],
    pageSets: [...pageSets.map(v => pageSetSerialize(v, survey.options, track))],
    pages: [...pages.map(p => pageSerialize(p, survey.options, track))],
    crossRules: [...crossRules.map(crossRuleSerialize)],
    ...trackInfos,
  });
}

export function clone(survey: Survey): SurveyBuilder {
  const surveyBuilder = new SurveyBuilder();
  const surveyNode = surveySerialize(survey, false);
  surveyDeserialize(surveyBuilder, surveyNode);
  return surveyBuilder;
}
