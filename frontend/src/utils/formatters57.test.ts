import { describe, expect, it } from 'vitest';
import {
  accessionLabel57,
  clampPriority57,
  formatPercent57,
  formatTAT57,
} from './formatters57';

describe('formatters57', () => {
  it('formats percent', () => {
    expect(formatPercent57(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT57(45)).toBe('45m');
    expect(formatTAT57(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority57(-5)).toBe(0);
    expect(clampPriority57(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel57(2024, 42)).toContain('2024');
  });
});
