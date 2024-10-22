import { describe, expect, it } from 'vitest';
import {
  accessionLabel14,
  clampPriority14,
  formatPercent14,
  formatTAT14,
} from './formatters14';

describe('formatters14', () => {
  it('formats percent', () => {
    expect(formatPercent14(0.856, 1)).toBe('85.6%');
  });
  it('formats TAT', () => {
    expect(formatTAT14(45)).toBe('45m');
    expect(formatTAT14(125)).toBe('2h 5m');
  });
  it('clamps priority', () => {
    expect(clampPriority14(-5)).toBe(0);
    expect(clampPriority14(150)).toBe(100);
  });
  it('builds accession labels', () => {
    expect(accessionLabel14(2024, 42)).toContain('2024');
  });
});
