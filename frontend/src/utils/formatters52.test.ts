import { describe, expect, it } from 'vitest';
import {
  accessionLabel52,
  clampPriority52,
  formatPercent52,
  formatTAT52,
} from './formatters52';

describe('formatters52', () => {
  it('formats percent', () => {
    expect(formatPercent52(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT52(45)).toBe('45m');
    expect(formatTAT52(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority52(-5)).toBe(0);
    expect(clampPriority52(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel52(2024, 42)).toContain('2024');
  });
});
