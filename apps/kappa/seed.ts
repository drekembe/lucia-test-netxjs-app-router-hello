import { sql } from 'drizzle-orm';
import { db } from './db';
import { cities, countries } from './schema';

const citiesCount = db
  .select({ count: sql`count(${cities.id})` })
  .from(cities)
  .all()[0].count;
if (citiesCount === 0) {
  const b = db
    .insert(countries)
    .values({
      name: 'Boletaria Woot',
    })
    .returning({ id: countries.id })
    .get();
  db.insert(cities).values({ countryId: b.id, name: 'Pryzcwyczy' }).run();
  db.insert(cities).values({ countryId: b.id, name: 'Prklo' }).run();
}
