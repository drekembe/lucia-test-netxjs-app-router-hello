import { db } from '../../db';
import { cities, people } from '../../../schema';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const schema = z.object({
  name: z.string().nonempty(),
  age: z.coerce.number(),
  cityId: z.coerce.number(),
});

export default async function Page() {
  const result = db.select().from(cities).all();
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
    <div className="p-4">
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
          {result.map((city) => (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <button type="submit">ok go</button>
      </form>
    </div>
  );
}
