// lucia.ts
import { lucia } from 'lucia';
import { web } from 'lucia/middleware';
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import { env } from './env';
import Database from 'better-sqlite3';

// expect error
export const auth = lucia({
  env: 'DEV', // "PROD" if deployed to HTTPS
  middleware: web(),
  sessionCookie: {
    expires: false,
  },
  adapter: betterSqlite3(Database(env.DB), {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
});

export type Auth = typeof auth;
