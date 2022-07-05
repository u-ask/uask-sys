import { IReplayDrivers, Replay } from "./replay.js";

export type WorkerResult = AsyncGenerator<
  {
    interviews: {
      sofar: number;
      count: number;
    };
    participants: {
      sofar: number;
      count: number;
    };
  } | void,
  string | void,
  unknown
>;

export class ReplayWorker {
  loop: WorkerResult;

  constructor(
    private readonly driverFactory: (
      f: (drivers: IReplayDrivers) => WorkerResult
    ) => WorkerResult,
    private readonly getOutOfSync: () => Promise<Record<string, string[]>>,
    private replaySize = 5
  ) {
    this.loop = this.makeLoop();
  }

  async *iterate(): WorkerResult {
    const outOfSync = await this.getOutOfSync();
    for (const [surveyName, participantCodes] of Object.entries(outOfSync)) {
      yield* this.driverFactory(drivers =>
        this.iterateSurvey(drivers, surveyName, participantCodes)
      );
    }
  }

  private async *iterateSurvey(
    drivers: IReplayDrivers,
    surveyName: string,
    participantCodes: string[]
  ) {
    const survey = await drivers.surveyDriver.getByName(surveyName);
    const samples = await drivers.sampleDriver.getAll(survey);
    const participants = [];
    for (const participantCode of participantCodes.slice(0, this.replaySize)) {
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        participantCode
      );
      participants.push(participant);
    }
    yield* Replay.replay(drivers, survey, participants, {
      rules: true,
      summaries: true,
    });
  }

  private async *makeLoop(): WorkerResult {
    while (true) {
      yield* this.iterate();
      yield;
    }
  }
}
