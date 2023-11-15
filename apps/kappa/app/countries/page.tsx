import { requireUser } from '../../util';
import { db } from '../../db';
import { countries } from '../../schema';
import { revalidatePath } from 'next/cache';

async function getCountries() {
  await new Promise((r) => setTimeout(r, 2000));
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
      <pre>{JSON.stringify(allCountries, null, 2)}</pre>
      <form action={addCountry}>
        <label htmlFor="name">Country</label>
        <input type="text" required id="name" name="name" />
        <button type="submit">ok go</button>
      </form>
    </div>
  );
}
