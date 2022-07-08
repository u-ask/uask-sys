import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json";

const external = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });

const plugins = [
  typescript({
    target: "es6",
    module: "es2020",
    declaration: false,
    declarationDir: undefined,
  }),
  resolve({ preferBuiltins: true }),
  commonjs(),
  json(),
  cleanup({ comments: "none" }),
];

export default [
  {
    input: {
      index: "./src/server.ts",
      syncmon: "./src/server/replay/syncmon.ts",
      db: "./db/migrations",
    },
    output: {
      dir: "./dist/server",
      format: "es",
      manualChunks: {
        system: [
          "./src/drivers/index.ts",
          "./src/system/server.ts",
          "./src/knexclient.ts",
        ],
      },
      chunkFileNames: info => {
        if (info.name == "system") return "system.js";
        return "[name]-[hash].js";
      },
    },
    preserveEntrySignatures: "strict",
    external: external,
    plugins,
  },
];
