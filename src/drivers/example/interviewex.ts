import { Interview, Participant, ParticipantBuilder, Survey } from "uask-dom";
import {
  IInterviewDeleteDriver,
  IInterviewDriver,
  PartialInterview,
} from "../../client.js";
import { ParticipantExampleDriver } from "./participantex.js";
import { SampleExampleDriver } from "./sampleex.js";
import { Mutex } from "await-semaphore";

export class InterviewExampleDriver
  implements IInterviewDriver, IInterviewDeleteDriver
{
  private participantDriver = new ParticipantExampleDriver();
  private sampleDriver = new SampleExampleDriver();
  private mutex = new Mutex();

  async save(
    survey: Survey,
    participant: Participant,
    interview: Interview,
    items = interview.items
  ): Promise<PartialInterview> {
    const samples = await this.sampleDriver.getAll(survey);
    const nonce = interview.nonce
      ? interview.nonce
      : Math.ceil(Math.random() * 1e16);
    const i = new Interview(
      interview.pageSet,
      interview.options,
      interview.update({ nonce, __untrack__: true })
    );
    const release = await this.mutex.acquire();
    const p = await this.participantDriver.getByParticipantCode(
      survey,
      samples,
      participant.participantCode
    );
    const updated = new ParticipantBuilder(survey, p).interview(i).build();
    await this.participantDriver.save(survey, updated);
    release();
    const itemKeys = [...items.map(() => ({ __untrack__: true as const }))];
    return [{ nonce: i.nonce, __untrack__: true }, { items: itemKeys }];
  }

  async delete(
    survey: Survey,
    participant: Participant,
    interview: Interview
  ): Promise<void> {
    const samples = await this.sampleDriver.getAll(survey);
    const release = await this.mutex.acquire();
    const p = await this.participantDriver.getByParticipantCode(
      survey,
      samples,
      participant.participantCode
    );
    const updated = p.update({
      interviews: p.interviews.filter(i => i.nonce != interview.nonce),
    });
    await this.participantDriver.save(survey, updated);
    release();
  }
}
