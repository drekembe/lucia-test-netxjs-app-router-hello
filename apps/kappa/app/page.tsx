import Link from 'next/link';
import { countries, people, cities } from '../schema';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { DeleteButton } from '../components/delete-btn';
import { revalidatePath } from 'next/cache';

export default async function Index() {
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
    <div className="flex flex-col gap-8 p-8 container mx-auto">
      <div className="bg-blue-500 text-white p-4 rounded-xl">
        <Link href="/sub">HELO</Link>
      </div>
      <div className="divide-y divide-gray-300 border border-gray-300 rounded-xl shadow-md overflow-clip">
        {result.map((entry) => (
          <div
            className="p-4 text-gray-700 flex justify-between bg-white hover:bg-slate-200 transition-colors items-center"
            key={entry.id}
          >
            <Link href={`people/${entry.id}`} className="block">
              {entry.name}
            </Link>
            <div className="flex flex-row gap-8 items-center">
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
      <Link
        href="/people/new"
        className="text-center p-4 border-blue-500 border rounded-xl text-blue-500 text-xl hover:bg-blue-300 transition-colors shadow-md shadow-blue-200 inline-block hover:text-white"
      >
        Add new
      </Link>
    </div>
  );
}
