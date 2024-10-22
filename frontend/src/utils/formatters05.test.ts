import { describe, expect, it } from 'vitest';
import {
  accessionLabel05,
  clampPriority05,
  formatPercent05,
  formatTAT05,
} from './formatters05';

describe('formatters05', () => {
  it('formats percent', () => {
    expect(formatPercent05(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT05(45)).toBe('45m');
    expect(formatTAT05(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority05(-5)).toBe(0);
    expect(clampPriority05(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel05(2024, 42)).toContain('2024');
  });
});
