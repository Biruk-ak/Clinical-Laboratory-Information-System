import { describe, expect, it } from 'vitest';
import {
  accessionLabel04,
  clampPriority04,
  formatPercent04,
  formatTAT04,
} from './formatters04';

describe('formatters04', () => {
  it('formats percent', () => {
    expect(formatPercent04(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT04(45)).toBe('45m');
    expect(formatTAT04(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority04(-5)).toBe(0);
    expect(clampPriority04(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel04(2024, 42)).toContain('2024');
  });
});
