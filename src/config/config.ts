import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('15m'),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('Config validation error', envVars.error.format());
  throw new Error('Invalid environment variables');
}

const config = {
  env: envVars.data.NODE_ENV,
  port: envVars.data.PORT,
  databaseUrl: envVars.data.DATABASE_URL,
  jwt: {
    secret: envVars.data.JWT_SECRET,
    expiresIn: envVars.data.JWT_EXPIRES_IN,
  },
};

export default config;
