// lucia.ts
import { lucia } from 'lucia';
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import { env } from './env';
import { nextjs } from 'lucia/middleware';
import { cache } from 'react';
import { cookies } from 'next/headers';
import Database from 'better-sqlite3';
import 'lucia/polyfill/node';

// expect error
export const auth = lucia({
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs(),
  sessionCookie: {
    expires: false,
  },
  adapter: betterSqlite3(Database(env.DB), {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes(data) {
    return { username: data.username };
  },
});

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest({
    request: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cookies: cookies as any,
  });
  return authRequest.validate();
});

export type Auth = typeof auth;
