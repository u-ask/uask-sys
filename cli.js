#!/usr/bin/env node

import { UaskClient, generateDSL } from "./dist/client/pkce.js";

const [apiUrl, operation, name, authUrl] = process.argv.slice(2);
if (typeof name == "undefined") usage();

const client = new UaskClient(apiUrl, authUrl);

try {
  switch (operation) {
    case "gen":
    case "generate":
      generateOutput(generateFromServer(client, name));
      break;
    case "init":
      generateOutput(`b.survey(${name})`);
      break;
    case "signup":
      break;
    default:
      usage();
  }
} finally {
  client.destroy();
}

function usage() {
  const prog = process.argv.slice(0, 2).join(" ");
  console.error(`usage
${prog} <apiUrl> <operation> <name> [<authUrl>]
operation:
    generate gen          generate from server,
    init                  start a new survey
    signup                create a user`);
  process.exit(1);
}

async function generateFromServer(client, name) {
  const survey = await client.surveyDriver.getByName(name);
  return generateDSL(survey);
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
