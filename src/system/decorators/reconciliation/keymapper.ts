import { getTranslation, mlstring, PageSet, Survey, Workflow } from "uask-dom";
import { ISurveyDriver } from "../../../drivers/index.js";
import { KeyMap } from "../../aspect/keys.js";

export class KeyMapper {
  private readonly survey: Promise<Survey | undefined>;

  constructor(driver: ISurveyDriver, surveyName: string) {
    this.survey = driver.getByName(surveyName).catch(r => {
      return r.message == "unknown survey" ? undefined : Promise.reject(r);
    });
  }

  async getSurveyKeys(): Promise<KeyMap> {
    return this.survey.then(s => s?.__keys__ ?? {});
  }

  async getWorkflowKeys(workflow: Workflow): Promise<KeyMap> {
    return this.survey.then(
      survey =>
        survey?.workflows.find(w => w.name == workflow.name)?.__keys__ ?? {}
    );
  }

  async getPageSetKeys(pageSet: PageSet): Promise<KeyMap> {
    return this.survey.then(
      survey =>
        survey?.pageSets.find(
          pS =>
            getTranslation(pS.type, "__code__", survey.options.defaultLang) ==
            getTranslation(pageSet.type, "__code__", survey.options.defaultLang)
        )?.__keys__ ?? {}
    );
  }

  async getPageKeys(pageName: mlstring): Promise<KeyMap> {
    return this.survey.then(
      survey =>
        survey?.pages.find(
          page =>
            getTranslation(page.name, "__code__", survey.options.defaultLang) ==
            getTranslation(pageName, "__code__", survey.options.defaultLang)
        )?.__keys__ ?? {}
    );
  }

  async getPageItemKeys(variableName: mlstring): Promise<KeyMap> {
    return this.survey.then(
      survey =>
        survey?.items.find(item => item.variableName == variableName)
          ?.__keys__ ?? {}
    );
  }
}
