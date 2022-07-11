import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json";
import { readdirSync } from "fs";
import { basename, extname } from "path";

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
      "server/index": "./src/server.ts",
      "server/syncmon": "./src/server/replay/syncmon.ts",
      "server/inout": "./src/system/inout/index.ts",
      ...readdirSync("./db/seeds").reduce((bundle, file) => {
        const entry = `seeds/${basename(file, extname(file))}`;
        bundle[entry] = `./db/seeds/${file}`;
        return bundle;
      }, {}),
    },
    output: {
      dir: "./dist",
      format: "es",
      manualChunks: {
        "server/system": [
          "./src/drivers/index.ts",
          "./src/system/server.ts",
          "./src/knexclient.ts",
        ],
        "server/inout": ["./src/system/inout/index.ts"],
      },
      chunkFileNames: info => {
        if (info.name == "server/system") return "server/system.js";
        return "[name]-[hash].js";
      },
    },
    preserveEntrySignatures: "strict",
    external: external,
    plugins,
  },
  {
    input: [
      ...readdirSync("./db/migrations").map(file => `./db/migrations/${file}`),
    ],
    output: {
      dir: "./dist/migrations",
      format: "es",
      chunkFileNames: info => {
        if (info.name.startsWith("tslib")) return "[name].js";
        return "[name]-[hash].js";
      },
    },
    external: external,
    plugins,
  },
];
