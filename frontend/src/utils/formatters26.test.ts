import { describe, expect, it } from 'vitest';
import {
  accessionLabel26,
  clampPriority26,
  formatPercent26,
  formatTAT26,
} from './formatters26';

describe('formatters26', () => {
  it('formats percent', () => {
    expect(formatPercent26(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT26(45)).toBe('45m');
    expect(formatTAT26(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority26(-5)).toBe(0);
    expect(clampPriority26(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel26(2024, 42)).toContain('2024');
  });
});
