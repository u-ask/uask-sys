import SchemaBuilder, { FieldRef } from "@pothos/core";
import { mlstring } from "uask-dom";
import { Value, Json } from "../../drivers/types.js";

export type SchemaDef = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    BigInt: {
      Input: number;
      Output: number;
    };
    MLString: {
      Input: mlstring;
      Output: mlstring;
    };
    Value: {
      Input: Value;
      Output: Value;
    };
    Json: {
      Input: Json;
      Output: Json;
    };
  };
};

export type GraphQLBuilder = PothosSchemaTypes.SchemaBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<SchemaDef>
>;

export type QueryFieldBuilder<T = Json> = PothosSchemaTypes.QueryFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<SchemaDef>,
  T
>;

export type QueryMapBuilder<T> = (
  g: QueryFieldBuilder
) => Record<string, FieldRef<T, "Query">>;

export type ObjectFieldBuilder<T = Json> =
  PothosSchemaTypes.ObjectFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<SchemaDef>,
    T
  >;

export type MutationFieldBuilder<T = Json> =
  PothosSchemaTypes.MutationFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<SchemaDef>,
    T
  >;

export type MutationMapBuilder<T> = (
  g: MutationFieldBuilder
) => Record<string, FieldRef<T, "Mutation">>;

export function buildSupport(): GraphQLBuilder {
  const schemaBuilder = new SchemaBuilder<SchemaDef>({});

  schemaBuilder.scalarType("MLString", {
    serialize: d => d,
  });

  schemaBuilder.scalarType("BigInt", {
    serialize: d => Number(d),
    parseValue: d => Number(d),
  });

  schemaBuilder.scalarType("Date", {
    serialize: d => d,
  });

  schemaBuilder.scalarType("Value", {
    serialize: d => d,
  });

  schemaBuilder.scalarType("Json", {
    serialize: d => d,
  });

  return schemaBuilder;
}
