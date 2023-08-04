import Link from 'next/link';
import { countries, Country } from '../schema';
import { db } from './db';

export default async function Index() {
  const result: Country[] = db.select().from(countries).all();
  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        Helo OK <Link href="/sub">SUbpage</Link>
      </div>
      <div className="p-4">
        {result.map((country) => (
          <div key={country.id} className="border bg-blue-200 m-4 p-2">
            {country.name}
          </div>
        ))}
      </div>
    </>
  );
}
