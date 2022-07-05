import {
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  Survey,
  ZippedInterview,
} from "uask-dom";

export type PartialInterview = Required<ZippedInterview>;

export class InterviewSaveOptions {
  strict = true;
}

export interface IInterviewDriver {
  save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items?: IDomainCollection<InterviewItem>,
    options?: InterviewSaveOptions
  ): Promise<PartialInterview>;
}

export interface IInterviewDeleteDriver {
  delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void>;
}

const defaultDeleteDriver: IInterviewDeleteDriver = {
  delete() {
    throw "Interview suppression not implemented";
  },
};

export class InterviewMixinDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  constructor(
    private readonly driver: IInterviewDriver,
    private readonly deleteDriver: IInterviewDeleteDriver = defaultDeleteDriver
  ) {}
  save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items?: IDomainCollection<InterviewItem>,
    options?: InterviewSaveOptions
  ): Promise<PartialInterview> {
    return this.driver.save(survey, participant, interview, items, options);
  }
  delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    return this.deleteDriver.delete(survey, participant, interview);
  }
}

export function assertNoSubset(
  interview: Interview,
  items?: IDomainCollection<InterviewItem>
): void {
  if (items != interview.items) throw "the driver does not support subset save";
}
