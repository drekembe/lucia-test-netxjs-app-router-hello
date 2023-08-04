import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { InferModel } from 'drizzle-orm';

export const countries = sqliteTable(
  'countries',
  {
    id: integer('id').primaryKey(),
    name: text('name'),
  },
  (countries) => ({
    nameIdx: uniqueIndex('nameIdx').on(countries.name),
  })
);

export const cities = sqliteTable('cities', {
  id: integer('id').primaryKey(),
  name: text('name'),
  countryId: integer('country_id').references(() => countries.id),
});

export const people = sqliteTable('people', {
  id: integer('id').primaryKey(),
  name: text('name'),
  cityId: integer('city_id').references(() => cities.id),
});

export type Country = InferModel<typeof countries, 'select'>;
export type NewCountry = InferModel<typeof countries, 'insert'>;

export const user = sqliteTable('user', {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
});

export const userKey = sqliteTable('user_key', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  hashedPassword: text('hashed_password'),
});

export const userSession = sqliteTable('user_session', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  activeExpires: integer('active_expires').notNull(),
  idleExpires: integer('idle_expires').notNull(),
});
