import { bytesToSize } from './file';

describe('bytesToSize', () => {
  test('return 0', () => {
    expect(bytesToSize(0)).toBe('0 B');
  });
  test('return correct value', () => {
    expect(bytesToSize(100)).toBe('100 B');
    expect(bytesToSize(1024)).toBe('1 KB');
    expect(bytesToSize(100000)).toBe('100 KB');
    expect(bytesToSize(1000000000)).toBe('1 GB');
    expect(bytesToSize(1000000000000)).toBe('1 TB');
  });
  test('more than 1000 TB', () => {
    expect(bytesToSize(10000000000000000)).toBe('10000 TB');
  });
});
