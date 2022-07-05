import { Got } from "got";
import {
  getTranslation,
  IDomainCollection,
  Interview,
  InterviewItem,
  Participant,
  Survey,
} from "uask-dom";
import { IInterviewDriver } from "../drivers/index.js";
import {
  IInterviewDeleteDriver,
  InterviewSaveOptions,
  PartialInterview,
} from "../drivers/interview.js";
import { interviewItemSerialize, handleClientError } from "../system/client.js";

export class InterviewWebDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  constructor(private client: Got) {}

  save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items,
    options?: InterviewSaveOptions
  ): Promise<PartialInterview> {
    options = { strict: !!options?.strict };
    const pageSet = getTranslation(
      interview.pageSet.type,
      "__code__",
      survey.options.defaultLang
    ) as string;
    if (interview.nonce == 0) {
      return this.createInterview(
        survey,
        participant,
        pageSet,
        interview,
        items,
        options
      );
    }
    return this.saveItems(survey, participant, interview, items, options);
  }

  private saveItems(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    interviewItems: IDomainCollection<InterviewItem>,
    options: InterviewSaveOptions
  ) {
    const items = [...interviewItems.map(item => interviewItemSerialize(item))];
    const query = {
      query:
        "mutation ($survey: String!, $participant: String!, $nonce: BigInt!, $items: [Json!]!, $strict: Boolean){ saveInterview(survey: $survey, participant: $participant, nonce: $nonce, items: $items, strict: $strict) }",
      variables: {
        survey: survey.name,
        participant: participant.participantCode,
        nonce: interview.nonce,
        items,
        strict: !!options.strict,
      },
    };
    return this.client
      .post("graphql", { json: query })
      .json<{ data: { saveInterview: PartialInterview } }>()
      .then(response => response.data.saveInterview)
      .catch(async error => await handleClientError(error));
  }

  private createInterview(
    survey: Survey,
    participant: Participant,
    pageSet: string,
    interview: Interview,
    interviewItems: IDomainCollection<InterviewItem>,
    options: InterviewSaveOptions
  ) {
    const items = interviewItems
      ? [...interviewItems.map(item => interviewItemSerialize(item))]
      : undefined;
    const variables = {
      survey: survey.name,
      participant: participant.participantCode,
      pageSet,
      nonce: interview.nonce,
      strict: !!options.strict,
    };
    const query = items
      ? {
          query: `mutation ($survey: String!, $participant: String!, $pageSet: String!, $items: [Json!], $strict: Boolean){ createInterview(survey: $survey, participant: $participant, pageSet: $pageSet, items: $items, strict: $strict) }`,
          variables: { ...variables, items },
        }
      : {
          query: `mutation ($survey: String!, $participant: String!, $pageSet: String!, $strict: Boolean){ createInterview(survey: $survey, participant: $participant, pageSet: $pageSet, strict: $strict) }`,
          variables,
        };
    return this.client
      .post("graphql", { json: query })
      .json<{ data: { createInterview: PartialInterview } }>()
      .then(response => response.data.createInterview)
      .catch(async error => await handleClientError(error));
  }

  delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    const query = {
      query:
        "mutation ($survey: String!, $participant: String!, $nonce: BigInt!, $reason: Json!){ deleteInterview(survey: $survey, participant: $participant, nonce: $nonce, reason: $reason) }",
      variables: {
        survey: survey.name,
        participant: participant.participantCode,
        nonce: interview.nonce,
        reason: interview.__delete__,
      },
    };
    return this.client
      .post("graphql", { json: query })
      .json()
      .then(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
      .catch(async error => await handleClientError(error));
  }
}
