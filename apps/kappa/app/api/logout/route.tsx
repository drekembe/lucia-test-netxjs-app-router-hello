import type { NextRequest } from 'next/server';
import { auth } from '../../../lucia';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const authRequest = auth.handleRequest({ request, cookies });
  const session = await authRequest.validate();
  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  });
}
