import { describe, expect, it } from 'vitest';
import {
  accessionLabel18,
  clampPriority18,
  formatPercent18,
  formatTAT18,
} from './formatters18';

describe('formatters18', () => {
  it('formats percent', () => {
    expect(formatPercent18(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT18(45)).toBe('45m');
    expect(formatTAT18(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority18(-5)).toBe(0);
    expect(clampPriority18(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel18(2024, 42)).toContain('2024');
  });
});
