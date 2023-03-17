import { buildParne } from './buildParne';

describe('parne', () => {
  test('test', async () => {
    const parne = await buildParne();

    expect(parne.report()).toEqual('This is a report');
  });
});
