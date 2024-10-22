import { describe, expect, it } from 'vitest';
import {
  accessionLabel20,
  clampPriority20,
  formatPercent20,
  formatTAT20,
} from './formatters20';

describe('formatters20', () => {
  it('formats percent', () => {
    expect(formatPercent20(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT20(45)).toBe('45m');
    expect(formatTAT20(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority20(-5)).toBe(0);
    expect(clampPriority20(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel20(2024, 42)).toContain('2024');
  });
});
