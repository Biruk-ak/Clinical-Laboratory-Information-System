import { describe, expect, it } from 'vitest';
import {
  accessionLabel58,
  clampPriority58,
  formatPercent58,
  formatTAT58,
} from './formatters58';

describe('formatters58', () => {
  it('formats percent', () => {
    expect(formatPercent58(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT58(45)).toBe('45m');
    expect(formatTAT58(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority58(-5)).toBe(0);
    expect(clampPriority58(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel58(2024, 42)).toContain('2024');
  });
});
