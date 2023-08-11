'use server';
import { LuciaError } from 'lucia';
import { auth } from '../../lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  // basic check
  if (
    typeof username !== 'string' ||
    username.length < 1 ||
    username.length > 31
  )
    return {
      error: 'Invalid username',
      status: 400,
    };
  if (
    typeof password !== 'string' ||
    password.length < 1 ||
    password.length > 255
  ) {
    return {
      error: 'Invalid password',
      status: 400,
    };
  }
  try {
    // find user by key
    // and validate password
    const user = await auth.useKey(
      'username',
      username.toLowerCase(),
      password
    );
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest({
      request: null,
      cookies,
    });
    authRequest.setSession(session);
    redirect('/');
    // return new Response(null, {
    //   status: 302,
    //   headers: {
    //     Location: '/', // redirect to profile page
    //   },
    // });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' ||
        e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      // user does not exist or invalid password
      return {
        error: 'Incorrect username or password',
        status: 400,
      };
    }
    return {
      error: 'An unknown error occurred',
      status: 500,
    };
  }
}
