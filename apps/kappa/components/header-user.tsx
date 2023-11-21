import { cookies } from 'next/headers';
import { auth } from '../lucia';
import Link from 'next/link';

export async function HeaderUser() {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  const user = session?.user;
  return (
    <>
      {!user && (
        <Link href="/login" className="text-white">
          Sign in
        </Link>
      )}
      {user && (
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2 items-center text-black">
            {user.avatarUrl && (
              <img
                className="rounded-xl border-white border-2"
                src={user.avatarUrl}
                alt="avatar"
                width={50}
                height={50}
              />
            )}
            <span className="text-white px-4">{user.username}</span>
          </div>
          <div className="text-white">
            <a href="/api/logout">sign out</a>
          </div>
        </div>
      )}
    </>
  );
}
