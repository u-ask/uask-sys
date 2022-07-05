import { Survey } from "uask-dom";

interface ISurveyDriver {
  getByName(name: string): Promise<Survey>;
  save(survey: Survey): Promise<Partial<Survey>>;
}

export { ISurveyDriver };
