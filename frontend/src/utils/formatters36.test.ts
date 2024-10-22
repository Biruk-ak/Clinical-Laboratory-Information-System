import { describe, expect, it } from 'vitest';
import {
  accessionLabel36,
  clampPriority36,
  formatPercent36,
  formatTAT36,
} from './formatters36';

describe('formatters36', () => {
  it('formats percent', () => {
    expect(formatPercent36(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT36(45)).toBe('45m');
    expect(formatTAT36(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority36(-5)).toBe(0);
    expect(clampPriority36(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel36(2024, 42)).toContain('2024');
  });
});
