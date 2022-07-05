import { InputShapeFromFields } from "@pothos/core";
import { DNode, Survey, SurveyBuilder } from "uask-dom";
import { Json } from "../../drivers/index.js";
import { surveyDeserialize, surveySerialize } from "../../system/server.js";
import { DriverFactory } from "../factory.js";
import {
  QueryMapBuilder,
  GraphQLBuilder,
  QueryFieldBuilder,
  MutationMapBuilder,
  MutationFieldBuilder,
} from "./builder.js";

import debug from "debug";
const dlog = debug("uask:server");

export function buildSurveySupport(
  builder: GraphQLBuilder,
  drivers: DriverFactory
): {
  queryFields: QueryMapBuilder<Json>;
  mutationFields: MutationMapBuilder<Json>;
} {
  return {
    queryFields: g => queryFields(g, drivers),
    mutationFields: g => mutation(g, drivers),
  };
}

function queryFields(g: QueryFieldBuilder, drivers: DriverFactory) {
  return {
    survey: survey(g, drivers),
  };
}

function survey(g: QueryFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    name: g.arg.string({ required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("GraphQL survey", "start");
      const survey = await drivers.surveyDriver.getByName(a.name);
      const result = surveySerialize(survey);
      dlog("GraphQL survey", "end");
      return result;
    }, ctx);
  };

  return g.field({ args, type: "Json", resolve });
}

function mutation(g: MutationFieldBuilder, drivers: DriverFactory) {
  return {
    saveSurvey: saveSurvey(g, drivers),
  };
}

function saveSurvey(g: MutationFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    name: g.arg.string({ required: true }),
    survey: g.arg({ type: "Json", required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      const b = new SurveyBuilder();
      surveyDeserialize(b, a.survey as DNode<Survey>);
      const survey = b.get();
      const keys = await drivers.surveyDriver.save(survey);
      return surveySerialize(survey.update(keys));
    }, ctx);
  };

  return g.field({ args, type: "Json", resolve });
}
