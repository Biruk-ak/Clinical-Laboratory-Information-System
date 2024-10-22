import { describe, expect, it } from 'vitest';
import {
  accessionLabel38,
  clampPriority38,
  formatPercent38,
  formatTAT38,
} from './formatters38';

describe('formatters38', () => {
  it('formats percent', () => {
    expect(formatPercent38(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT38(45)).toBe('45m');
    expect(formatTAT38(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority38(-5)).toBe(0);
    expect(clampPriority38(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel38(2024, 42)).toContain('2024');
  });
});
