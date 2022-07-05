import { DNode, Survey, SurveyBuilder } from "uask-dom";
import { surveyDeserialize } from "../json/surveyjson.js";
import { ISurveyDriver } from "../../drivers/index.js";
import { Store } from "./../store/index.js";

export class SurveyStoreDriver implements ISurveyDriver {
  constructor(private readonly store: Store) {}

  getByName(name: string): Promise<Survey> {
    return this.store.getSurveyNode(name).then(row => createSurvey(row));
  }

  async save(survey: Survey): Promise<Partial<Survey>> {
    const keys = await this.store.saveSurvey(survey);
    await this.store.savePages(survey);
    await this.store.savePageItems(survey);
    await this.store.savePageSets(survey);
    await this.store.saveIncludes(survey);
    await this.store.saveRules(survey);
    await this.store.saveWorkflows(survey);
    return keys;
  }
}

function createSurvey(node: DNode<Survey>): Survey {
  const builder = new SurveyBuilder();
  surveyDeserialize(builder, node);
  return builder.build();
}
