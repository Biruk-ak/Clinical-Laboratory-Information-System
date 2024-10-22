import { describe, expect, it } from 'vitest';
import {
  accessionLabel51,
  clampPriority51,
  formatPercent51,
  formatTAT51,
} from './formatters51';

describe('formatters51', () => {
  it('formats percent', () => {
    expect(formatPercent51(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT51(45)).toBe('45m');
    expect(formatTAT51(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority51(-5)).toBe(0);
    expect(clampPriority51(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel51(2024, 42)).toContain('2024');
  });
});
