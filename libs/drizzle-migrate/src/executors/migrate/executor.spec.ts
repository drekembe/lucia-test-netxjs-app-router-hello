import { MigrateExecutorSchema } from './schema';
import executor from './executor';

const options: MigrateExecutorSchema = { whammy: 'helo' };

describe('Migrate Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
