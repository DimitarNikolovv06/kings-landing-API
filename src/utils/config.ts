import { cleanEnv, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port(),
  SECRET: str(),
  DB_URI: str(),
});

export default env;
