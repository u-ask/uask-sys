import {
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  Survey,
} from "uask-dom";
import {
  IInterviewDriver,
  IUserDriver,
  PartialInterview,
} from "../../../drivers/index.js";
import {
  IInterviewDeleteDriver,
  InterviewSaveOptions,
} from "../../../drivers/interview";
import { isManaged } from "../managed/interviewmanaged.js";
import { ParticipantAuthorizationManager } from "./autz.js";

export class InterviewAutzDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  constructor(
    private readonly driver: IInterviewDriver & IInterviewDeleteDriver,
    private readonly userDriver: IUserDriver,
    private readonly userid: string
  ) {}

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items?: IDomainCollection<InterviewItem>,
    options?: InterviewSaveOptions
  ): Promise<PartialInterview> {
    const am = await this.getAutz(survey, participant);
    if (this.itemChanged(interview) && !am.canWriteItems(interview))
      return Promise.reject(am.canWriteItemsError(interview));
    return await this.driver.save(
      survey,
      participant,
      interview,
      items,
      options
    );
  }

  async delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    const user = await this.userDriver.getByUserId(survey, this.userid);
    const am = new ParticipantAuthorizationManager(survey, participant, user);
    if (!am.canDelete()) return Promise.reject(am.canDeleteError());
    return this.driver.delete(survey, participant, interview);
  }

  private async getAutz(survey: Survey, participant: Participant) {
    const user = await this.userDriver.getByUserId(survey, this.userid);
    return new ParticipantAuthorizationManager(survey, participant, user);
  }

  private itemChanged(interview: Interview) {
    return interview.nonce == 0 || interview.items.some(i => isManaged(i));
  }
}
