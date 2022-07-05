import { Got } from "got";
import {
  IParticipantDeleteDriver,
  IParticipantDriver,
  ParticipantGetOptions,
} from "../drivers/index.js";
import {
  DNode,
  DomainCollection,
  Participant,
  ParticipantBuilder,
  Sample,
  Survey,
} from "uask-dom";
import { participantDeserialize } from "../system/json/index.js";
import { handleClientError } from "../system/errors.js";

export class ParticipantWebDriver implements IParticipantDriver, IParticipantDeleteDriver {
  constructor(private client: Got) {}

  getAll(
    survey: Survey,
    samples: Sample[],
    options = { limit: Infinity }
  ): Promise<Participant[]> {
    if (options.limit > 20)
      throw "getting more than 20 participants is not allowed by client, use summry driver instead";

    const query =
      "query ($survey:String!, $offset: Int, $limit:Int){participants(survey:$survey, offset:$offset, limit:$limit)}";

    const variables = JSON.stringify({
      survey: survey.name,
      ...new ParticipantGetOptions(),
      ...options,
    });

    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { participants: DNode<Participant>[] } }>()
      .then(response =>
        response.data.participants.map(p => {
          const b = new ParticipantBuilder(survey, DomainCollection(...samples));
          participantDeserialize(b, p);
          return b.build();
        })
      )
      .catch(async error => await handleClientError(error));
  }

  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    const b = new ParticipantBuilder(survey, DomainCollection(...samples));
    const query =
      "query ($survey:String!, $participant:String!){participant(survey:$survey, code:$participant)}";
    const variables = JSON.stringify({
      survey: survey.name,
      participant: participantCode,
    });
    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { participant: DNode<Participant> } }>()
      .then(response => {
        participantDeserialize(b, response.data.participant);
        return b.build();
      })
      .catch(async error => await handleClientError(error));
  }

  getBySample(
    survey: Survey,
    sample: Sample,
    options = { limit: Infinity }
  ): Promise<Participant[]> {
    if (options.limit > 20)
      throw "getting more than 20 participants is not allowed by client, use summry driver instead";

    const query =
      "query ($survey:String!, $sample:String!, $offset:Int!, $limit:Int!){participants(survey:$survey, sample:$sample, offset:$offset, limit:$limit)}";

    const variables = JSON.stringify({
      survey: survey.name,
      sample: sample.sampleCode,
      ...new ParticipantGetOptions(),
      ...options,
    });

    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { participants: DNode<Participant>[] } }>()
      .then(response =>
        response.data.participants.map(p => {
          const b = new ParticipantBuilder(survey, DomainCollection(sample));
          participantDeserialize(b, p);
          return b.build();
        })
      )
      .catch(async error => await handleClientError(error));
  }

  save(survey: Survey, participant: Participant): Promise<Partial<Participant>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { participantCode, sample, interviews, ...kwargs } = participant;
    const query = {
      query:
        participant.participantCode.length > 0
          ? "mutation ($survey:String!, $code:String!, $sample:String!, $kwargs:Json){saveParticipant(survey:$survey, code:$code, sample:$sample, kwargs:$kwargs)}"
          : "mutation ($survey:String!, $sample:String!, $kwargs:Json){createParticipant(survey:$survey, sample:$sample, kwargs:$kwargs)}",
      variables: {
        survey: survey.name,
        ...(participantCode.length > 0 ? { code: participantCode } : {}),
        sample: sample.sampleCode,
        kwargs,
      },
    };
    return this.client
      .post("graphql", { json: query })
      .json<{
        data: {
          saveParticipant: Partial<Participant>;
          createParticipant: Partial<Participant>;
        };
      }>()
      .then(response =>
        participant.participantCode.length > 0
          ? response.data.saveParticipant
          : response.data.createParticipant
      )
      .catch(async error => await handleClientError(error));
  }

  delete(survey: Survey, participant: Participant): Promise<void> {
    const query = {
      query:
        "mutation ($survey: String!, $code: String!, $reason: Json!){ deleteParticipant(survey: $survey, code: $code, reason: $reason) }",
      variables: {
        survey: survey.name,
        code: participant.participantCode,
        reason: participant.__delete__,
      },
    };
    return this.client
      .post("graphql", { json: query })
      .json()
      .then(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function
      .catch(async error => await handleClientError(error));
  }
}
