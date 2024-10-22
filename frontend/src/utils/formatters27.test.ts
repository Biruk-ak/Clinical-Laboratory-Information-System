import { describe, expect, it } from 'vitest';
import {
  accessionLabel27,
  clampPriority27,
  formatPercent27,
  formatTAT27,
} from './formatters27';

describe('formatters27', () => {
  it('formats percent', () => {
    expect(formatPercent27(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT27(45)).toBe('45m');
    expect(formatTAT27(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority27(-5)).toBe(0);
    expect(clampPriority27(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel27(2024, 42)).toContain('2024');
  });
});
