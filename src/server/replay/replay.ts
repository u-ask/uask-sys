import { Knex } from "knex";
import { execute, Participant, Survey, User } from "uask-dom";
import {
  IAuditDriver,
  IDocumentDriver,
  IDrivers,
  IInterviewDriver,
  IInterviewDeleteDriver,
  IParticipantDriver,
  IParticipantDeleteDriver,
  ISampleDriver,
  ISurveyDriver,
  ISummaryDriver,
  IUserDriver,
  IKpiDriver,
} from "../../drivers/index.js";
import { InterviewManagedDriver } from "../../system/decorators/managed/interviewmanaged.js";
import {
  Builder,
  SurveyReconciliationDriver,
} from "../../system/decorators/server.js";
import { Store } from "../../system/store/index.js";
import {
  InterviewStoreDriver,
  ParticipantStoreDriver,
  SampleStoreDriver,
  SurveyStoreDriver,
} from "../../system/store/index.js";
import { ParticipantSummaryDriver } from "../../system/summary/participantsummary.js";
import { InterviewMixinDriver } from "../../drivers/interview.js";
import { ParticipantMixinDriver } from "../../drivers/participant.js";

export class UserSystemDriver implements IUserDriver {
  getAll(survey: Survey): Promise<User[]> {
    return this.getByUserId(survey, "").then(u => [u as User]);
  }

  async getByUserId(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    survey: Survey,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userid: string
  ): Promise<User | undefined> {
    return new User("system");
  }

  async save(): Promise<Partial<User>> {
    return {};
  }
}

export interface IReplayDrivers extends IDrivers {
  readonly userDriver: UserSystemDriver;
}

export class ReplayDrivers implements IReplayDrivers {
  private readonly store: Store;
  readonly surveyDriver: ISurveyDriver;
  readonly sampleDriver: ISampleDriver;
  readonly participantDriver: IParticipantDriver & IParticipantDeleteDriver;
  readonly interviewDriver: IInterviewDriver & IInterviewDeleteDriver;
  readonly summaryDriver: ISummaryDriver = <ISummaryDriver>{};
  readonly userDriver: UserSystemDriver;
  readonly auditDriver: IAuditDriver = <IAuditDriver>{};
  readonly documentDriver: IDocumentDriver = <IDocumentDriver>{};
  readonly kpiDriver: IKpiDriver = <IKpiDriver>{};

  constructor(private readonly client: Knex) {
    this.store = new Store(client);
    this.surveyDriver = Builder.decorate(SurveyStoreDriver, this.store)
      .with(SurveyReconciliationDriver)
      .get();
    this.sampleDriver = Builder.decorate(SampleStoreDriver, this.store).get();
    this.userDriver = Builder.decorate(UserSystemDriver).get();
    this.participantDriver = Builder.decorate(
      ParticipantStoreDriver,
      this.store
    )
      .with(ParticipantSummaryDriver, this.client)
      .with(ParticipantMixinDriver, {
        delete: () => {
          throw "Replay driver cannot delete participants";
        },
      })
      .get();
    this.interviewDriver = Builder.decorate(InterviewStoreDriver, this.store)
      .with(InterviewManagedDriver)
      .with(InterviewMixinDriver, {
        delete: () => {
          throw "Replay driver cannot delete interviews";
        },
      })
      .get();
  }
}

type Sofar = {
  sofar: number;
  count: number;
};

type ReplayOptions = {
  rules?: boolean;
  summaries?: boolean;
};

export class Replay {
  static async *replay(
    drivers: IReplayDrivers,
    survey: Survey,
    p?: Participant[] | ReplayOptions,
    o?: ReplayOptions
  ): AsyncGenerator<
    { interviews: Sofar; participants: Sofar },
    undefined,
    unknown
  > {
    const { participants, options } = await Replay.getArgs(
      drivers,
      survey,
      p,
      o
    );
    const interviewCount = participants.reduce(
      (c, p) => c + p.interviews.length,
      0
    );
    const participantCount = participants.length;
    let interviewSofar = 0;
    let participantSofar = 0;
    for (const participant of participants) {
      if (options.rules) await Replay.replayRules(drivers, survey, participant);
      if (options.summaries)
        await drivers.participantDriver.save(survey, participant);
      interviewSofar += participant.interviews.length;
      participantSofar += 1;
      yield {
        interviews: { sofar: interviewSofar, count: interviewCount },
        participants: { sofar: participantSofar, count: participantCount },
      };
    }
    return undefined;
  }

  static async getArgs(
    drivers: IReplayDrivers,
    survey: Survey,
    p: Participant[] | ReplayOptions | undefined,
    o: ReplayOptions | undefined
  ): Promise<{
    participants: Participant[];
    options: { rules: boolean; summaries: boolean };
  }> {
    if (Array.isArray(p)) {
      const options = {
        rules: true,
        summaries: false,
        ...o,
      };
      return { participants: p, options };
    }
    const options = {
      rules: true,
      summaries: false,
      ...p,
    };
    const samples = await drivers.sampleDriver.getAll(survey);
    const participants = await drivers.participantDriver.getAll(
      survey,
      samples,
      {
        limit: Infinity,
      }
    );
    return { participants, options };
  }

  static async replayRules(
    drivers: IReplayDrivers,
    survey: Survey,
    participant: Participant
  ): Promise<void> {
    const synchronized = execute(survey.rules, participant, ["always"]);
    for (let i = 0; i < synchronized.interviews.length; i++) {
      const interview = synchronized.interviews[i];
      await drivers.interviewDriver.save(survey, synchronized, interview);
    }
  }
}
