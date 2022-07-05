import { InputShapeFromFields } from "@pothos/core";
import {
  DNode,
  Interview,
  getTranslation,
  InterviewBuilder,
  InterviewItem,
  undefinedTag,
} from "uask-dom";
import { Json, PartialInterview } from "../../drivers/index.js";
import { interviewItemDeserialize } from "../../system/json/interviewitemjson.js";
import { DriverFactory } from "../factory.js";
import {
  GraphQLBuilder,
  MutationFieldBuilder,
  MutationMapBuilder,
} from "./builder.js";
import { InterviewSaveOptions } from "../../drivers/interview.js";

import debug from "debug";
const dlog = debug("uask:server");

export function buildInterviewSupport(
  schemaBuilder: GraphQLBuilder,
  drivers: DriverFactory
): {
  mutationFields: MutationMapBuilder<Json[]>;
} {
  return {
    mutationFields: g => mutation(g, drivers),
  };
}

function mutation(g: MutationFieldBuilder, drivers: DriverFactory) {
  return {
    createInterview: createInterview(g, drivers),
    saveInterview: saveInterview(g, drivers),
    deleteInterview: deleteInterview(g, drivers),
  };
}

function createInterview(
  g: MutationFieldBuilder,
  driverFactory: DriverFactory
) {
  const args = {
    survey: g.arg.string({ required: true }),
    participant: g.arg.string({ required: true }),
    pageSet: g.arg.string({ required: true }),
    items: g.arg({ type: ["Json"], required: false }),
    strict: g.arg.boolean({ required: false }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("GraphQL interview", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const pageSet = survey.pageSets.find(
        p =>
          getTranslation(p.type, "__code__", survey.options.defaultLang) ==
          a.pageSet
      );
      if (!pageSet) throw `unknown page set ${a.pageSet}`;
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        a.participant
      );
      const builder = new InterviewBuilder(survey, pageSet);
      addItems(builder, a.items);
      const interview = builder.build([...participant.interviews]);
      const result = await drivers.interviewDriver.save(
        survey,
        participant,
        interview,
        undefined,
        { strict: a.strict || new InterviewSaveOptions().strict }
      );
      dlog("GraphQL interview", "end");
      return result;
    }, ctx);
  };

  return g.field({ args, type: ["Json"], resolve });
}

function deleteInterview(
  g: MutationFieldBuilder,
  driverFactory: DriverFactory
) {
  const args = {
    survey: g.arg.string({ required: true }),
    participant: g.arg.string({ required: true }),
    nonce: g.arg({ type: "BigInt", required: true }),
    reason: g.arg({ type: "Json", required: true }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("GraphQL interview items", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        a.participant
      );
      const interview = participant.interviews.find(i => i.nonce == a.nonce);
      if (!interview) throw `unknown interview with nonce ${a.nonce}`;
      const deleted = interview.update({ __delete__: a.reason });
      await drivers.interviewDriver.delete(survey, participant, deleted);
      dlog("GraphQL interview items", "end");
      return [{ nonce: interview.nonce }];
    }, ctx);
  };

  return g.field({ args, type: ["Json"], resolve });
}

function saveInterview(g: MutationFieldBuilder, driverFactory: DriverFactory) {
  const args = {
    survey: g.arg.string({ required: true }),
    participant: g.arg.string({ required: true }),
    nonce: g.arg({ type: "BigInt", required: true }),
    items: g.arg({ type: ["Json"], required: true }),
    strict: g.arg.boolean({ required: false }),
  };

  const resolve = async (
    _r: Json,
    a: InputShapeFromFields<typeof args>,
    ctx: unknown
  ) => {
    return driverFactory(async drivers => {
      dlog("GraphQL interview items", "start");
      const survey = await drivers.surveyDriver.getByName(a.survey);
      const samples = await drivers.sampleDriver.getAll(survey);
      const participant = await drivers.participantDriver.getByParticipantCode(
        survey,
        samples,
        a.participant
      );
      const interview = participant.interviews.find(i => i.nonce == a.nonce);
      if (!interview) throw `unknown interview with nonce ${a.nonce}`;
      const builder = new InterviewBuilder(survey, interview);
      const { itemIndexes, newItemIndex } = mergeItems(
        builder,
        interview,
        a.items
      );
      const updated = builder.build([]);
      const result = await drivers.interviewDriver.save(
        survey,
        participant,
        updated,
        undefined,
        { strict: a.strict ?? new InterviewSaveOptions().strict }
      );
      dlog("GraphQL interview items", "end");
      return buildResult(
        result,
        getItemIndex(result, itemIndexes, newItemIndex)
      );
    }, ctx);
  };

  return g.field({ args, type: ["Json"], resolve });
}

function addItems(builder: InterviewBuilder, items?: Json[] | null) {
  items?.forEach(p => {
    interviewItemDeserialize(builder, p as DNode<InterviewItem>);
  });
}

function mergeItems(
  builder: InterviewBuilder,
  interview: Interview,
  items: Json[]
) {
  const itemIndexes: number[] = [];
  let newItemIndex = interview.items.length;
  items.forEach(i => {
    const index = interview.items.findIndex(
      t =>
        t.pageItem.variableName == i.variableName &&
        t.pageItem.instance == (i.instance || 1)
    );
    if (index > -1) itemIndexes.push(index);
    else {
      itemIndexes.push(newItemIndex);
      newItemIndex++;
    }
    deserializeWithChanges(builder, i);
  });
  return { itemIndexes, newItemIndex };
}

function deserializeWithChanges(builder: InterviewBuilder, i: Json<unknown>) {
  for (const k in i.__changes__ as Partial<InterviewItem>)
    if (typeof i[k] == "undefined" || i[k] === "") i[k] = undefinedTag;
  for (const k in i)
    if (typeof i[k] == "object" && i[k] === null) i[k] = undefinedTag;
  interviewItemDeserialize(builder, i as DNode<InterviewItem>);
}

function getItemIndex(
  result: PartialInterview,
  itemIndexes: number[],
  newItemIndex: number
): number[] {
  for (let i = newItemIndex; i < result[1].items.length; i++) {
    itemIndexes.push(i);
  }
  return itemIndexes;
}

function buildResult(result: PartialInterview, itemIndexes: number[]) {
  return [
    result[0],
    {
      items: itemIndexes.map(x => result[1].items[x]),
    },
  ];
}
