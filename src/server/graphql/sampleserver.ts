import { InputShapeFromFields } from "@pothos/core";
import { Sample } from "uask-dom";
import { Json } from "../../drivers/index.js";
import { DriverFactory } from "../factory.js";
import {
  GraphQLBuilder,
  MutationFieldBuilder,
  MutationMapBuilder,
  QueryFieldBuilder,
  QueryMapBuilder,
} from "./builder.js";

import debug from "debug";
const dlog = debug("uask:server");

export function buildSampleSupport(
  schemaBuilder: GraphQLBuilder,
  drivers: DriverFactory
): {
  queryFields: QueryMapBuilder<Json[]>;
  mutationFields: MutationMapBuilder<Json>;
} {
  return {
    queryFields: g => queryFields(g, drivers),
    mutationFields: g => mutation(g, drivers),
  };
}

function queryFields(g: QueryFieldBuilder, drivers: DriverFactory) {
  return {
    samples: samples(g, drivers),
  };
}

function samples(g: QueryFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("GraphQL samples", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const result = samples.map(s => ({ ...s }));
      dlog("GraphQL samples", "end");
      return result;
    }, ctx);
  };

  return g.field({ args, type: ["Json"], resolve });
}

function mutation(g: MutationFieldBuilder, drivers: DriverFactory) {
  return {
    saveSample: saveSample(g, drivers),
  };
}

function saveSample(g: MutationFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    sample: g.arg({ type: "Json", required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const sample = new Sample(a.sample.sampleCode as string, {
        ...a.sample,
      });
      const keys = await drivers.sampleDriver.save(survey, sample);
      return { ...sample.update(keys) };
    }, ctx);
  };

  return g.field({ args, type: "Json", resolve });
}
