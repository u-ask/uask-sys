import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("ruleTypes", table => {
    table.increments();
    table.string("name").notNullable().unique();
    table.integer("precedence").notNullable();
  });
  const ruleTypesList = [
    ["constant", 100],
    ["computed", 100],
    ["required", 70],
    ["activation", 50],
    ["inRange", 10],
    ["maxLength", 10],
    ["decimalPrecision", 10],
    ["fixedLength", 10],
    ["letterCase", 10],
    ["dynamic", 0],
  ];

  for (const ruleType of ruleTypesList) {
    await knex("ruleTypes").insert([
      { name: ruleType[0], precedence: ruleType[1] },
    ]);
  }
  await knex.schema.createTable("rules", table => {
    table.increments();
    table.bigInteger("hash");
    table.integer("surveyId").notNullable();
    table.integer("ruleTypeId").notNullable();
    table.integer("version");
    table.string("args");
    table.string("when");
    table.integer("position");
    table.integer("itemCount");
    table.unique(["surveyId", "hash"]);
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("ruleTypeId").references("id").inTable("ruleTypes");
  });
  await knex.schema.createTable("scopes", table => {
    table.increments();
    table.string("level").notNullable().unique();
  });
  const scopeLevelsList = ["global", "outer", "local"];
  for (const scopeLevel of scopeLevelsList) {
    await knex("scopes").insert([{ level: scopeLevel }]);
  }
  await knex.schema.createTable("rulePageItems", table => {
    table.increments();
    table.integer("surveyId").notNullable();
    table.integer("pageItemId").notNullable();
    table.integer("scopeId").notNullable();
    table.bigInteger("ruleHash").notNullable();
    table.integer("position");
    table.unique(["surveyId", "pageItemId", "scopeId", "ruleHash"]);
    table.foreign("surveyId").references("id").inTable("surveys");
    table.foreign("pageItemId").references("id").inTable("pageItems");
    table
      .foreign(["surveyId", "ruleHash"])
      .references(["surveyId", "hash"])
      .inTable("rules");
    table.foreign("scopeId").references("id").inTable("scopes");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("rulePageItems");
  await knex.schema.dropTable("scopes");
  await knex.schema.dropTable("rules");
  await knex.schema.dropTable("ruleTypes");
}
