import { Got } from "got";
import { Sample, Survey } from "uask-dom";
import {
  ISummaryDriver,
  ParticipantGetOptions,
  ParticipantSummary,
} from "../drivers/index.js";
import { handleClientError } from "../system/client.js";

export class SummaryWebDriver implements ISummaryDriver {
  constructor(private client: Got) {}

  getAll(
    survey: Survey,
    sample?: Sample,
    options?: ParticipantGetOptions
  ): Promise<ParticipantSummary[]>;
  getAll(
    survey: Survey,
    sample?: Sample,
    select?: (keyof ParticipantSummary)[],
    options?: ParticipantGetOptions
  ): Promise<Partial<ParticipantSummary>[]>;
  getAll(
    survey: Survey,
    sample?: Sample,
    x?: (keyof ParticipantSummary)[] | ParticipantGetOptions,
    options?: ParticipantGetOptions
  ): Promise<Partial<ParticipantSummary>[]> {
    const select = Array.isArray(x)
      ? x
      : [
          "participantCode",
          "sampleCode",
          "currentInterview",
          "interviewCount",
          "pins",
          "alerts",
          "included",
        ];
    options = Array.isArray(x) ? options : x;

    const fragment = select.join(",");
    const query = `query ($survey:String!, $sample:String, $offset:Int, $limit:Int){summary(survey:$survey, sample:$sample, offset:$offset, limit:$limit){${fragment}}}`;
    const variables = JSON.stringify({
      survey: survey.name,
      ...(sample ? { sample: sample.sampleCode } : {}),
      ...new ParticipantGetOptions(),
      ...options,
    });
    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { summary: Partial<ParticipantSummary>[] } }>()
      .then(response =>
        response.data.summary.map(s => {
          if (
            typeof s.currentInterview != "undefined" &&
            typeof s.currentInterview.date != "undefined"
          )
            s.currentInterview.date = new Date(
              s.currentInterview.date as string
            );
          return s;
        })
      )
      .catch(async error => await handleClientError(error));
  }
}
