import { auth } from '../lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function Logout() {
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
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
}
