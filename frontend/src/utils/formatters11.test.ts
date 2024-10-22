import { describe, expect, it } from 'vitest';
import {
  accessionLabel11,
  clampPriority11,
  formatPercent11,
  formatTAT11,
} from './formatters11';

describe('formatters11', () => {
  it('formats percent', () => {
    expect(formatPercent11(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT11(45)).toBe('45m');
    expect(formatTAT11(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority11(-5)).toBe(0);
    expect(clampPriority11(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel11(2024, 42)).toContain('2024');
  });
});
