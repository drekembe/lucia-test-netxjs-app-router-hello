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
    <div className="container mx-auto flex justify-center items-center h-screen">
      <Form action="/api/login">
        <div className="flex flex-col gap-4 items-stretch">
          <fieldset className="flex flex-row gap-4 items-center">
            <label
              htmlFor="username"
              className="w-1/3 text-right text-gray-400 font-bold"
            >
              Username
            </label>
            <input
              name="username"
              id="username"
              autoFocus
              className="rounded-xl border border-gray-400"
            />
          </fieldset>
          <fieldset className="flex flex-row gap-4 items-center">
            <label
              htmlFor="password"
              className="w-1/3 text-right text-gray-400 font-bold"
            >
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
            className="rounded-xl  text-white p-2 uppercase text-xl bg-gradient-to-tr from-pink-600 to-pink-400 focus:from-white focus:to-white focus:outline focus:outline-pink-600 focus:text-pink-600"
          >
            Submit
          </button>
          <Link href="/signup">Create an account</Link>
          <a href="/login/github">Login with github</a>
        </div>
      </Form>
    </div>
  );
};

export default Page;
