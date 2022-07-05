import { Got } from "got";
import { Sample, Survey } from "uask-dom";
import { ISampleDriver } from "../drivers/index.js";
import { handleClientError, errorMessage } from "../system/client.js";

export class SampleWebDriver implements ISampleDriver {
  constructor(private client: Got) {}

  getAll(survey: Survey): Promise<Sample[]> {
    const query = "query ($survey:String!){samples(survey:$survey)}";
    const variables = JSON.stringify({ survey: survey.name });

    return this.client
      .get("graphql", { searchParams: { query, variables } })
      .json<{ data: { samples: ({ sampleCode: string } & Partial<Sample>)[] } }>()
      .then(response => response.data.samples.map(s => new Sample(s.sampleCode, s)))
      .catch(async error => await handleClientError(error));
  }

  getBySampleCode(survey: Survey, sampleCode: string): Promise<Sample> {
    return this.getAll(survey).then(
      s =>
        s.find(e => e.sampleCode == sampleCode) ??
        Promise.reject([errorMessage("unknown sample")])
    );
  }

  save(survey: Survey, sample: Sample): Promise<Partial<Sample>> {
    const query = {
      query:
        "mutation ($survey: String!, $sample: Json!){ saveSample(survey: $survey, sample: $sample) }",
      variables: {
        survey: survey.name,
        sample: sample,
      },
    };
    return this.client
      .post("graphql", { json: query })
      .json<{ data: { saveSample: Sample } }>()
      .then(response => {
        const sample = response.data.saveSample;
        return new Sample(sample.sampleCode, sample);
      })
      .catch(async error => await handleClientError(error));
  }
}
