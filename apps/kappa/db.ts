import Database from 'better-sqlite3';
import { env } from './env';
import { drizzle } from 'drizzle-orm/better-sqlite3';

export const db = drizzle(Database(env.DB));
