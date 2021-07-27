import { generateUuid } from './generate-uuid';

describe('generate-uuid', () => {
  it('Should return a new uuid', () => {
    const uuid = generateUuid();
    expect(typeof uuid).toBe('string');
  });

  it('Should be unique', () => {
    const iterations = 50;
    const uuids = new Set();
    for (let i = 0; i < iterations; i++) {
      uuids.add(generateUuid());
    }
    expect(uuids.size).toBe(iterations);
  });
});
