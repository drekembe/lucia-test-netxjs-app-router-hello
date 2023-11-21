import { countries, cities } from '../../../schema';
import { db } from '../../../db';
import { deleteCity as dc } from '../../actions';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const paramsSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
});

const formDataSchema = z.object({
  name: z.string().nonempty(),
});

function DeleteCityButton({ children: id }: { children: number }) {
  async function deleteCity() {
    'use server';
    await dc(id);
    revalidatePath('/countries/[id]');
  }
  return (
    <form action={deleteCity}>
      <button>DEL</button>
    </form>
  );
}

export default async function Page({ params }: { params: unknown }) {
  const { id } = paramsSchema.parse(params);
  async function addCity(formData: FormData) {
    'use server';
    const data = formDataSchema.parse(Object.fromEntries(formData.entries()));
    db.insert(cities).values({ name: data.name, countryId: id }).execute();
    revalidatePath('/countires/[id]');
  }
  const results = db.select().from(countries).where(eq(countries.id, id)).all();
  const citiesResults = db
    .select()
    .from(cities)
    .where(eq(cities.countryId, id))
    .all();
  const country = results.at(0);
  if (!country) notFound();

  return (
    <div>
      <h1 className="text-pink-500 font-bold text-2xl">{country.name}</h1>
      <ul>
        {citiesResults.map((cr) => (
          <li key={cr.id}>
            {cr.name} -- <DeleteCityButton>{cr.id}</DeleteCityButton>
          </li>
        ))}
      </ul>
      <div>
        <form action={addCity}>
          <label htmlFor="name">City</label>
          goc
          <input
            type="text"
            required
            id="name"
            name="name"
            autoComplete="name"
          />
          <button type="submit">ok go</button>
        </form>
      </div>
    </div>
  );
}
