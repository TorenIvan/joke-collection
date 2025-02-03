import { expect, describe, it } from 'vitest';
import { cleanStringBeforeSorting } from '../../helpers/cleanStringForSorting.helper';

describe('cleanStringBeforeSorting function', () => {
  it('should remove commas and convert to lowercase', () => {
    expect(cleanStringBeforeSorting('Hello, World!')).toBe('hello world');
  });

  it('should remove numbers and convert to lowercase', () => {
    expect(cleanStringBeforeSorting('123Hello')).toBe('hello');
  });

  it('should remove dash and underscore and convert to lowercase', () => {
    expect(cleanStringBeforeSorting('Sort-this_string')).toBe('sortthisstring');
  });

  it('should preserve spaces between words', () => {
    expect(cleanStringBeforeSorting('  Hello    World  ')).toBe('  hello    world  ');
  });

  it('should handle an empty string', () => {
    expect(cleanStringBeforeSorting('')).toBe('');
  });

  it('should handle strings with only special characters', () => {
    expect(cleanStringBeforeSorting('!@#$%^&*()')).toBe('');
  });

  it('should handle strings with numbers by removing them', () => {
    expect(cleanStringBeforeSorting('Th1s str1ng h4s numb3rs')).toBe('ths strng hs numbrs');
  });

  it('should convert uppercase to lowercase', () => {
    expect(cleanStringBeforeSorting('MixEd CaSe')).toBe('mixed case');
  });
});
