import { describe, expect, it } from 'vitest';
import {
  accessionLabel44,
  clampPriority44,
  formatPercent44,
  formatTAT44,
} from './formatters44';

describe('formatters44', () => {
  it('formats percent', () => {
    expect(formatPercent44(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT44(45)).toBe('45m');
    expect(formatTAT44(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority44(-5)).toBe(0);
    expect(clampPriority44(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel44(2024, 42)).toContain('2024');
  });
});
