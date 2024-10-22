import { describe, expect, it } from 'vitest';
import {
  accessionLabel59,
  clampPriority59,
  formatPercent59,
  formatTAT59,
} from './formatters59';

describe('formatters59', () => {
  it('formats percent', () => {
    expect(formatPercent59(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT59(45)).toBe('45m');
    expect(formatTAT59(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority59(-5)).toBe(0);
    expect(clampPriority59(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel59(2024, 42)).toContain('2024');
  });
});
