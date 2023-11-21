import { requireUser } from '../../util';
import { db } from '../../db';
import { countries } from '../../schema';
import { revalidatePath } from 'next/cache';
import { deleteCountry } from '../actions';
import Link from 'next/link';

function Country({ country }: { country: typeof countries.$inferSelect }) {
  async function del() {
    'use server';
    await deleteCountry(country.id);
    revalidatePath('/countries');
  }
  return (
    <li key={country.id}>
      <Link href={`countries/${country.id}`}>{country.name}</Link>
      --
      <form>
        <button formAction={del}>Del</button>
      </form>
    </li>
  );
}

async function getCountries() {
  return db.select().from(countries).all();
}
export default async function Page() {
  async function addCountry(data: FormData) {
    'use server';
    const name = data.get('name') as string;
    db.insert(countries).values({ name }).execute();
    revalidatePath('/countries');
  }
  await requireUser();
  const allCountries = await getCountries();
  return (
    <div>
      <div>
        <ul>
          {allCountries.map((country) => (
            <Country key={country.id} country={country} />
          ))}
        </ul>
      </div>
      <form action={addCountry}>
        <label htmlFor="name">Country</label>
        <input
          type="text"
          required
          id="name"
          name="name"
          autoComplete="country"
        />
        <button type="submit">ok go</button>
      </form>
    </div>
  );
}
