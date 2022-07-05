import { Participant, Sample, Survey } from "uask-dom";
import {
  UaskError,
  IParticipantDriver,
  IParticipantDeleteDriver,
  ParticipantGetOptions,
} from "../../client.js";
import { doImport } from "./surveyex.js";

export class ParticipantExampleDriver
  implements IParticipantDriver, IParticipantDeleteDriver
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAll(
    survey: Survey,
    samples: Sample[],
    options: Partial<ParticipantGetOptions> = {}
  ): Promise<Participant[]> {
    const opt = { ...new ParticipantGetOptions(), ...options };
    return doImport(survey.name).then(i =>
      i.participants
        .filter(p => !p.__delete__)
        .slice(options.offset, opt.offset + opt.limit)
        .map(p =>
          p.update({ sample: samples.find(s => s.sampleCode == p.sample.sampleCode) })
        )
    );
  }

  getBySample(
    survey: Survey,
    sample: Sample,
    options: Partial<ParticipantGetOptions> = {}
  ): Promise<Participant[]> {
    const opt = { ...new ParticipantGetOptions(), ...options };
    return doImport(survey.name).then(i =>
      i.participants
        .filter(p => p.sample.sampleCode == sample.sampleCode && !p.__delete__)
        .slice(options.offset, opt.offset + opt.limit)
        .map(p => p.update({ sample: sample }))
    );
  }

  getByParticipantCode(
    survey: Survey,
    samples: Sample[],
    participantCode: string
  ): Promise<Participant> {
    return doImport(survey.name)
      .then(i =>
        i.participants
          .map(p =>
            p.update({ sample: samples.find(s => s.sampleCode == p.sample.sampleCode) })
          )
          .find(p => p.participantCode == participantCode && !p.__delete__)
      )
      .then(
        p =>
          p ??
          Promise.reject(
            new UaskError({ code: "NOT_FOUND", message: "unknown participant" })
          )
      );
  }

  save(survey: Survey, participant: Participant): Promise<{ participantCode: string }> {
    const p = new Participant(
      participant.participantCode,
      participant.sample,
      participant.update({ __untrack__: true })
    );
    if (participant.participantCode) {
      return doImport(survey.name).then(i => this.update(i.participants, p));
    }
    return doImport(survey.name).then(i => this.create(i.participants, p));
  }

  private create(participants: Participant[], participant: Participant) {
    const participantCode = `0000000${participants.length + 1}`.slice(-5);
    const newParticipant = new Participant("", participant.sample, {
      ...participant,
      participantCode,
      interviews: participant.interviews.filter(i => i.nonce > 0),
    });
    participants.push(newParticipant);
    return { participantCode };
  }

  private update(participants: Participant[], participant: Participant) {
    const i = participants.findIndex(p => p.participantCode == participant.participantCode);
    const newParticipant = new Participant("", participant.sample, {
      ...participant,
      interviews: participant.interviews.filter(i => i.nonce > 0),
    });
    participants[i] = newParticipant;
    return Promise.resolve({
      participantCode: participant.participantCode,
    });
  }

  delete(survey: Survey, participant: Participant): Promise<void> {
    const p = new Participant(
      participant.participantCode,
      participant.sample,
      participant.update({ __delete__: true })
    );
    return doImport(survey.name)
      .then(i => this.update(i.participants, p))
      .then();
  }
}
