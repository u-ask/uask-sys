import { InputShapeFromFields } from "@pothos/core";
import { ParticipantSummary, Json } from "../../drivers/index.js";
import { DriverFactory } from "../factory.js";
import {
  QueryMapBuilder,
  GraphQLBuilder,
  QueryFieldBuilder,
} from "./builder.js";

import debug from "debug";
import { FieldNode, GraphQLResolveInfo } from "graphql";
const dlog = debug("uask:server");

export function buildSummarySupport(
  builder: GraphQLBuilder,
  drivers: DriverFactory
): {
  queryFields: QueryMapBuilder<ParticipantSummary[]>;
} {
  builder.objectType(ParticipantSummary, {
    name: "ParticipantSummary",
    fields: g => ({
      participantCode: g.exposeString("participantCode", {}),
      sampleCode: g.exposeString("sampleCode", {}),
      interviewCount: g.exposeInt("interviewCount", {}),
      currentInterview: g.expose("currentInterview", {
        nullable: true,
        type: "Json",
      }),
      pins: g.expose("pins", { nullable: true, type: "Json" }),
      kpis: g.expose("kpis", { nullable: true, type: "Json" }),
      alerts: g.field({
        nullable: true,
        type: ["Json"],
        resolve: r => [...r.alerts],
      }),
      included: g.exposeBoolean("included", {}),
      inclusionDate: g.expose("inclusionDate", {
        nullable: true,
        type: "Date",
      }),
    }),
  });

  return {
    queryFields: g => queryFields(g, drivers),
  };
}

function queryFields(g: QueryFieldBuilder, drivers: DriverFactory) {
  return {
    summary: summary(g, drivers),
  };
}

function summary(g: QueryFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    sample: g.arg.string({}),
    offset: g.arg.int({}),
    limit: g.arg.int({}),
  };
  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown,
    ast: GraphQLResolveInfo
  ) => {
    const select = ast.fieldNodes[0].selectionSet?.selections.map(
      n => (n as FieldNode).name.value
    ) as (keyof ParticipantSummary)[];
    return driverFactory(async drivers => {
      dlog("Graphql summary", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const sample = a.sample
        ? await drivers.sampleDriver.getBySampleCode(survey, a.sample)
        : undefined;
      const options = {
        ...(a.offset ? { offset: a.offset } : {}),
        ...(a.limit ? { limit: a.limit } : {}),
      };
      const result = await drivers.summaryDriver.getAll(
        survey,
        sample,
        select,
        options
      );
      dlog("Graphql summary", "end");
      return result as ParticipantSummary[];
    }, ctx);
  };

  return g.field({ args, type: [ParticipantSummary], resolve });
}
