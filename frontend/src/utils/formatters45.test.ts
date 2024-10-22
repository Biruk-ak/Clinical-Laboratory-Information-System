import { describe, expect, it } from 'vitest';
import {
  accessionLabel45,
  clampPriority45,
  formatPercent45,
  formatTAT45,
} from './formatters45';

describe('formatters45', () => {
  it('formats percent', () => {
    expect(formatPercent45(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT45(45)).toBe('45m');
    expect(formatTAT45(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority45(-5)).toBe(0);
    expect(clampPriority45(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel45(2024, 42)).toContain('2024');
  });
});
