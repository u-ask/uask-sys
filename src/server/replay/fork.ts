import { ChildProcess, fork } from "child_process";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsNode = process.argv.some(a => a.startsWith("ts-node/register"));
const execArgv = [
  ...process.execArgv,
  ...(tsNode ? ["-r", "ts-node/register"] : []),
];

let worker: ChildProcess;
export function startWorker(): void {
  const workerRelative = path.relative(path.resolve("."), __dirname);
  worker = fork(path.join(workerRelative, "syncmon"), {
    execArgv,
  });
}

export function stopWorker(): Promise<void> {
  const p = new Promise<void>(r => {
    worker.once("message", () => {
      r();
    });
  });
  worker.send("STOP");
  return p;
}
