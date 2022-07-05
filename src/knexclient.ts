export const development = {
  client: "postgresql",
  connection: JSON.parse(
    process.env.DB_CONNSTR ??
      '{"user":"postgres","host":"localhost","database":"dev"}'
  ),
  migrations: {
    directory: ["./node_modules/uask-auth/db/migrations", "./db/migrations"],
  },
  seeds: {
    directory: ["./node_modules/uask-auth/db/seeds/dev", "./db/seeds/dev"],
  },
};

export const demo = {
  client: "better-sqlite3",
  connection: {
    filename: "./db/demo.sqlite3",
  },
  useNullAsDefault: true,
  migrations: {
    directory: ["./node_modules/uask-auth/db/migrations", "./db/migrations"],
  },
  seeds: {
    directory: ["./node_modules/uask-auth/db/seeds/dev", "./db/seeds/dev"],
  },
};

export const production = {
  client: "postgresql",
  connection: JSON.parse(
    process.env.DB_CONNSTR ??
      '{"user":"postgres","host":"localhost","database":"postgres"}'
  ),
  migrations: {
    directory: ["./db/migrations", "./libs/truenorth/migrations"],
  },
  seeds: {
    directory: ["./db/seeds/preprod"],
  },
};

export const config: Record<string, Record<string, unknown>> = {
  development,
  demo,
  production,
};
