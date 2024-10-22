import { describe, expect, it } from 'vitest';
import {
  accessionLabel24,
  clampPriority24,
  formatPercent24,
  formatTAT24,
} from './formatters24';

describe('formatters24', () => {
  it('formats percent', () => {
    expect(formatPercent24(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT24(45)).toBe('45m');
    expect(formatTAT24(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority24(-5)).toBe(0);
    expect(clampPriority24(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel24(2024, 42)).toContain('2024');
  });
});
