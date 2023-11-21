'use server';

import { db } from '../../db';
import { cities, countries } from '../../schema';
import { eq } from 'drizzle-orm';

export async function deleteCity(id: number) {
  'use server';
  db.delete(cities).where(eq(cities.id, id)).execute();
}

export async function deleteCountry(id: number) {
  'use server';
  db.delete(countries).where(eq(countries.id, id)).execute();
}
