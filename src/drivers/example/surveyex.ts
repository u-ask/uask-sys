import { Participant, Sample, Survey, User } from "uask-dom";
import { UaskError, ISurveyDriver } from "../../client.js";
import { Document } from "../document.js";
import * as example from "./example.js";

type DB = {
  survey: Survey;
  participants: Participant[];
  samples: Sample[];
  users: User[];
  documents: Document[];
};

export class SurveyExampleDriver implements ISurveyDriver {
  static P11_06: Survey | undefined = undefined;

  constructor() {
    SurveyExampleDriver.P11_06 = undefined;
  }

  getByName(name: string): Promise<Survey> {
    return doImport(name).then(i => i.survey);
  }

  save(survey: Survey): Promise<Partial<Survey>> {
    if (survey.name == "P11-06")
      SurveyExampleDriver.P11_06 = survey.update({ __untrack__: true });
    else throw "cannot save non example survey";
    return Promise.resolve(SurveyExampleDriver.P11_06);
  }
}

export function doImport(name: string): Promise<DB> {
  switch (name) {
    case "P11-05":
      return Promise.resolve({
        survey: example.P11_05,
        participants: example.P11_05_Participants,
        samples: example.P11_05_Samples,
        users: example.P11_05_Users,
        documents: example.P11_05_Documents,
      });
    case "P11-06":
      if (SurveyExampleDriver.P11_06)
        return Promise.resolve({
          survey: SurveyExampleDriver.P11_06,
          participants: [],
          samples: [],
          documents: [],
          users: [],
        });
      return Promise.reject(
        new UaskError({ code: "NOT_FOUND", message: "unknown survey" })
      );
    default:
      return Promise.reject(
        new UaskError({ code: "NOT_FOUND", message: "unknown survey" })
      );
  }
}
