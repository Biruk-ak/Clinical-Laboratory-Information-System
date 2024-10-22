import { describe, expect, it } from 'vitest';
import {
  accessionLabel09,
  clampPriority09,
  formatPercent09,
  formatTAT09,
} from './formatters09';

describe('formatters09', () => {
  it('formats percent', () => {
    expect(formatPercent09(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT09(45)).toBe('45m');
    expect(formatTAT09(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority09(-5)).toBe(0);
    expect(clampPriority09(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel09(2024, 42)).toContain('2024');
  });
});
