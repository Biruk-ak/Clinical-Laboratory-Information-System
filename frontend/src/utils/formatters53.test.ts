import { describe, expect, it } from 'vitest';
import {
  accessionLabel53,
  clampPriority53,
  formatPercent53,
  formatTAT53,
} from './formatters53';

describe('formatters53', () => {
  it('formats percent', () => {
    expect(formatPercent53(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT53(45)).toBe('45m');
    expect(formatTAT53(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority53(-5)).toBe(0);
    expect(clampPriority53(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel53(2024, 42)).toContain('2024');
  });
});
