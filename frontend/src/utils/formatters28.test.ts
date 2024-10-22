import { describe, expect, it } from 'vitest';
import {
  accessionLabel28,
  clampPriority28,
  formatPercent28,
  formatTAT28,
} from './formatters28';

describe('formatters28', () => {
  it('formats percent', () => {
    expect(formatPercent28(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT28(45)).toBe('45m');
    expect(formatTAT28(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority28(-5)).toBe(0);
    expect(clampPriority28(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel28(2024, 42)).toContain('2024');
  });
});
