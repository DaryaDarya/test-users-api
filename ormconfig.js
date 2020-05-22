/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');

module.exports = {
  cli: { migrationsDir: "src/migrations" },
  ...config.get("typeOrm"),
  migrations: ["dist/migrations/*.js"],
  type: "postgres",
};