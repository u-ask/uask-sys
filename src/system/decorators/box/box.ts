import { Survey, Participant, DomainCollection, Workflow } from "uask-dom";
import { Stealer } from "stealer";
import { IParticipantDriver, IUserDriver } from "../../../drivers/index.js";
import fnv1a from "@sindresorhus/fnv1a";

export class ParticipantBox {
  constructor(
    private readonly participantDriver: IParticipantDriver,
    private readonly userDriver: IUserDriver,
    private readonly userid: string
  ) {}

  private static cache = new Stealer<bigint, Participant>({
    ttl: 30,
    unref: true,
  });

  async unbox(
    survey: Survey,
    participant: Participant,
    workflow: Workflow
  ): Promise<Participant> {
    const cached = ParticipantBox.cache.get(this.getKey(survey, participant));
    if (cached) return this.get(workflow, participant, cached);
    const fetched = await this.participantDriver.getByParticipantCode(
      survey,
      [participant.sample],
      participant.participantCode
    );
    await this.put(survey, fetched);
    return fetched;
  }

  private put(survey: Survey, participant: Participant): void {
    ParticipantBox.cache.set(this.getKey(survey, participant), participant);
  }

  private getKey(survey: Survey, participant: Participant): bigint {
    return fnv1a(
      `${survey.name}_${this.userid}_${participant.participantCode}`
    );
  }

  private get(
    workflow: Workflow,
    participant: Participant,
    realParticipant: Participant
  ): Participant {
    return participant.update({
      interviews: participant.interviews.update(i =>
        !workflow.pageSets.includes(i.pageSet)
          ? realParticipant.interviews.find(ii => ii.nonce == i.nonce) ?? i
          : i
      ),
    });
  }

  box(
    survey: Survey,
    participant: Participant,
    workflow: Workflow,
    { memoize } = { memoize: false }
  ): Participant {
    if (memoize) this.put(survey, participant);
    return participant.update({
      interviews: participant.interviews.update(i =>
        workflow.pageSets.includes(i.pageSet)
          ? i
          : i.update({ items: DomainCollection() })
      ),
    });
  }

  async needBox(survey: Survey): Promise<false | BoxInstance> {
    const user = await this.userDriver.getByUserId(survey, this.userid);
    if (!user) throw "unknown user";
    const workflow = survey.workflow(user.workflow);
    if (!workflow) return false;
    return new BoxInstance(this, workflow);
  }
}

class BoxInstance {
  constructor(
    private readonly participantBox: ParticipantBox,
    readonly workflow: Workflow
  ) {}

  box(survey: Survey, participant: Participant, options = { memoize: false }) {
    return this.participantBox.box(survey, participant, this.workflow, options);
  }

  async unbox(survey: Survey, participant: Participant): Promise<Participant> {
    return this.participantBox.unbox(survey, participant, this.workflow);
  }
}
