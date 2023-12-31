import { lucia } from 'lucia';
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import { env } from './env';
import { nextjs } from 'lucia/middleware';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { github, discord } from '@lucia-auth/oauth/providers';
import Database from 'better-sqlite3';
import 'lucia/polyfill/node';

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
    return {
      username: data.username,
      githubUsername: data.github_username,
      avatarUrl: data.avatar_url,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: env.GITHUB_CLIENT_ID ?? '',
  clientSecret: env.GITHUB_CLIENT_SECRET ?? '',
});

export const discordAuth = discord(auth, {
  clientId: env.DISCORD_CLIENT_ID ?? '',
  clientSecret: env.DISCORD_CLIENT_SECRET ?? '',
  redirectUri: 'http://localhost:4200/login/discord/callback',
});

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies: cookies,
  });
  return authRequest.validate();
});

export type Auth = typeof auth;
