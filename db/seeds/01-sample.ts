import { Knex } from "knex";
import { load } from "../../src/system/inout/index.js";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seed(knex: Knex): Promise<void> {
  const dumps = await new Promise<string[]>(r => {
    fs.readdir(__dirname, (err, files) => {
      r(files.filter(f => path.extname(f) == ".json"));
    });
  });
  console.info(`loading ${dumps}...`);
  for (const d of dumps) {
    const data = fs.readFileSync(`${__dirname}/${d}`).toString();
    await load(knex, data);
  }
}
