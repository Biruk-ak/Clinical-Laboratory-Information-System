import { describe, expect, it } from 'vitest';
import {
  accessionLabel01,
  clampPriority01,
  formatPercent01,
  formatTAT01,
} from './formatters01';

describe('formatters01', () => {
  it('formats percent', () => {
    expect(formatPercent01(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT01(45)).toBe('45m');
    expect(formatTAT01(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority01(-5)).toBe(0);
    expect(clampPriority01(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel01(2024, 42)).toContain('2024');
  });
});
