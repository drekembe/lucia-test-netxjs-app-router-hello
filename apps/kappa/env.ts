import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  DB: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
