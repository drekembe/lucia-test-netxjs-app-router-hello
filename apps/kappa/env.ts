import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  DB: z.string().nonempty(),
  GITHUB_CLIENT_ID: z.string().nonempty(),
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
