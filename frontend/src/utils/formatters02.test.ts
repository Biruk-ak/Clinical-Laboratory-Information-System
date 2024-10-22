import { describe, expect, it } from 'vitest';
import {
  accessionLabel02,
  clampPriority02,
  formatPercent02,
  formatTAT02,
} from './formatters02';

describe('formatters02', () => {
  it('formats percent', () => {
    expect(formatPercent02(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT02(45)).toBe('45m');
    expect(formatTAT02(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority02(-5)).toBe(0);
    expect(clampPriority02(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel02(2024, 42)).toContain('2024');
  });
});
