import { describe, expect, it } from 'vitest';
import {
  accessionLabel39,
  clampPriority39,
  formatPercent39,
  formatTAT39,
} from './formatters39';

describe('formatters39', () => {
  it('formats percent', () => {
    expect(formatPercent39(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT39(45)).toBe('45m');
    expect(formatTAT39(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority39(-5)).toBe(0);
    expect(clampPriority39(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel39(2024, 42)).toContain('2024');
  });
});
