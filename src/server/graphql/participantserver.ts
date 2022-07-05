import { InputShapeFromFields } from "@pothos/core";
import { Participant, Sample } from "uask-dom";
import { Json } from "../../drivers/index.js";
import { participantSerialize } from "../../system/json/participantjson.js";
import { DriverFactory } from "../factory.js";
import {
  QueryMapBuilder,
  GraphQLBuilder,
  MutationMapBuilder,
  MutationFieldBuilder,
  QueryFieldBuilder,
} from "./builder.js";

import debug from "debug";
const dlog = debug("uask:server");

export function buildParticipantSupport(
  _schemaBuilder: GraphQLBuilder,
  drivers: DriverFactory
): {
  queryFields: QueryMapBuilder<Json[] | Json>;
  mutationFields: MutationMapBuilder<Json>;
} {
  return {
    queryFields: g => query(g, drivers),
    mutationFields: g => mutation(g, drivers),
  };
}

function query(g: QueryFieldBuilder, drivers: DriverFactory) {
  return { participant: participant(g, drivers), participants: participants(g, drivers) };
}

function participant(g: QueryFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    code: g.arg.string({ required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("Graphql participant", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        a.code
      );
      const result = participantSerialize(participant);
      dlog("Graphql participant", "end");
      return result;
    }, ctx);
  };

  return g.field({ args, type: "Json", resolve });
}

function participants(g: QueryFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    sample: g.arg.string(),
    offset: g.arg.int({}),
    limit: g.arg.int({}),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("Graphql participant", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const options = {
        ...(typeof a.offset == "number" ? { offset: a.offset } : {}),
        ...(typeof a.limit == "number" ? { limit: a.limit } : {}),
      };
      const participants = await (a.sample
        ? drivers.participantDriver.getBySample(
            survey,
            samples.find(s => s.sampleCode == a.sample) as Sample,
            options
          )
        : drivers.participantDriver.getAll(survey, samples, options));
      const result = participants.map(p => participantSerialize(p));
      dlog("Graphql participant", "end");
      return result;
    }, ctx);
  };

  return g.field({ args, type: ["Json"], resolve });
}

function mutation(g: MutationFieldBuilder, drivers: DriverFactory) {
  return {
    createParticipant: createParticipant(g, drivers),
    saveParticipant: saveParticipant(g, drivers),
    deleteParticipant: deleteParticipant(g, drivers),
  };
}

function createParticipant(g: MutationFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    sample: g.arg.string({ required: true }),
    kwargs: g.arg({ type: "Json" }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(
      async drivers => {
        const survey = await drivers.surveyDriver.getByName(a.survey);
        const sample = await drivers.sampleDriver.getBySampleCode(survey, a.sample);
        const participant = new Participant("", sample, a.kwargs as Partial<Participant>);
        return drivers.participantDriver.save(survey, participant);
      },
      ctx,
      { atomic: true }
    );
  };

  return g.field({ args, type: "Json", resolve });
}

function saveParticipant(g: MutationFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    code: g.arg.string({ required: true }),
    sample: g.arg.string({}),
    kwargs: g.arg({ type: "Json" }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        a.code
      );
      let kwargs: Partial<Participant> = { ...a.kwargs };
      if (a.sample) {
        kwargs = {
          ...kwargs,
          sample: await drivers.sampleDriver.getBySampleCode(survey, a.sample),
        };
      }
      const updated = participant.update(kwargs);
      return drivers.participantDriver.save(survey, updated);
    }, ctx);
  };

  return g.field({ args, type: "Json", resolve });
}

function deleteParticipant(g: MutationFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    code: g.arg.string({ required: true }),
    reason: g.arg({ type: "Json", required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        a.code
      );
      const deleted = participant.update({ __delete__: a.reason });
      await drivers.participantDriver.delete(survey, deleted);
      return { participantCode: participant.participantCode };
    }, ctx);
  };

  return g.field({ args, type: "Json", resolve });
}
