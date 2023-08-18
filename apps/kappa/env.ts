import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  DB: z.string().nonempty(),
  GITHUB_CLIENT_ID: z.string().nonempty().optional(),
  GITHUB_CLIENT_SECRET: z.string().nonempty().optional(),
  DISCORD_CLIENT_ID: z.string().nonempty().optional(),
  DISCORD_CLIENT_SECRET: z.string().nonempty().optional(),
});

export const env = envSchema.parse(process.env);
