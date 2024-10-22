import { describe, expect, it } from 'vitest';
import {
  accessionLabel25,
  clampPriority25,
  formatPercent25,
  formatTAT25,
} from './formatters25';

describe('formatters25', () => {
  it('formats percent', () => {
    expect(formatPercent25(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT25(45)).toBe('45m');
    expect(formatTAT25(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority25(-5)).toBe(0);
    expect(clampPriority25(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel25(2024, 42)).toContain('2024');
  });
});
