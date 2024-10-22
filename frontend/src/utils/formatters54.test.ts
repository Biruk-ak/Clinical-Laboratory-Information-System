import { describe, expect, it } from 'vitest';
import {
  accessionLabel54,
  clampPriority54,
  formatPercent54,
  formatTAT54,
} from './formatters54';

describe('formatters54', () => {
  it('formats percent', () => {
    expect(formatPercent54(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT54(45)).toBe('45m');
    expect(formatTAT54(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority54(-5)).toBe(0);
    expect(clampPriority54(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel54(2024, 42)).toContain('2024');
  });
});
