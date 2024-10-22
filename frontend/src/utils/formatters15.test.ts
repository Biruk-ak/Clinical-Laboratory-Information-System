import { describe, expect, it } from 'vitest';
import {
  accessionLabel15,
  clampPriority15,
  formatPercent15,
  formatTAT15,
} from './formatters15';

describe('formatters15', () => {
  it('formats percent', () => {
    expect(formatPercent15(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT15(45)).toBe('45m');
    expect(formatTAT15(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority15(-5)).toBe(0);
    expect(clampPriority15(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel15(2024, 42)).toContain('2024');
  });
});
