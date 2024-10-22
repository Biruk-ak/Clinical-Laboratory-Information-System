import { describe, expect, it } from 'vitest';
import {
  accessionLabel35,
  clampPriority35,
  formatPercent35,
  formatTAT35,
} from './formatters35';

describe('formatters35', () => {
  it('formats percent', () => {
    expect(formatPercent35(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT35(45)).toBe('45m');
    expect(formatTAT35(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority35(-5)).toBe(0);
    expect(clampPriority35(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel35(2024, 42)).toContain('2024');
  });
});
