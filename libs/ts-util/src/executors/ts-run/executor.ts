import { TsRunExecutorSchema } from './schema';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { join, resolve } from 'node:path';
import { chdir } from 'node:process';

export default async function runExecutor(options: TsRunExecutorSchema) {
  const tsconfig = resolve(`libs/ts-util/tsconfig.ts-run.json`);
  if (options.cwd) {
    await promisify(chdir)(options.cwd);
  }
  const { stdout, stderr } = await promisify(exec)(
    `npx ts-node --project ${tsconfig} ${options.script}`
  );
  console.log({ stdout, stderr });
  return {
    success: true,
  };
}
