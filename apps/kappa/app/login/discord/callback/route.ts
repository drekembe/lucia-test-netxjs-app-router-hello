import { auth, discordAuth } from '../../../../lucia';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { cookies } from 'next/headers';
import { db } from '../../../../db';
import { user } from '../../../../schema';

import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const storedState = cookieStore.get('discord_oauth_state')?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  if (!storedState || !state || storedState !== state || !code)
    return new Response(null, {
      status: 400,
    });
  try {
    const { existingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code);
    const getUser = async () => {
      if (existingUser) {
        return existingUser;
      }
      return await createUser({
        attributes: {
          username: discordUser.username,
          avatar_url: discordUser.avatar,
          discord_username: discordUser.username,
        },
      });
    };
    const u = await getUser();
    const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`;
    db.update(user).set({ avatarUrl }).where(eq(user.id, u.userId)).run();
    const session = await auth.createSession({
      userId: u.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest({ request, cookies });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
