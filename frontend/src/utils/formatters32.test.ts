import { describe, expect, it } from 'vitest';
import {
  accessionLabel32,
  clampPriority32,
  formatPercent32,
  formatTAT32,
} from './formatters32';

describe('formatters32', () => {
  it('formats percent', () => {
    expect(formatPercent32(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT32(45)).toBe('45m');
    expect(formatTAT32(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority32(-5)).toBe(0);
    expect(clampPriority32(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel32(2024, 42)).toContain('2024');
  });
});
