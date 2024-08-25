import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string(),
  DB_LOCAL: z.string().url(),
});

const env = envSchema.parse(process.env);

export default env;
