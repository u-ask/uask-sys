import { Got } from "got";
import { DNode, Survey, SurveyBuilder } from "uask-dom";
import { ISurveyDriver } from "../drivers/index.js";
import { handleClientError } from "../system/errors.js";
import { surveyDeserialize, surveySerialize } from "../system/json/index.js";

class SurveyWebDriver implements ISurveyDriver {
  constructor(private client: Got) {}

  getByName(name: string): Promise<Survey> {
    const b = new SurveyBuilder();
    const query = "query ($name:String!){survey(name:$name)}";
    const variables = JSON.stringify({ name });
    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { survey: DNode<Survey> } }>()
      .then(response => {
        surveyDeserialize(b, response.data.survey);
        return b.build();
      })
      .catch(async error => await handleClientError(error));
  }

  save(survey: Survey): Promise<Partial<Survey>> {
    const b = new SurveyBuilder();
    const query = {
      query:
        "mutation ($name: String!, $survey: Json!){ saveSurvey(name: $name, survey: $survey) }",
      variables: { name: survey.name, survey: surveySerialize(survey) },
    };
    return this.client
      .post("graphql", { json: query })
      .json<{ data: { saveSurvey: DNode<Survey> } }>()
      .then(response => {
        surveyDeserialize(b, response.data.saveSurvey);
        return b.build();
      })
      .catch(async error => await handleClientError(error));
  }
}

export { SurveyWebDriver };
