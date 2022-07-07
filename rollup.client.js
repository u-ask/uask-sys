import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
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
  resolve(),
  commonjs(),
  cleanup({ comments: "none" }),
];

export default [
  {
    input: {
      index: "./src/client.ts",
      pkce: "./src/client-pkce.ts",
      example: "./src/example.ts",
    },
    output: {
      dir: "./dist/client",
      format: "es",
      manualChunks: {
        client: [
          "./src/client/driver.ts",
          "./src/drivers/index.ts",
          "./src/system/client.ts",
        ],
      },
      chunkFileNames: info => {
        if (info.name == "client") return "client.js";
        return "[name]-[hash].js";
      },
    },
    external: [
      ...external,
      "uask-dom/example",
      "uask-auth/example",
      "uask-auth/client",
    ],
    plugins,
  },
  {
    input: {
      index: "./out/src/client.d.ts",
      pkce: "./out/src/client-pkce.d.ts",
      example: "./out/src/example.d.ts",
    },
    output: {
      dir: "./dist/client",
      format: "es",
      manualChunks: {
        client: [
          "./out/src/client/driver.d.ts",
          "./out/src/drivers/index.d.ts",
          "./out/src/system/client.d.ts",
        ],
      },
      chunkFileNames: info => {
        if (info.name == "client") return "client.d.ts";
        return "[name]-[hash].d.ts";
      },
    },
    external: [...external, "uask-dom/example", "uask-auth/example"],
    plugins: [dts()],
  },
];
