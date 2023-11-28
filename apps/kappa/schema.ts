import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

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
  age: integer('age'),
  isCool: integer('is_cool'),
  cityId: integer('city_id').references(() => cities.id),
});

export type Country = typeof countries.$inferInsert;
export type NewCountry = typeof countries.$inferInsert;

export const user = sqliteTable('user', {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
  githubUsername: text('github_username'),
  discordUsername: text('discord_username'),
  avatarUrl: text('avatar_url'),
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

export const queue = sqliteTable('queue', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  activeNumber: integer('active_user_number'),
  ownerUserId: text('owner_user_id')
    .notNull()
    .references(() => user.id),
  isActive: integer('is_paused').default(1).notNull(),
  isDeleted: integer('is_deleted').default(0).notNull(),
});

export const station = sqliteTable('station', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  queueId: integer('queue_id')
    .notNull()
    .references(() => queue.id),
  currentUserId: text('current_user_id').references(() => user.id),
  isActive: integer('is_paused').default(1).notNull(),
});

export const spot = sqliteTable('spot', {
  id: text('id').primaryKey().notNull(),
  number: integer('id').notNull(),
  queueId: integer('queue_id')
    .notNull()
    .references(() => queue.id),
  queuedAt: text('queued_at'),
  processedAt: text('processed_at'),
  abortedAt: text('aborted_at'),
  processedByUserId: text('processed_by_user_id').references(() => user.id),
  processedByStationId: integer('processed_by_station_id').references(
    () => station.id
  ),
});
