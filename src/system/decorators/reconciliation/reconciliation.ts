import { Survey } from "uask-dom";
import { ISurveyDriver } from "../../../drivers/index.js";
import "../../aspect/index.js";
import { KeyMap } from "../../aspect/keys.js";
import { KeyMapper } from "./keymapper.js";

// set keys into given survey from stored survey of same name
export async function reconcileSurvey(
  driver: ISurveyDriver,
  survey: Survey
): Promise<Survey> {
  const reconciler = await getReconcilier(driver, survey);
  if (reconciler) {
    reconcileSurveyKeys(survey, ...reconciler);
    await reconcileWorkflowKeys(survey, ...reconciler);
    await reconcilePageSetKeys(survey, ...reconciler);
    await reconcilePageKeys(survey, ...reconciler);
    await reconcilePageItemKeys(survey, ...reconciler);
  }
  return survey;
}

async function getReconcilier(driver: ISurveyDriver, survey: Survey) {
  const keyMapper = new KeyMapper(driver, survey.name);
  const surveyKeys = await keyMapper.getSurveyKeys();
  if (surveyKeys) {
    const versionSetter = getVersionSetter(surveyKeys);
    return <const>[keyMapper, versionSetter];
  }
}

function getVersionSetter(surveyKeys: KeyMap) {
  const surveyVersion = { version: (surveyKeys?.version ?? 0) + 1 };
  return (k?: KeyMap) => {
    return Object.assign(k as KeyMap, surveyVersion);
  };
}

async function reconcileSurveyKeys(
  survey: Survey,
  keyMapper: KeyMapper,
  setVersion: (k?: KeyMap) => KeyMap & { version: number }
) {
  const surveyKeys = await keyMapper.getSurveyKeys();
  survey.update({
    __keys__: setVersion(surveyKeys),
    __untrack__: true,
  });
}

function reconcileWorkflowKeys(
  survey: Survey,
  keyMapper: KeyMapper,
  setVersion: (k?: KeyMap) => KeyMap & { version: number }
) {
  return Promise.all(
    survey.workflows.map(async w => {
      const dbKeys = await keyMapper.getWorkflowKeys(w).then(setVersion);
      w.update({ __keys__: dbKeys, __untrack__: true });
    })
  );
}

function reconcilePageSetKeys(
  survey: Survey,
  keyMapper: KeyMapper,
  setVersion: (k?: KeyMap) => KeyMap & { version: number }
) {
  return Promise.all(
    survey.pageSets.map(async pS => {
      const dbKeys = await keyMapper.getPageSetKeys(pS).then(setVersion);
      pS.update({ __keys__: dbKeys, __untrack__: true });
    })
  );
}

function reconcilePageKeys(
  survey: Survey,
  keyMapper: KeyMapper,
  setVersion: (k?: KeyMap) => KeyMap & { version: number }
) {
  return Promise.all(
    survey.pages.map(async p => {
      const dbKeys = await keyMapper.getPageKeys(p.name).then(setVersion);
      p.update({ __keys__: dbKeys, __untrack__: true });
    })
  );
}

function reconcilePageItemKeys(
  survey: Survey,
  keyMapper: KeyMapper,
  setVersion: (k?: KeyMap) => KeyMap & { version: number }
) {
  return Promise.all(
    survey.items.map(async i => {
      const dbKeys = await keyMapper
        .getPageItemKeys(i.variableName)
        .then(setVersion);
      i.update({ __keys__: dbKeys, __untrack__: true });
    })
  );
}
