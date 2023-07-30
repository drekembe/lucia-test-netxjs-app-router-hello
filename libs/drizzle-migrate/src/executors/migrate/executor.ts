import { MigrateExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';

export default async function runExecutor(
  options: MigrateExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Migrate', options);
  console.log({ context });
  return {
    success: true,
  };
}
