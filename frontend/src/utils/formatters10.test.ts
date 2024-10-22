import { describe, expect, it } from 'vitest';
import {
  accessionLabel10,
  clampPriority10,
  formatPercent10,
  formatTAT10,
} from './formatters10';

describe('formatters10', () => {
  it('formats percent', () => {
    expect(formatPercent10(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT10(45)).toBe('45m');
    expect(formatTAT10(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority10(-5)).toBe(0);
    expect(clampPriority10(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel10(2024, 42)).toContain('2024');
  });
});
