import { db } from '../../../db';
import { cities, people, countries } from '../../../schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { requireUser } from '../../../util';
import { eq } from 'drizzle-orm';

const schema = z.object({
  name: z.string().nonempty(),
  age: z.coerce.number(),
  cityId: z.coerce.number(),
});

export default async function Page() {
  await requireUser();
  const result = db
    .select()
    .from(cities)
    .innerJoin(countries, eq(cities.countryId, countries.id))
    .all();
  async function addPerson(data: FormData) {
    'use server';
    const { name, age, cityId } = schema.parse(
      Object.fromEntries(data.entries())
    );
    db.insert(people)
      .values({
        name,
        age,
        cityId,
        isCool: 0,
      })
      .run();
    redirect('/');
  }
  return (
    <form action={addPerson} className="flex flex-col gap-4 items-start">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter name ..."
        autoFocus
      />
      <input type="number" name="age" placeholder="Enter age ..." id="age" />
      <label htmlFor="cities-select">Choose city:</label>
      <select name="cityId" id="cities-select">
        {result.map((entry) => (
          <option value={entry.cities.id} key={entry.cities.id}>
            {entry.cities.name}, {entry.countries.name}
          </option>
        ))}
      </select>
      <button type="submit">ok go</button>
    </form>
  );
}
