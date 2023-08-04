import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  driver: 'better-sqlite',
  out: './drizzle',
  dbCredentials: {
    url: '',
  },
} satisfies Config;
