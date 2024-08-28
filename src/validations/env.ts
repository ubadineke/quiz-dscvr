import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const envSchema = z.object({
    ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string(),
    DB_LOCAL: z.string().url(),
    DB: z.string().url(),
    EXTERNAL_REDIS: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
