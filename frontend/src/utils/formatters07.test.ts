import { describe, expect, it } from 'vitest';
import {
  accessionLabel07,
  clampPriority07,
  formatPercent07,
  formatTAT07,
} from './formatters07';

describe('formatters07', () => {
  it('formats percent', () => {
    expect(formatPercent07(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT07(45)).toBe('45m');
    expect(formatTAT07(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority07(-5)).toBe(0);
    expect(clampPriority07(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel07(2024, 42)).toContain('2024');
  });
});
