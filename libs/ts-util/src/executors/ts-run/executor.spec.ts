import { TsRunExecutorSchema } from './schema';
import executor from './executor';

const options: TsRunExecutorSchema = {};

describe('TsRun Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
