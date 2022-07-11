import { _ as __awaiter } from '../server/system.js';
import 'uask-dom';
import 'fast-deep-equal';
import '@sindresorhus/fnv1a';
import { load } from '../server/inout.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'child_process';
import 'os';
import 'restana';
import 'debug';
import 'stealer';
import 'body-parser';
import 'ejs';
import 'crypto';
import 'oidc-provider';
import 'openid-client';
import 'assert';
import 'uuid-random';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const dumps = yield new Promise(r => {
            fs.readdir(__dirname, (err, files) => {
                r(files.filter(f => path.extname(f) == ".json"));
            });
        });
        console.info(`loading ${dumps}...`);
        for (const d of dumps) {
            const data = fs.readFileSync(`${__dirname}/${d}`).toString();
            yield load(knex, data);
        }
    });
}

export { seed };
