import { describe, expect, it } from 'vitest';
import {
  accessionLabel41,
  clampPriority41,
  formatPercent41,
  formatTAT41,
} from './formatters41';

describe('formatters41', () => {
  it('formats percent', () => {
    expect(formatPercent41(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT41(45)).toBe('45m');
    expect(formatTAT41(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority41(-5)).toBe(0);
    expect(clampPriority41(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel41(2024, 42)).toContain('2024');
  });
});
