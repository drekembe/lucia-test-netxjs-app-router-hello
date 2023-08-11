// app/login/page.tsx
import { auth } from '../../lucia';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { login } from '../actions/login';

const Page = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  if (session) redirect('/');
  return (
    <>
      <h1>Sign in</h1>
      <form action={login}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" />
      </form>
      <Link href="/signup">Create an account</Link>
    </>
  );
};

export default Page;
