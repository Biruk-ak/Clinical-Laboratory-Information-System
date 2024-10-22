import { describe, expect, it } from 'vitest';
import {
  accessionLabel19,
  clampPriority19,
  formatPercent19,
  formatTAT19,
} from './formatters19';

describe('formatters19', () => {
  it('formats percent', () => {
    expect(formatPercent19(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT19(45)).toBe('45m');
    expect(formatTAT19(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority19(-5)).toBe(0);
    expect(clampPriority19(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel19(2024, 42)).toContain('2024');
  });
});
