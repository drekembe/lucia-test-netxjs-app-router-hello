import Link from 'next/link';
import { countries, people, cities } from '../schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { DeleteButton } from '../components/delete-btn';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { auth } from '../lucia';

export default async function Index() {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  const session = await authRequest.validate();
  const user = session?.user;
  const result = db
    .select({
      id: people.id,
      name: people.name,
      city: {
        name: cities.name,
        id: cities.id,
      },
      country: {
        name: countries.name,
      },
    })
    .from(people)
    .innerJoin(cities, eq(people.cityId, cities.id))
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .all();

  async function deletePerson(id: number) {
    'use server';
    await new Promise((r) => setTimeout(r, 2000));
    db.delete(people).where(eq(people.id, id)).run();
    revalidatePath('/');
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="divide-y divide-gray-300 border border-gray-300 rounded-xl shadow-md overflow-clip">
        {result.map((entry) => (
          <div
            className="text-gray-700 flex justify-between bg-white items-stretch"
            key={entry.id}
          >
            <Link
              href={`people/${entry.id}`}
              className="flex items-center w-32 p-4 hover:text-pink-500"
            >
              {entry.name}
            </Link>
            <div className="flex flex-row gap-8 items-center p-4">
              <div>
                {entry.city.name}, {entry.country.name}
              </div>
              <div>
                <DeleteButton id={entry.id} onClick={deletePerson} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {user && (
        <Link
          href="/people/new"
          className="text-center p-4 border-pink-500 border rounded-xl text-pink-500 text-xl transition-colorsinline-block hover:text-white hover:bg-pink-500 self-end transition-all outline-offset-4"
        >
          🐻 Add new
        </Link>
      )}
    </div>
  );
}
