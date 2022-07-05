import { Survey, Participant, Interview } from "uask-dom";
import { IInterviewDriver, PartialInterview } from "../../../drivers/index.js";
import { InterviewSaveOptions } from "../../../drivers/interview.js";
import { ParticipantBox } from "./box.js";

export class InterviewBoxDriver implements IInterviewDriver {
  constructor(
    private readonly driver: IInterviewDriver,
    private readonly box: ParticipantBox
  ) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items,
    options = new InterviewSaveOptions()
  ): Promise<PartialInterview> {
    const secure = await this.box.needBox(survey, [participant.sample]);
    if (secure) {
      if (!secure.workflow.pageSets.includes(interview.pageSet))
        return [{}, { items: [] }];
      const restored = await secure.unbox(survey, participant);
      return await this.driver.save(
        survey,
        restored,
        interview,
        items,
        options
      );
    }
    return await this.driver.save(
      survey,
      participant,
      interview,
      items,
      options
    );
  }
}
