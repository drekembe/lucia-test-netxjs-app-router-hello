import { db } from '../../db';
import { people, cities, countries } from '../../../schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: number } }) {
  await new Promise((r) => setTimeout(r, 500));
  const peep = db
    .select({
      name: people.name,
      age: people.age,
      foo: {
        bar: cities.name,
      },
      city: {
        name: cities.name,
      },
      country: {
        name: countries.name,
      },
    })
    .from(people)
    .where(eq(people.id, params.id))
    .innerJoin(cities, eq(cities.id, people.cityId))
    .innerJoin(countries, eq(countries.id, cities.countryId))
    .all()
    .at(0);
  if (!peep) notFound();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xl">{peep.name}</div>
      <div className="bg-gray-300 rounded p-4">
        {peep.age}, {peep.city.name}, {peep.country.name}
      </div>
    </div>
  );
}
