import { InputShapeFromFields } from "@pothos/core";
import { Json } from "../../drivers/index.js";
import { DriverFactory } from "../factory.js";
import {
  GraphQLBuilder,
  QueryFieldBuilder,
  QueryMapBuilder,
} from "./builder.js";
import { AuditableRef } from "../../drivers/audit.js";
import { mlstring } from "uask-dom";

import debug from "debug";
const dlog = debug("uask:server");

export function buildAuditSupport(
  schemaBuilder: GraphQLBuilder,
  drivers: DriverFactory
): {
  queryFields: QueryMapBuilder<Json[]>;
} {
  return {
    queryFields: g => query(g, drivers),
  };

  function query(g: QueryFieldBuilder, drivers: DriverFactory) {
    return { auditRecords: auditRecords(g, drivers) };
  }

  function auditRecords(g: QueryFieldBuilder, driverFactory: DriverFactory) {
    const args = {
      survey: g.arg.string({ required: true }),
      participantCode: g.arg.string({ required: true }),
      nonce: g.arg({ type: "BigInt" }),
      variableName: g.arg.string({}),
      instance: g.arg({ type: "Int" }),
      operations: g.arg({ type: ["Json"], required: false }),
    };

    const resolve = async (
      _r: Json,
      a: InputShapeFromFields<typeof args>,
      ctx: unknown
    ) => {
      return driverFactory(async drivers => {
        dlog("Graphql audit", "start");
        const survey = await drivers.surveyDriver.getByName(a.survey);
        const root: AuditableRef = {
          participantCode: a.participantCode,
          ...(a.nonce !== undefined ? { nonce: a.nonce } : {}),
          ...(a.variableName !== undefined
            ? { variableName: a.variableName }
            : {}),
          ...(a.instance !== undefined ? { instance: a.instance } : {}),
        };
        const records = await drivers.auditDriver.get(
          survey,
          root,
          a.operations as mlstring[]
        );
        const result = records.map(r => ({ ...r }));
        dlog("Graphql audit", "end");
        return result;
      }, ctx);
    };

    return g.field({ args, type: ["Json"], resolve });
  }
}
