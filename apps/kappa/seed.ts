import { sql } from 'drizzle-orm';
import { db } from './db';
import { cities, countries } from './schema';

const citiesCount = db
  .select({ count: sql`count(${cities.id})` })
  .from(cities)
  .all()[0].count;
if (citiesCount === 0) {
  const s = db
    .insert(countries)
    .values({
      name: 'Slovenia',
    })
    .returning({ id: countries.id })
    .get();
  const u = db
    .insert(countries)
    .values({
      name: 'Uruguay',
    })
    .returning({ id: countries.id })
    .get();
  db.insert(cities).values({ countryId: s.id, name: 'Ljubljana' }).run();
  db.insert(cities).values({ countryId: u.id, name: 'Montevideo' }).run();
}
