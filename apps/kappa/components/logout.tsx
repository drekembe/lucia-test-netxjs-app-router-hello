import { auth } from '../lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export function Logout({ children }: PropsWithChildren) {
  async function logout() {
    'use server';
    const authRequest = auth.handleRequest({ request: null, cookies });
    // check if user is authenticated
    const session = await authRequest.validate();
    if (!session) {
      return new Response(null, {
        status: 401,
      });
    }
    // make sure to invalidate the current session!
    await auth.invalidateSession(session.sessionId);
    // delete session cookie
    authRequest.setSession(null);
    redirect('/');
  }
  return (
    <form action={logout} className="inline-block">
      <button type="submit">{children}</button>
    </form>
  );
}
