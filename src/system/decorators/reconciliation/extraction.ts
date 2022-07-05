import {
  DNode,
  IDomainCollection,
  Include,
  Interview,
  Library,
  Page,
  PageItem,
  PageSet,
  Participant,
  Survey,
  SurveyBuilder,
  Workflow,
} from "uask-dom";
import { Keys } from "../../aspect/keys.js";
import {
  pageSerialize,
  pageSetSerialize,
  surveyDeserialize,
  surveySerialize,
  workflowSerialize,
} from "../../json/index.js";

// extract last version from given survey
export function extractSurvey(survey: Survey): Survey {
  const checkVersion = getVersionChecker(survey);
  if (checkVersion) {
    return extractSurvey4Version(survey, checkVersion);
  }
  return survey;
}

function extractSurvey4Version(
  survey: Survey,
  checkVersion: (k: Keys) => boolean
) {
  const surveyNode = surveySerialize(survey);
  const pageNodes = getPageNodes4Version(survey, checkVersion);
  const pageSetNodes = getPageSetNodes4Version(survey, checkVersion);
  const workflowNodes = getWorkflowNodes4Version(survey, checkVersion);
  return reconstructSurvey(surveyNode, pageNodes, pageSetNodes, workflowNodes);
}

function getVersionChecker(survey: Survey) {
  const surveyVersion = survey.__keys__?.version;
  return surveyVersion
    ? (k: Keys) => k.__keys__?.version == surveyVersion
    : undefined;
}

function getPageNodes4Version(
  survey: Survey,
  checkVersion: (k: Keys) => boolean
) {
  return survey.pages
    .filter(checkVersion)
    .update(p => extractPage4Version(p, checkVersion))
    .map(p => pageSerialize(p, survey.options));
}

function extractPage4Version(
  page: Page,
  checkVersion: (k: Keys) => boolean
): Page {
  return page.update({
    includes: page.includes
      .filter(i =>
        i instanceof PageItem
          ? checkVersion(i)
          : checkLibraryVersion(i, checkVersion)
      )
      .map(i => extractPageItem4Version(i, checkVersion)),
  });
}

function checkLibraryVersion(l: Library, checkVersion: (k: Keys) => boolean) {
  return (
    (l.pageItems == undefined || l.pageItems.some(checkVersion)) &&
    (l.contexts == undefined || l.contexts?.some(c => checkVersion(c.pageItem)))
  );
}

function extractPageItem4Version(
  i: Include,
  checkVersion: (k: Keys) => boolean
) {
  return i instanceof PageItem
    ? i
    : new Library(
        i.page,
        i.pageItems?.filter(checkVersion),
        i.contexts?.filter(c => checkVersion(c.pageItem))
      );
}

function getPageSetNodes4Version(
  survey: Survey,
  checkVersion: (k: Keys) => boolean
) {
  return survey.pageSets
    .filter(checkVersion)
    .update(p => extractPageSet4Version(p, checkVersion))
    .map(p => pageSetSerialize(p, survey.options));
}

function extractPageSet4Version(
  pageSet: PageSet,
  checkVersion: (k: Keys) => boolean
): PageSet {
  return pageSet.update({
    pages: pageSet.pages.filter(checkVersion),
  });
}

function getWorkflowNodes4Version(
  survey: Survey,
  checkVersion: (k: Keys) => boolean
) {
  return survey.workflows
    .filter(checkVersion)
    .map(w => extractWorkflow4Version(w, checkVersion))
    .map(w => workflowSerialize(w, survey.options));
}

function extractWorkflow4Version(
  workflow: Workflow,
  checkVersion: (k: Keys) => boolean
): Workflow {
  return workflow.update({
    single: workflow.single.filter(checkVersion),
    many: workflow.many.filter(checkVersion),
    sequence: workflow.sequence.filter(checkVersion),
    stop: workflow.stop.filter(checkVersion),
  });
}

function reconstructSurvey(
  surveyNode: DNode<Survey>,
  pageNodes: IDomainCollection<DNode<Page>>,
  pageSetNodes: IDomainCollection<DNode<PageSet>>,
  workflowNodes: IDomainCollection<DNode<Workflow>>
) {
  const surveyBuilder = new SurveyBuilder();
  surveyDeserialize(surveyBuilder, {
    ...surveyNode,
    pages: [...pageNodes],
    pageSets: [...pageSetNodes],
    workflows: [...workflowNodes],
  });
  return surveyBuilder.build();
}

export function extractInterview(interview: Interview): Interview {
  const items = interview.items.filter(
    i => interview.pageSet.getPagesForItem(i).length > 0
  );
  return interview.update({ items });
}

export function extractParticipant4Survey(participant: Participant, survey: Survey): Participant {
  const interviews = participant.interviews
    .filter(i => survey.pageSets.includes(i.pageSet))
    .map(i => extractInterview(i));
  return participant.update({ interviews });
}
