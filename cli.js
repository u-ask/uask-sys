#!/usr/bin/env node

import { UaskClient, generateDSL } from "./dist/client/pkce.js";

const [operation, name, apiUrl, authUrl] = process.argv.slice(2);
if (
  typeof apiUrl == "undefined" ||
  !["generate", "gen", "init"].includes(operation)
) {
  console.error("usage:");
  console.error(
    ...process.argv.slice(0, 2),
    "<operation> <name> <apiUrl> [<authUrl>]"
  );
  console.error(
    "operation: 'generate' or 'gen' to generate from server, 'init' to start a new survey"
  );
  process.exit(1);
}

const dsl = await getDSL(operation, name);
generateOutput(dsl);

async function getDSL(operation, name) {
  if (operation == "generate" || operation == "gen") {
    return generateFromServer(name);
  }

  return `b.survey(${name})`;
}
async function generateFromServer(name) {
  const client = new UaskClient(apiUrl, authUrl);
  try {
    const survey = await client.surveyDriver.getByName(name);
    return generateDSL(survey);
  } finally {
    await client.destroy();
  }
}

function generateOutput(dsl) {
  console.log(generateImports());
  console.log();

  console.log(dsl);

  console.log();
  console.log(generateUpload());
}

function generateImports() {
  return [
    'import { builder } from "uask-dom";',
    'import { UaskClient } from "uask-sys/pkce";',
    "const b = builder();",
  ].join("\n");
}

function generateUpload() {
  const optAuthUrl = authUrl ? `, "${authUrl}"` : "";
  return [
    `const cli = new UaskClient("${apiUrl}"${optAuthUrl})`,
    `await cli.surveyDriver.save(b.get()).finally(() => cli.destroy())`,
  ].join("\n");
}
