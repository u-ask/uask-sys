import { Participant, Sample, Survey } from "uask-dom";
import { IParticipantDriver, ISurveyDriver } from "../../../drivers/index.js";
import { extractParticipant4Survey, extractSurvey } from "./extraction.js";
import { reconcileSurvey } from "./reconciliation.js";

export class SurveyReconciliationDriver implements ISurveyDriver {
  constructor(private readonly driver: ISurveyDriver) {}

  async getByName(name: string): Promise<Survey> {
    const survey = await this.driver.getByName(name);
    return extractSurvey(survey);
  }

  async save(survey: Survey): Promise<Partial<Survey>> {
    if (!/[-@]/.test(survey.name)) throw "survey name must contain a dash (-)";
    await reconcileSurvey(this.driver, survey);
    return this.driver.save(survey);
  }
}

export class ParticipantReconciliationDriver implements IParticipantDriver {
  constructor(private readonly driver: IParticipantDriver) {}
  getAll(survey: Survey, samples: Sample[], options = {}): Promise<Participant[]> {
    return this.driver
      .getAll(survey, samples, options)
      .then(r => r.map(p => extractParticipant4Survey(p, survey)));
  }

  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    return this.driver
      .getByParticipantCode(survey, samples, participantCode)
      .then(p => extractParticipant4Survey(p, survey));
  }

  getBySample(survey: Survey, sample: Sample, options = {}): Promise<Participant[]> {
    return this.driver
      .getBySample(survey, sample, options)
      .then(r => r.map(p => extractParticipant4Survey(p, survey)));
  }

  save(survey: Survey, participant: Participant): Promise<Partial<Participant>> {
    return this.driver.save(survey, participant);
  }
}
