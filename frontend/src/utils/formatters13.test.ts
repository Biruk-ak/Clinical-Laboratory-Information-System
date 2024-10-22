import { describe, expect, it } from 'vitest';
import {
  accessionLabel13,
  clampPriority13,
  formatPercent13,
  formatTAT13,
} from './formatters13';

describe('formatters13', () => {
  it('formats percent', () => {
    expect(formatPercent13(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT13(45)).toBe('45m');
    expect(formatTAT13(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority13(-5)).toBe(0);
    expect(clampPriority13(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel13(2024, 42)).toContain('2024');
  });
});
