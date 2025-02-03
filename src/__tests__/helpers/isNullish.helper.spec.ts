import { expect, describe, it } from 'vitest';
import { isNullish } from '../../helpers/isNullish.helper';

describe('isNullish helper testing', () => {
  it('should return false for an empty string', () => {
    expect(isNullish('')).toBe(false);
  });

  it('should return false for a number', () => {
    expect(isNullish(42)).toBe(false);
  });

  it('should return false for a boolean', () => {
    expect(isNullish(false)).toBe(false);
  });

  it('should return false for an object', () => {
    expect(isNullish({})).toBe(false);
  });

  it('should return false for an array', () => {
    expect(isNullish([])).toBe(false);
  });

  it('should return false for a function', () => {
    expect(isNullish(() => {})).toBe(false);
  });

  it('should return true for null', () => {
    expect(isNullish(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isNullish(undefined)).toBe(true);
  });
});
