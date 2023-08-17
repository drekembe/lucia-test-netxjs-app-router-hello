// app/login/page.tsx
import { auth } from '../../lucia';
import { Form } from '../../components/form';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

const Page = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  if (session) redirect('/');
  return (
    <Form action="/api/login">
      <div className="flex flex-col gap-4 items-center">
        <fieldset className="flex flex-col gap-4 w-64">
          <label htmlFor="username" className="text-gray-500">
            Username
          </label>
          <input
            name="username"
            id="username"
            autoFocus
            className="rounded-xl border border-gray-400"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-4 w-64">
          <label htmlFor="password" className="text-gray-500">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-xl border border-gray-400  focus:border-gray-400  focus:outline-orange-400 outline-offset-4 focus:ring-0"
          />
        </fieldset>
        <button
          type="submit"
          className="rounded-xl text-white p-4 uppercase text-xl bg-gradient-to-tr from-pink-600 to-pink-400 w-64"
        >
          Submit
        </button>
        <Link href="/signup" className="text-pink-600 hover:underline">
          Create an account
        </Link>
        <a href="/login/github" className="text-pink-600 hover:underline">
          Login with github
        </a>
        <a href="/login/discord" className="text-pink-600 hover:underline">
          Login with discord
        </a>
      </div>
    </Form>
  );
};

export default Page;
