import { MigrateExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as Database from 'better-sqlite3';

export default async function runExecutor(
  options: MigrateExecutorSchema,
  context: ExecutorContext
) {
  const sql = Database(options.db);
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: options.migrations });
  return {
    success: true,
  };
}
