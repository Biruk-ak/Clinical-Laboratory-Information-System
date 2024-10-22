import { describe, expect, it } from 'vitest';
import {
  accessionLabel17,
  clampPriority17,
  formatPercent17,
  formatTAT17,
} from './formatters17';

describe('formatters17', () => {
  it('formats percent', () => {
    expect(formatPercent17(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT17(45)).toBe('45m');
    expect(formatTAT17(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority17(-5)).toBe(0);
    expect(clampPriority17(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel17(2024, 42)).toContain('2024');
  });
});
