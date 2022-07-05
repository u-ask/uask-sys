import { GraphQLSchema } from "graphql";
import { DriverFactory } from "../factory.js";
import { buildAuditSupport } from "./auditserver.js";
import { buildSupport } from "./builder.js";
import { buildInterviewSupport } from "./interviewserver.js";
import { buildParticipantSupport } from "./participantserver.js";
import { buildSampleSupport } from "./sampleserver.js";
import { buildSurveySupport } from "./surveyserver.js";
import { buildSummarySupport } from "./summaryserver.js";

export function buildSchema(driverFactory: DriverFactory): GraphQLSchema {
  const schemaBuilder = buildSupport();
  const surveySupport = buildSurveySupport(schemaBuilder, driverFactory);
  const summarySupport = buildSummarySupport(schemaBuilder, driverFactory);
  const participantSupport = buildParticipantSupport(schemaBuilder, driverFactory);
  const interviewSupport = buildInterviewSupport(schemaBuilder, driverFactory);
  const sampleSupport = buildSampleSupport(schemaBuilder, driverFactory);
  const auditSupport = buildAuditSupport(schemaBuilder, driverFactory);

  schemaBuilder.queryType({
    fields: g => ({
      ...surveySupport.queryFields(g),
      ...sampleSupport.queryFields(g),
      ...participantSupport.queryFields(g),
      ...summarySupport.queryFields(g),
      ...auditSupport.queryFields(g),
    }),
  });

  schemaBuilder.mutationType({
    fields: g => ({
      ...surveySupport.mutationFields(g),
      ...sampleSupport.mutationFields(g),
      ...participantSupport.mutationFields(g),
      ...interviewSupport.mutationFields(g),
    }),
  });

  return schemaBuilder.toSchema({});
}
