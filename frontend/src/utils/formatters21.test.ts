import { describe, expect, it } from 'vitest';
import {
  accessionLabel21,
  clampPriority21,
  formatPercent21,
  formatTAT21,
} from './formatters21';

describe('formatters21', () => {
  it('formats percent', () => {
    expect(formatPercent21(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT21(45)).toBe('45m');
    expect(formatTAT21(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority21(-5)).toBe(0);
    expect(clampPriority21(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel21(2024, 42)).toContain('2024');
  });
});
