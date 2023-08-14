import { auth, githubAuth } from '../../../../lucia';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { cookies } from 'next/headers';
import { db } from '../../../../db';
import { user } from '../../../../schema';

import type { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const storedState = cookieStore.get('github_oauth_state')?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { existingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code);

    const getUser = async () => {
      if (existingUser) {
        db.update(user)
          .set({ avatarUrl: githubUser.avatar_url })
          .where(eq(user.id, existingUser.userId))
          .run();
        return existingUser;
      }
      const u = await createUser({
        attributes: {
          username: githubUser.login,
          github_username: githubUser.login,
          avatar_url: githubUser.avatar_url,
        },
      });
      return u;
    };

    const u = await getUser();
    const session = await auth.createSession({
      userId: u.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest({ request, cookies });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/', // redirect to profile page
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
